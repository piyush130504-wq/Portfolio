import asyncio
import logging
import os
import re
import uuid
from contextlib import suppress
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Header, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, Field, field_validator
from pymongo import ASCENDING, DESCENDING, IndexModel
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')
load_dotenv(ROOT_DIR.parent / '.env')

mongo_url = os.environ.get('MONGO_URL', '').strip()
db_name = os.environ.get('DB_NAME', 'portfolio').strip()

client = None
db = None

if mongo_url:
    try:
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
    except Exception as exc:
        logging.getLogger(__name__).warning("Failed to initialize MongoDB client: %s", exc)

# In-memory fallbacks when MongoDB is not configured
MEM_CONTACTS: list[dict] = []
MEM_PAGE_VIEWS: list[dict] = []

INDEXES: dict[str, list[IndexModel]] = {
    "contact_messages": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("created_at", DESCENDING)], name="created_at_desc"),
    ],
    "page_views": [
        IndexModel([("created_at", DESCENDING)], name="created_at_desc"),
    ],
}


async def ensure_indexes() -> None:
    if db is None:
        return
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)


EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

    @field_validator("name")
    @classmethod
    def name_valid(cls, v):
        v = v.strip()
        if not (1 <= len(v) <= 100):
            raise ValueError("Name must be between 1 and 100 characters")
        return v

    @field_validator("email")
    @classmethod
    def email_valid(cls, v):
        v = v.strip().lower()
        if not EMAIL_RE.match(v):
            raise ValueError("Please enter a valid email address")
        return v

    @field_validator("message")
    @classmethod
    def message_valid(cls, v):
        v = v.strip()
        if not (10 <= len(v) <= 2000):
            raise ValueError("Message must be between 10 and 2000 characters")
        return v


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class TrackEvent(BaseModel):
    model_config = ConfigDict(extra="ignore")

    path: str
    referrer: str = ""

    @field_validator("path")
    @classmethod
    def path_valid(cls, v):
        v = v.strip()[:200]
        if not v.startswith("/"):
            raise ValueError("Invalid path")
        return v

    @field_validator("referrer")
    @classmethod
    def referrer_valid(cls, v):
        return v.strip()[:200]


app = FastAPI()
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {
        "message": "Piyush Priyadarshi — portfolio API",
        "database": "connected" if db is not None else "in-memory (set MONGO_URL to connect MongoDB Atlas)",
    }


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactCreate):
    msg = ContactMessage(**input.model_dump())
    doc = msg.model_dump()
    if db is not None:
        try:
            await db.contact_messages.insert_one(doc)
        except Exception as exc:
            logging.getLogger(__name__).error("Error saving to MongoDB: %s", exc)
            MEM_CONTACTS.insert(0, doc)
    else:
        MEM_CONTACTS.insert(0, doc)
        logging.getLogger(__name__).info("Contact message stored in memory. Set MONGO_URL to persist to MongoDB.")
    return msg


@api_router.get("/contact")
async def list_contact_messages(x_admin_key: str = Header(default="")):
    admin_key = os.environ.get('ADMIN_KEY')
    if not admin_key or x_admin_key != admin_key:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if db is not None:
        try:
            docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).limit(100).to_list(100)
            return docs
        except Exception as exc:
            logging.getLogger(__name__).error("Error reading from MongoDB: %s", exc)
    return MEM_CONTACTS[:100]


@api_router.post("/track")
async def track_page_view(event: TrackEvent):
    doc = {
        "id": str(uuid.uuid4()),
        "path": event.path,
        "referrer": event.referrer,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    if db is not None:
        try:
            await db.page_views.insert_one(doc)
        except Exception as exc:
            logging.getLogger(__name__).error("Error saving page view to MongoDB: %s", exc)
            MEM_PAGE_VIEWS.append(doc)
    else:
        MEM_PAGE_VIEWS.append(doc)
    return {"status": "ok"}


@api_router.get("/analytics")
async def get_analytics(x_admin_key: str = Header(default="")):
    admin_key = os.environ.get('ADMIN_KEY')
    if not admin_key or x_admin_key != admin_key:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if db is not None:
        try:
            col = db.page_views
            total = await col.count_documents({})
            by_path = await col.aggregate([
                {"$group": {"_id": "$path", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
            ]).to_list(None)
            by_day = await col.aggregate([
                {"$group": {"_id": {"$substr": ["$created_at", 0, 10]}, "count": {"$sum": 1}}},
                {"$sort": {"_id": 1}},
            ]).to_list(None)
            by_referrer = await col.aggregate([
                {"$match": {"referrer": {"$nin": ["", None]}}},
                {"$group": {"_id": "$referrer", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 6},
            ]).to_list(None)
            return {"total": total, "by_path": by_path, "by_day": by_day, "by_referrer": by_referrer}
        except Exception as exc:
            logging.getLogger(__name__).error("Error querying analytics from MongoDB: %s", exc)

    # In-memory aggregate fallback
    total = len(MEM_PAGE_VIEWS)
    path_counts: dict[str, int] = {}
    day_counts: dict[str, int] = {}
    ref_counts: dict[str, int] = {}

    for pv in MEM_PAGE_VIEWS:
        p = pv.get("path", "")
        path_counts[p] = path_counts.get(p, 0) + 1
        d = pv.get("created_at", "")[:10]
        day_counts[d] = day_counts.get(d, 0) + 1
        r = pv.get("referrer", "")
        if r:
            ref_counts[r] = ref_counts.get(r, 0) + 1

    by_path = [{"_id": k, "count": v} for k, v in sorted(path_counts.items(), key=lambda x: x[1], reverse=True)]
    by_day = [{"_id": k, "count": v} for k, v in sorted(day_counts.items())]
    by_referrer = [{"_id": k, "count": v} for k, v in sorted(ref_counts.items(), key=lambda x: x[1], reverse=True)[:6]]

    return {"total": total, "by_path": by_path, "by_day": by_day, "by_referrer": by_referrer}


app.include_router(api_router)

cors_origins = [o.strip() for o in os.environ.get('CORS_ORIGINS', '*').split(',') if o.strip()]
if not cors_origins:
    cors_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def start_index_build():
    if db is not None:
        app.state.index_task = asyncio.create_task(ensure_indexes())


@app.on_event("shutdown")
async def shutdown_db_client():
    if hasattr(app.state, "index_task") and app.state.index_task:
        app.state.index_task.cancel()
        with suppress(asyncio.CancelledError):
            await app.state.index_task
    if client is not None:
        client.close()

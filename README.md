# Piyush Priyadarshi — Portfolio

Premium dark-first developer + UI/UX portfolio: React frontend, FastAPI backend, MongoDB / Vercel Serverless.

## Structure
- `frontend/` — React (CRA + craco), Tailwind CSS, Framer Motion, Lenis smooth scroll, Recharts, react-router-dom
  - `src/pages/` — Home, CaseStudyCRM, CaseStudyDesignSystem, CaseStudyAnalytics, Admin
  - `src/components/` — Hero (kinetic headline + interactive node graph), Projects, Playground, Nav, Contact, etc.
  - `src/components/ds/` — design-system token + component sections
  - `public/` — resume.pdf, og-image.jpg, logo.svg (favicon)
- `api/` — Vercel Serverless Functions (`api/index.py`), automatically handling `/api/*` on Vercel
- `backend/` — Standalone FastAPI server for local development or alternative container hosting
- `vercel.json` — Monorepo Vercel deployment configuration with SPA routing and serverless rewrites

---

## Deploying to Vercel

This repository is pre-configured for **zero-config deployment on Vercel**. When imported into Vercel, it deploys both the React frontend and the FastAPI serverless API together under a single domain.

### Method 1: Deploy via GitHub (Recommended)

1. Push your updated repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure portfolio for Vercel deployment"
   git remote add origin https://github.com/piyush130504-wq/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Leave the **Root Directory** as `./` (or default). Vercel will automatically read `vercel.json`.
5. *(Optional)* Under **Environment Variables**, add:
   - `MONGO_URL` — your MongoDB Atlas connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)
   - `DB_NAME` — `portfolio` (or your preferred database name)
   - `ADMIN_KEY` — your secret passphrase for unlocking `/admin`
   - `REACT_APP_BACKEND_URL` — leave blank when deploying together on Vercel (it automatically uses `/api` on the same domain)
6. Click **Deploy**.

> **Note:** Even if you haven't set up MongoDB yet, the site and API will still deploy and run cleanly without crashing (using in-memory fallback). Once you add `MONGO_URL` in the Vercel dashboard, contact submissions and visitor tracking will persist directly to MongoDB.

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from the project root
vercel --prod
```

---

## Running Locally

### Prerequisites
- Node 18+ (tested with Node 20 / 22)
- Python 3.10+
- Optional: MongoDB running locally or on MongoDB Atlas

### 1. Backend

```bash
cd backend
pip install -r requirements.txt

# Create .env from .env.example
cp .env.example .env

# Start FastAPI server on port 8001
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 2. Frontend

```bash
cd frontend
yarn install

# In frontend/.env (or set env variable):
# REACT_APP_BACKEND_URL=http://localhost:8001
yarn start
```

---

## Key Routes
- `/` — Hero, about, projects, case-study index, design playground, experience, skills, contact form
- `/work/crm` — Case study: SaaS CRM Dashboard
- `/work/design-system` — Case study: Design System Tokens & Components
- `/work/analytics` — Case study: Executive Analytics Platform
- `/admin` — Private dashboard (contact messages + visitor analytics), unlocked with `ADMIN_KEY`
- Download Resume serves `frontend/public/resume.pdf`

## Privacy & Tracking
- Analytics tracking is cookie-free: records only path, referring domain, and timestamp.
- Honors `Do Not Track` (`navigator.doNotTrack === "1"`).
- Ignores admin routes (`/admin`).

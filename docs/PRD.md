# PRD — Piyush Priyadarshi Portfolio

## Original Problem Statement
Build a premium, interactive, dark-first personal portfolio (Awwwards-level craft) positioning Piyush Priyadarshi as a Software Engineer / Frontend Developer / Product-minded UI Engineer. Sections: Hero, About, Featured Projects (3 real projects), UI/UX Design Portfolio (3 ORIGINAL interactive case studies), Interactive Design Playground, Experience Timeline, Technical Skills, Contact with functional validated form. No fake metrics, testimonials, or invented links.

## User Choices (from ask_human)
- Accent: Blue primary (#3B82F6) + violet secondary (#8B5CF6), sparingly on #09090B
- Case studies: dedicated interactive pages — each a working mini-product
- Contact form: FastAPI + MongoDB persistence + success feedback
- Resume: placeholder (user will upload PDF later)

## Architecture
- Frontend: React (CRA + craco), Tailwind, Framer Motion, lucide-react, Recharts, Lenis smooth scroll, sonner toasts, react-router-dom
- Routes: `/` (single-page: Hero→Marquee→About→Projects→Case Studies→Playground→Experience→Skills→Contact), `/work/crm`, `/work/design-system`, `/work/analytics`
- Backend: FastAPI (`/app/backend/server.py`) — `GET /api/`, `POST /api/contact` (Pydantic validation: name 1-100, email regex, message 10-2000) → MongoDB `contact_messages` (unique id index, created_at desc index)
- Original SVG logo mark used as favicon (`/app/frontend/public/logo.svg`)

## Implemented (2026-11-13)
- Kinetic hero: masked line-by-line headline reveal, availability pulse badge, parallax interactive SVG system-node graph with hover states + traveling pulses, dot-grid + glow backdrop, grain overlay
- Slow editorial marquee; Lenis momentum scrolling; framer-motion scroll reveals; prefers-reduced-motion respected globally (CSS + JS)
- About: editorial intro + aligned 12-col bento tech-stack (brief's exact technologies only)
- Projects: 3 case rows with original JSX-rendered preview compositions (Rodic AI screening UI, REEP digital-twin canvas, Crop yield SHAP charts), expandable Problem/Approach/Decisions/Challenges
- Case Study 01 `/work/crm`: collapsible sidebar, 4 working views (Overview KPIs + revenue AreaChart with 6M/12M toggle + activity feed, Deals pipeline with stage advancement, sortable/searchable/filterable Customers table, Transactions), functional search + notifications popover
- Case Study 02 `/work/design-system`: live dark/light theme toggle re-theming the library, colour/typography/spacing/radius/grid token sections, full component state matrix (default/hover/focus/active/disabled/loading/error), functional dropdown/select/tabs/modal/table-selection/tooltip
- Case Study 03 `/work/analytics`: range presets (7D/30D/90D/12M), segment filters, dual-series comparison chart with legend toggles, sortable + expandable channel table with sparklines, functional CSV export reflecting current filters
- Design Playground (home): accent switcher (blue/violet/emerald/rose) + light/dark toggle driving live typography, buttons in every state, inputs, badges, tabs, card
- Experience timeline (4 roles from brief, no invented dates), Skills grid (4 categories, exact brief items)
- Contact: zod client validation + backend persistence + inline success panel + toasts, email copy button, GitHub/LinkedIn links (exact URLs from brief)
- SEO meta/OG tags, semantic HTML, data-testids on all interactive elements, ErrorBoundary

## Verified
- curl: GET /api/, POST /api/contact valid (persisted, verified in MongoDB), invalid → 422
- Screenshots desktop 1440 + mobile 390: all pages/flows, zero console errors, no horizontal overflow; UI form submission verified end-to-end in MongoDB

## Personas
- Recruiter/hiring manager: scans hero, opens case studies, checks dashboards' interactivity
- Founder/client: reads project details, uses contact form

## Implemented (2026-11-13, second pass)
- Real resume: `/resume.pdf` (user-uploaded PDF) wired to the hero Download Resume CTA with proper filename
- Real project links: Rodic AI → rodic-ai-checker.vercel.app, REEP → rodic-engineering-excellence-progra.vercel.app, GitHub links on all three
- Message inbox `/admin/messages`: key-gated (`GET /api/contact` requires `x-admin-key` matching ADMIN_KEY in backend/.env; 401 otherwise), sessionStorage unlock, newest-first cards with mailto links
- OG/Twitter share card (designed dark banner) at `/og-image.jpg`, `summary_large_image` meta
- Fixed: RouteEffects crashes on malformed URL hashes (selector now validated + try/catch)

## Implemented (2026-11-13, third pass)
- Crop-yield project GitHub button → github.com/piyush130504-wq/Cropred (repo verified public, HTTP 200)
- Privacy-friendly page analytics: `POST /api/track` (path + referrer hostname only, no cookies/PII, honors Do Not Track, skips /admin); `page_views` collection with created_at index; `GET /api/analytics` (x-admin-key gated) returning totals, by-path, by-day, top referrers
- Admin dashboard upgraded to tabbed `/admin` (also `/admin/messages`): Messages + Analytics tabs (total views, views by page with friendly labels, last-14-days bar chart, top referrers, refresh)

## Backlog
- P1: User presses Deploy to ship everything to the live URL (preview-only until then; custom admin key now active in preview and will carry to live on deploy)
- P2: Project deep-dive subpages; og:url canonical meta once live domain is known

## Notes
- Timeline deliberately has no invented dates (brief gives none) — uses index numbers
- Dashboard data is labelled "Sample data" (fictional product concepts, per brief)

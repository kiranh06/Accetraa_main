# Deployment Checklist — Accetraa Staging
**Environment:** Free staging (Render + Vercel)  
**Date prepared:** 2026-06-04  
**Scope:** Internal employee testing only — not a public launch

---

## Pre-Deployment Readiness Summary

| Check | Result |
|---|---|
| Frontend build (`npm run build`) | ✅ PASS — 242 modules, 0 errors |
| Backend Python syntax (all settings + urls) | ✅ PASS — ast.parse |
| AWS packages absent from staging path | ✅ PASS — boto3, botocore, django_ses, storages not installed |
| STAGING_MODE gate in urls.py | ✅ PASS |
| stagingMode guard in all 3 form sections | ✅ PASS |
| vercel.json SPA rewrites present | ✅ PASS |
| No RunSQL / MySQL-specific ops in migrations | ✅ PASS |
| EMAIL_BACKEND = dummy confirmed in staging.py | ✅ PASS |

---

## Part 1 — PostgreSQL Setup (Render)

### Step 1.1 — Create the database

1. Log in to [render.com](https://render.com)
2. **New → PostgreSQL**
3. Set the following:

   | Field | Value |
   |---|---|
   | Name | `accetraa-staging-db` |
   | Database | `accetraa_staging` |
   | User | `accetraa_user` |
   | Region | **Singapore (Southeast Asia)** — lowest latency from India |
   | Plan | **Free** |

4. Click **Create Database**
5. Wait for status to show **Available** (1–2 minutes)
6. Copy the **Internal Database URL** from the dashboard — format: `postgres://USER:PASSWORD@HOST/DBNAME`

> **Free tier note:** Render's free PostgreSQL expires after **90 days** of inactivity. Export a fixture backup before expiry. Upgrading to the $7/month Starter plan preserves the database indefinitely.

---

## Part 2 — Backend Deployment (Render Web Service)

### Step 2.1 — Push to GitHub

Ensure the repository is pushed to GitHub with all staging files committed:
- `backend/accetraa/settings/staging.py`
- `backend/requirements-staging.txt`
- `backend/Procfile`
- `backend/build.sh`

```bash
git add backend/accetraa/settings/staging.py \
        backend/requirements-staging.txt \
        backend/Procfile \
        backend/build.sh
git commit -m "Add staging deployment configuration"
git push origin main
```

### Step 2.2 — Create Web Service

1. Render dashboard → **New → Web Service**
2. Connect GitHub → select the repository
3. Set the following:

   | Field | Value |
   |---|---|
   | Name | `accetraa-staging-api` |
   | Root Directory | `backend` |
   | Runtime | **Python 3** |
   | Build Command | `chmod +x build.sh && ./build.sh` |
   | Start Command | `gunicorn accetraa.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120 --log-file -` |
   | Plan | **Free** |
   | Region | **Singapore** (same as database) |

### Step 2.3 — Link the database

1. In the Web Service settings → **Environment → Add from Database**
2. Select `accetraa-staging-db`
3. Render automatically injects `DATABASE_URL` into the web service environment

### Step 2.4 — Set environment variables

In **Environment → Environment Variables**, add each variable individually:

| Variable | Value | Notes |
|---|---|---|
| `DJANGO_SETTINGS_MODULE` | `accetraa.settings.staging` | Must be exact |
| `DJANGO_SECRET_KEY` | `<generate below>` | 50-char random key |
| `DEBUG` | `False` | Never True on staging |
| `ALLOWED_HOSTS` | `accetraa-staging-api.onrender.com` | Your Render service hostname |
| `DATABASE_URL` | *(auto-injected in Step 2.3)* | Do not set manually if linked |
| `CORS_ALLOWED_ORIGINS` | `https://accetraa.vercel.app` | Set after Vercel deploy (Step 3) |
| `STAGING_MODE` | `True` | Disables submission endpoints |
| `EMAIL_BACKEND` | `django.core.mail.backends.dummy.EmailBackend` | Belt-and-suspenders |

**Generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Do NOT set these on staging:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`
- `AWS_SES_REGION_NAME`
- `AWS_CLOUDFRONT_DOMAIN`
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` ← not used; `DATABASE_URL` is used instead

### Step 2.5 — First deploy

1. Click **Deploy** (or Render auto-deploys on push)
2. Watch the build log — expected output:
   ```
   --- Installing staging dependencies ---
   --- Collecting static files ---
   --- Running database migrations ---
   --- Build complete ---
   ```
3. Service status changes to **Live** when ready

### Step 2.6 — Create superuser

Open the **Render Shell** (web service → Shell tab):
```bash
python manage.py createsuperuser
```
Enter username, email, and password when prompted.

### Step 2.7 — Load fixture data (optional)

If service/product/portfolio fixtures exist:
```bash
python manage.py loaddata apps/services/fixtures/initial_services.json
```

---

## Part 3 — Frontend Deployment (Vercel)

### Step 3.1 — Push frontend files to GitHub

Ensure these files are committed:
- `frontend/vercel.json`
- `frontend/.env.example` (updated)
- `frontend/src/config/env.js` (updated)
- `frontend/src/pages/Contact/sections/ContactMain.jsx` (updated)
- `frontend/src/pages/Contact/sections/ConsultationForm.jsx` (updated)
- `frontend/src/pages/Contact/sections/DemoRequestForm.jsx` (updated)

### Step 3.2 — Import project on Vercel

1. Log in to [vercel.com](https://vercel.com)
2. **Add New → Project → Import Git Repository**
3. Select the repository
4. Configure:

   | Field | Value |
   |---|---|
   | **Root Directory** | `frontend` |
   | **Framework Preset** | Vite (auto-detected) |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |
   | **Install Command** | `npm install` |

### Step 3.3 — Set environment variables

In **Settings → Environment Variables** (set scope to **Production**, **Preview**, **Development**):

| Variable | Value | Notes |
|---|---|---|
| `VITE_API_BASE_URL` | `https://accetraa-staging-api.onrender.com` | Your Render service URL |
| `VITE_APP_NAME` | `Accetraa` | |
| `VITE_STAGING_MODE` | `true` | Activates informational notices |

### Step 3.4 — Deploy

1. Click **Deploy**
2. Vercel builds and deploys automatically (1–2 minutes)
3. Copy the deployment URL (e.g., `https://accetraa.vercel.app`)

### Step 3.5 — Update backend CORS

1. In Render → `accetraa-staging-api` → Environment
2. Update `CORS_ALLOWED_ORIGINS` to the exact Vercel URL: `https://accetraa.vercel.app`
3. Save → Render auto-redeploys (2–3 minutes)

---

## Part 4 — Post-Deploy Validation Checklist

Run each check after both deployments are live. Tick off each item before sharing the staging URL with the team.

### 4.1 Health endpoint check
```
GET https://accetraa-staging-api.onrender.com/api/v1/health/
Expected: HTTP 200, {"status": "ok", ...}
```
- [ ] Health endpoint returns 200

### 4.2 Django Admin check
```
GET https://accetraa-staging-api.onrender.com/admin/
Expected: Django Admin login page loads
```
- [ ] Admin login page renders (no 500 error)
- [ ] Login with superuser credentials succeeds
- [ ] Services list page loads and is editable
- [ ] Products list page loads and is editable
- [ ] Portfolio list page loads and is editable
- [ ] Can create a new Service entry and save it
- [ ] Can create a new Portfolio entry and save it

### 4.3 API endpoint checks (always-active)
```
GET https://accetraa-staging-api.onrender.com/api/v1/services/
Expected: HTTP 200, JSON array (empty if no fixtures loaded)
```
- [ ] `GET /api/v1/services/` → HTTP 200
- [ ] `GET /api/v1/products/` → HTTP 200
- [ ] `GET /api/v1/portfolio/` → HTTP 200
- [ ] `GET /api/v1/portfolio/categories/` → HTTP 200

### 4.4 Submission endpoint checks (must be disabled)
```
POST https://accetraa-staging-api.onrender.com/api/v1/contact/
Expected: HTTP 404 (endpoint disabled by STAGING_MODE)
```
- [ ] `POST /api/v1/contact/` → HTTP **404** (not 200, not 405)
- [ ] `POST /api/v1/consultation/` → HTTP **404**
- [ ] `POST /api/v1/demo-requests/` → HTTP **404**

### 4.5 Static asset checks
```
GET https://accetraa-staging-api.onrender.com/static/admin/css/base.css
Expected: HTTP 200 (WhiteNoise serving)
```
- [ ] Admin CSS loads (confirms WhiteNoise is working)
- [ ] Admin panel is fully styled (not unstyled/broken)

### 4.6 Frontend routing checks
```
Visit each URL directly (not via link navigation):
https://accetraa.vercel.app/about
https://accetraa.vercel.app/services
https://accetraa.vercel.app/portfolio
https://accetraa.vercel.app/contact
https://accetraa.vercel.app/careers
Expected: Page loads correctly (not a 404)
```
- [ ] `/` → Home page loads
- [ ] `/about` → About page loads (direct URL)
- [ ] `/services` → Services page loads (direct URL)
- [ ] `/portfolio` → Portfolio page loads (direct URL)
- [ ] `/contact` → Contact page loads (direct URL)
- [ ] `/careers` → Careers page loads (direct URL)
- [ ] `/nonexistent-page` → 404 page (not a Vercel error)

### 4.7 Frontend staging mode checks
- [ ] Contact page: "Online forms temporarily unavailable" notice visible
- [ ] Contact page: Email link (`contact@accetraa.com`) is present and clickable
- [ ] Consultation section: Staging notice replaces the live form
- [ ] Demo Request section: Staging notice replaces the live form
- [ ] Contact info cards (email, phone, address, hours) still visible on left column

### 4.8 API integration checks (frontend ↔ backend)
- [ ] Services page: data loads from Render API (or empty state shown correctly)
- [ ] Portfolio page: data loads, category filter renders
- [ ] Products page: data loads or ProductsShowcase shows empty state
- [ ] No CORS errors in browser console

### 4.9 Email non-sending verification
- [ ] Submit a contact request via Render Admin → verify **no email** arrives at any inbox
  *(Note: submission endpoint is disabled on staging, so this is moot — but the dummy backend provides belt-and-suspenders protection)*
- [ ] Check Render logs after any admin action → confirm no `SMTP` or `SES` connection attempts

### 4.10 Responsive check
- [ ] Test at 375px width (iPhone SE) — all pages render without horizontal scroll
- [ ] Test at 768px width (tablet) — navigation and layout correct
- [ ] Test at 1280px width (desktop) — full layout renders

---

## Part 5 — Rollback Procedures

### 5.1 Frontend rollback (Vercel)
**Time to rollback: < 1 minute, zero downtime**
1. Vercel dashboard → select project → **Deployments** tab
2. Find the last known-good deployment
3. Click the three-dot menu → **Promote to Production**
4. Done — the previous build is live instantly

### 5.2 Backend rollback (Render)
**Time to rollback: ~3 minutes**
1. Render dashboard → `accetraa-staging-api` → **Deploys** tab
2. Find the last known-good deploy
3. Click **Redeploy**
4. If a migration caused the issue, also run in the Render Shell:
   ```bash
   python manage.py migrate <app_name> <previous_migration_number>
   # Example: python manage.py migrate services 0001_initial
   ```

### 5.3 Disable staging mode (restore live forms)

No code changes required — environment variables only:

**Backend (Render):**
- Remove `STAGING_MODE` variable (or set to `False`)
- Render auto-redeploys → submission endpoints restored

**Frontend (Vercel):**
- Change `VITE_STAGING_MODE` from `true` to `false` (or remove it)
- Trigger redeploy → live forms restored

### 5.4 Full teardown (if staging is no longer needed)
1. Export data: run `python manage.py dumpdata apps.services apps.products apps.portfolio --indent 2 > backup.json` in Render Shell
2. Download `backup.json` via Render log or copy-paste
3. Delete Render Web Service → **Settings → Delete Service**
4. Delete Render PostgreSQL → **Settings → Delete Database**
5. Delete Vercel project → **Settings → Delete Project**

---

## Part 6 — Production Migration Path (Back to AWS/MySQL)

When production is ready, these are the only changes required:

### Backend changes
| Action | File / Location |
|---|---|
| Switch settings module | `DJANGO_SETTINGS_MODULE=accetraa.settings.production` |
| Remove STAGING_MODE | Delete from environment |
| Use MySQL DB vars | Set `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` |
| Add AWS vars | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME`, `AWS_SES_REGION_NAME` |
| Use production requirements | `pip install -r requirements.txt` (re-adds PyMySQL, boto3, django-ses, storages) |
| Run migrations on RDS | `python manage.py migrate` against MySQL RDS |
| Collect static to S3 | `python manage.py collectstatic` |

### Frontend changes
| Action | Variable |
|---|---|
| Restore live forms | Remove `VITE_STAGING_MODE` or set to `false` |
| Point to production API | `VITE_API_BASE_URL=https://api.accetraa.com` |

**Nothing else changes.** All models, migrations, serializers, views, components, and pages are production-ready as-is.

---

## Part 7 — Environment Variable Reference Card

### Backend — Render Web Service (Staging)

```
DJANGO_SETTINGS_MODULE  = accetraa.settings.staging
DJANGO_SECRET_KEY       = <50-char random string>
DEBUG                   = False
ALLOWED_HOSTS           = accetraa-staging-api.onrender.com
DATABASE_URL            = <auto-injected from linked PG service>
CORS_ALLOWED_ORIGINS    = https://accetraa.vercel.app
STAGING_MODE            = True
EMAIL_BACKEND           = django.core.mail.backends.dummy.EmailBackend
```

### Frontend — Vercel (Staging)

```
VITE_API_BASE_URL   = https://accetraa-staging-api.onrender.com
VITE_APP_NAME       = Accetraa
VITE_STAGING_MODE   = true
```

---

## Part 8 — Known Limitations & Mitigations

| Limitation | Impact | Mitigation |
|---|---|---|
| Render free tier spins down after 15 min idle | First request after idle: 30–50 second cold start | Expected for internal testing. Use [UptimeRobot](https://uptimerobot.com) (free) to ping `/api/v1/health/` every 5 minutes to keep service warm |
| Render free PostgreSQL expires in 90 days | Database deleted, all CMS content lost | Set a calendar reminder at day 80 to either upgrade or export a backup |
| Media files (images) are on ephemeral Render disk | Admin-uploaded images lost on every redeploy | Acceptable for internal testing. Production uses S3 |
| No custom domain on free tier | URL is `*.onrender.com` / `*.vercel.app` | Acceptable for employee review. Production will use `api.accetraa.com` |
| Render free: 0.1 CPU, 512 MB RAM | Slow under concurrent load | Sufficient for a handful of internal reviewers |

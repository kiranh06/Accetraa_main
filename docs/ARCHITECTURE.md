# System Architecture — Phase 1 MVP
## Accetraa Technologies Corporate Website
**Version:** 2.0 (Phase 1)
**Date:** 2026-06-03
**Status:** APPROVED FOR DEVELOPMENT

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Frontend Architecture — React + Vite](#2-frontend-architecture--react--vite)
3. [Backend Architecture — Django + DRF](#3-backend-architecture--django--drf)
4. [Project Folder Structure](#4-project-folder-structure)
5. [Data Flow Diagrams](#5-data-flow-diagrams)
6. [Environment Configuration](#6-environment-configuration)
7. [Development Setup](#7-development-setup)
8. [Production Architecture (AWS)](#8-production-architecture-aws)
9. [Security Architecture](#9-security-architecture)
10. [Phase 2 Extensibility Design](#10-phase-2-extensibility-design)

---

## 1. Architecture Overview

### 1.1 System Topology

```
┌─────────────────────────────────────────────────┐
│                  Browser / Client                │
│                                                  │
│        React SPA (Vite build output)             │
│        React Router (client-side routing)        │
└──────────────────────┬──────────────────────────┘
                       │ HTTP/HTTPS
                       │ API calls: /api/v1/*
                       │ (CORS validated)
┌──────────────────────▼──────────────────────────┐
│              Django Application Server           │
│                                                  │
│    Django REST Framework (API layer)             │
│    Django Admin (built-in, /admin/)              │
│    Python 3.11+                                  │
└──────────┬────────────────────┬─────────────────┘
           │                    │
┌──────────▼──────┐    ┌────────▼───────────────┐
│  MySQL 8.0 DB   │    │  File Storage          │
│  (local dev)    │    │  local: media/ folder  │
│  (RDS prod)     │    │  prod: AWS S3          │
└─────────────────┘    └────────────────────────┘
```

### 1.2 Phase 1 Architecture Principles
| Principle | Decision |
|---|---|
| **Simple over complex** | No microservices, no message queues, no Redis in Phase 1 |
| **Decoupled frontend/backend** | React SPA communicates with Django only via REST API |
| **Django admin is the CMS** | No separate headless CMS; Django's built-in admin is customised |
| **Localhost first** | All development is local; AWS deployment is Phase 1 launch, not during dev |
| **Vertical then horizontal** | Single server in production; scale out only if traffic demands |
| **Standard Django patterns** | Apps, views, serializers, models — no over-engineering |

---

## 2. Frontend Architecture — React + Vite

### 2.1 Technology Rationale

| Technology | Purpose | Why |
|---|---|---|
| **React 18** | UI rendering | Component model, ecosystem, team familiarity |
| **Vite 5** | Build tool + dev server | Fast HMR, ES module native, small config |
| **React Router DOM v6** | Client-side routing | Declarative routing, lazy loading, nested layouts |
| **SCSS (Sass)** | Styling | Variables, mixins, nesting — structured CSS without a heavy runtime |
| **Axios** | HTTP client | Interceptors for error handling, request/response transform |

### 2.2 Page Component Map

| Route | Page Component | Data Source |
|---|---|---|
| `/` | `HomePage` | API: services (featured), products (featured), portfolio (featured) |
| `/about` | `AboutPage` | Static content (hardcoded for Phase 1) |
| `/services` | `ServicesPage` | API: all active services |
| `/portfolio` | `PortfolioPage` | API: all products, all portfolio items + categories |
| `/contact` | `ContactPage` | Static layout; forms POST to API |
| `/careers` | `CareersPage` | Static content (optional) |
| `*` | `NotFoundPage` | Static 404 message |

### 2.3 Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation (desktop)
│   │   ├── HamburgerMenu (mobile)
│   │   └── CTAButtons ("Request Consultation", "Book Demo")
│   ├── [Page Content — rendered by React Router]
│   └── Footer
│       ├── FooterLinks
│       ├── ContactInfo
│       └── SocialLinks
│
├── Pages
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── StatsBar
│   │   ├── ServicesOverview (cards from API)
│   │   ├── FeaturedProducts (cards from API)
│   │   ├── PortfolioHighlights (cards from API)
│   │   ├── TestimonialsSection (static)
│   │   └── HomeCTASection
│   │
│   ├── AboutPage
│   │   ├── AboutHero
│   │   ├── CompanyStory
│   │   ├── MissionVision
│   │   ├── CoreValues
│   │   ├── TeamSection (static profile cards)
│   │   ├── StatsBar
│   │   └── PartnersSection (static logos)
│   │
│   ├── ServicesPage
│   │   ├── ServicesHero
│   │   ├── ServicesGrid (cards from API)
│   │   ├── IndustriesServed (static grid)
│   │   └── ServicesCTASection
│   │
│   ├── PortfolioPage
│   │   ├── PortfolioHero
│   │   ├── ProductsSection (cards from API)
│   │   ├── PortfolioFilter (category tabs — client-side)
│   │   ├── PortfolioGrid (filtered cards from API)
│   │   ├── PortfolioItemModal (opens on card click)
│   │   └── PortfolioCTASection
│   │
│   ├── ContactPage
│   │   ├── ContactHero
│   │   ├── ContactInfo (address, phone, email)
│   │   ├── FormTabs (General | Consultation | Demo)
│   │   │   ├── ContactForm
│   │   │   ├── ConsultationForm
│   │   │   └── DemoRequestForm
│   │   └── SocialLinks
│   │
│   └── CareersPage (optional)
│       ├── CareersHero
│       ├── WhyJoinUs
│       └── CurrentOpeningsPlaceholder
│
└── Shared Components
    ├── UI
    │   ├── Button
    │   ├── Card
    │   ├── Badge
    │   ├── Modal
    │   ├── Spinner (loading state)
    │   └── Alert (success/error messages)
    ├── Forms
    │   ├── FormField (input + label + error)
    │   ├── FormSelect
    │   └── FormTextarea
    └── Sections
        ├── SectionHeader (title + subtitle)
        └── CTABanner (reusable call-to-action strip)
```

### 2.4 State Management

Phase 1 is simple enough to avoid a global state library.

| State Type | Solution |
|---|---|
| API fetched data | Local `useState` + `useEffect` per page (sufficient for Phase 1 data volume) |
| Form state | Controlled inputs with local `useState` |
| Form validation errors | Local `useState` object `{ field: errorMessage }` |
| Portfolio filter (active category) | Local `useState` in `PortfolioPage` |
| Modal open/content | Local `useState` in `PortfolioPage` |
| Loading/error states | Local `useState` per API call |
| Global (Phase 2) | Add **Zustand** or **React Query** when data sharing between pages is needed |

### 2.5 API Client Layer

A single `src/services/api.js` module wraps all API calls.

```
src/services/api.js
├── axiosInstance         → base URL, default headers, interceptors
├── servicesAPI           → getServices()
├── productsAPI           → getProducts(featured?)
├── portfolioAPI          → getPortfolioItems(category?), getCategories()
├── leadsAPI              → submitContact(), submitConsultation(), submitDemoRequest()
```

Error handling: A response interceptor maps HTTP error codes to user-friendly messages. The page component receives either `{ data }` or `{ error }`.

### 2.6 Routing Configuration

```javascript
// router.jsx — lazy-loaded routes for code splitting
const routes = [
  { path: '/',          element: <HomePage />,      eager: true },
  { path: '/about',     element: <AboutPage /> },
  { path: '/services',  element: <ServicesPage /> },
  { path: '/portfolio', element: <PortfolioPage /> },
  { path: '/contact',   element: <ContactPage /> },
  { path: '/careers',   element: <CareersPage /> },   // optional
  { path: '*',          element: <NotFoundPage /> },

  // Phase 2 routes — not rendered but reserved
  // { path: '/services/:slug',  element: <ServiceDetailPage /> },
  // { path: '/portfolio/:slug', element: <PortfolioDetailPage /> },
  // { path: '/blog',            element: <BlogPage /> },
]
```

`React.lazy()` wraps all non-home pages for route-level code splitting. Vite automatically chunks each lazy-loaded page into a separate JS file.

### 2.7 SCSS Architecture

```
src/styles/
├── _variables.scss     → Brand colours, font sizes, spacing scale, breakpoints
├── _mixins.scss        → Responsive helpers, flex/grid mixins, button mixin
├── _reset.scss         → Box-sizing, margin resets, base typography
├── _typography.scss    → Font imports (Google Fonts), heading/body styles
├── _animations.scss    → Fade-in, slide-up keyframes for scroll animations
└── main.scss           → Imports all partials; global body/layout rules
```

**Each component has a co-located `.scss` file:**
```
components/
└── sections/
    └── HeroSection/
        ├── HeroSection.jsx
        └── HeroSection.scss
```

**Breakpoints (mobile-first):**
```scss
$breakpoints: (
  'sm':  576px,   // large mobile / small tablet
  'md':  768px,   // tablet
  'lg':  992px,   // small desktop
  'xl':  1280px,  // desktop
  'xxl': 1536px   // wide desktop
);
```

---

## 3. Backend Architecture — Django + DRF

### 3.1 Django Application Structure

**Single Django project, multi-app structure.** Apps are separated by domain so Phase 2 features (blog, careers) can be added as new apps without touching existing ones.

```
backend/
└── accetraa_project/         ← Django project root
    ├── manage.py
    ├── requirements.txt
    ├── .env                  ← local env vars (git-ignored)
    ├── .env.example          ← template with keys, no values
    │
    ├── accetraa/             ← Project configuration package
    │   ├── __init__.py
    │   ├── settings/
    │   │   ├── __init__.py
    │   │   ├── base.py       ← Common settings for all environments
    │   │   ├── development.py ← DEBUG=True, console email, local DB
    │   │   └── production.py  ← DEBUG=False, AWS RDS, SES, S3
    │   ├── urls.py           ← Root URL configuration
    │   ├── wsgi.py           ← WSGI entry point (production)
    │   └── asgi.py           ← ASGI entry point (future async)
    │
    └── apps/
        ├── portfolio/        ← Services, Products, Portfolio Items
        ├── leads/            ← Contact, Consultation, Demo requests
        └── core/             ← Base model, shared utilities, health check
```

### 3.2 Django Apps in Detail

#### `apps/core/`
Provides base abstractions used by other apps.

```
core/
├── models.py       → TimeStampedModel (abstract: created_at, updated_at)
├── views.py        → HealthCheckView (GET /api/v1/health/ → 200 OK)
├── permissions.py  → IsStaffUser (custom DRF permission for admin endpoints)
├── throttling.py   → FormSubmissionThrottle (custom scope throttle)
└── admin.py        → (empty — core has no admin-registered models)
```

**`TimeStampedModel` (abstract base):**
All Phase 1 custom models inherit from this to get `created_at` and `updated_at` automatically.

---

#### `apps/portfolio/`
Manages all content: services, products, portfolio items.

```
portfolio/
├── models.py
│   ├── Service
│   ├── Product
│   ├── PortfolioCategory
│   └── PortfolioItem
│
├── serializers.py
│   ├── ServiceSerializer              (public — short fields only)
│   ├── ServiceAdminSerializer         (admin — all fields)
│   ├── ProductSerializer              (public)
│   ├── ProductAdminSerializer         (admin)
│   ├── PortfolioCategorySerializer
│   ├── PortfolioItemSerializer        (public — includes nested category)
│   └── PortfolioItemAdminSerializer   (admin)
│
├── views.py
│   ├── Public Views (ListAPIView — read-only, no auth)
│   │   ├── ServiceListView
│   │   ├── ProductListView
│   │   ├── PortfolioCategoryListView
│   │   └── PortfolioItemListView
│   └── Admin Views (ModelViewSet — IsStaffUser permission)
│       ├── ServiceAdminViewSet
│       ├── ProductAdminViewSet
│       ├── PortfolioCategoryAdminViewSet
│       └── PortfolioItemAdminViewSet
│
├── admin.py
│   ├── ServiceAdmin      (list_display, search, filter, sortable)
│   ├── ProductAdmin
│   ├── PortfolioCategoryAdmin
│   └── PortfolioItemAdmin
│
└── urls.py
```

---

#### `apps/leads/`
Handles all form submissions.

```
leads/
├── models.py
│   ├── ContactRequest
│   ├── ConsultationRequest
│   └── DemoRequest
│
├── serializers.py
│   ├── ContactRequestSerializer           (public — write only, strict validation)
│   ├── ConsultationRequestSerializer      (public)
│   ├── DemoRequestSerializer              (public)
│   ├── ContactRequestAdminSerializer      (admin — read + status update)
│   ├── ConsultationRequestAdminSerializer
│   └── DemoRequestAdminSerializer
│
├── views.py
│   ├── Public Form Views (CreateAPIView — POST only, no auth)
│   │   ├── ContactCreateView
│   │   ├── ConsultationCreateView
│   │   └── DemoRequestCreateView
│   └── Admin List/Detail Views (ModelViewSet — IsStaffUser, read + PATCH only)
│       ├── ContactLeadAdminViewSet
│       ├── ConsultationLeadAdminViewSet
│       └── DemoLeadAdminViewSet
│
├── signals.py      → Post-save signals triggering email notifications
├── email.py        → Email helper functions (compose + send via Django email backend)
├── admin.py        → Custom admin list views with export to CSV action
└── urls.py
```

**Email notification flow (Phase 1 — synchronous, simple):**
```python
# signals.py
@receiver(post_save, sender=ConsultationRequest)
def send_consultation_notification(sender, instance, created, **kwargs):
    if created:
        send_internal_notification(instance)   # to sales@accetraa.com
        send_acknowledgement(instance)         # to instance.email
```

**Development:** `EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'`
**Production:** `EMAIL_BACKEND = 'django_ses.SESBackend'` (AWS SES)

### 3.3 Django Admin Customisation

The built-in Django admin at `/admin/` is customised to be the Phase 1 CMS:

```python
# portfolio/admin.py
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display  = ['sort_order', 'name', 'is_active', 'updated_at']
    list_editable = ['sort_order', 'is_active']          # inline editable
    list_filter   = ['is_active']
    search_fields = ['name', 'short_description']
    prepopulated_fields = {'slug': ('name',)}             # auto-fill slug

@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display  = ['title', 'category', 'is_featured', 'is_active', 'sort_order']
    list_editable = ['is_featured', 'is_active', 'sort_order']
    list_filter   = ['category', 'is_active', 'is_featured']
    search_fields = ['title', 'client_name', 'technologies']

# leads/admin.py
@admin.register(ConsultationRequest)
class ConsultationRequestAdmin(admin.ModelAdmin):
    list_display   = ['full_name', 'company_name', 'email', 'service_interest', 'status', 'created_at']
    list_filter    = ['status', 'created_at']
    search_fields  = ['full_name', 'email', 'company_name']
    readonly_fields = ['full_name', 'company_name', 'email', 'phone',
                       'service_interest', 'message', 'ip_address', 'created_at']
    fields         = ['full_name', 'company_name', 'email', 'phone',
                      'service_interest', 'message', 'status', 'admin_notes',
                      'ip_address', 'created_at']
    actions        = ['export_as_csv', 'mark_as_contacted']
```

### 3.4 Settings Architecture

```python
# settings/base.py — shared across all environments
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # Project apps
    'apps.core',
    'apps.portfolio',
    'apps.leads',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',   # public default; admin views override
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'contact_form': '3/hour',
        'consultation_form': '3/hour',
        'demo_form': '3/hour',
    },
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST', default='localhost'),
        'PORT': env('DB_PORT', default='3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}
```

---

## 4. Project Folder Structure

Complete folder structure for the entire project (both frontend and backend).

```
accetraa-website/                     ← Root project directory
│
├── backend/                          ← Django project
│   ├── accetraa/                     ← Django config package
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   ├── apps/
│   │   ├── core/
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── models.py           (TimeStampedModel abstract base)
│   │   │   ├── views.py            (HealthCheckView)
│   │   │   ├── permissions.py
│   │   │   ├── throttling.py
│   │   │   └── apps.py
│   │   │
│   │   ├── portfolio/
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── admin.py
│   │   │   ├── urls.py
│   │   │   └── apps.py
│   │   │
│   │   └── leads/
│   │       ├── migrations/
│   │       ├── __init__.py
│   │       ├── models.py
│   │       ├── serializers.py
│   │       ├── views.py
│   │       ├── admin.py
│   │       ├── email.py
│   │       ├── signals.py
│   │       ├── urls.py
│   │       └── apps.py
│   │
│   ├── media/                        ← Uploaded files (dev only; S3 in prod)
│   │   ├── products/
│   │   └── portfolio/
│   │
│   ├── static/                       ← Django admin static (collected)
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env                          ← git-ignored
│   ├── .env.example
│   └── README.md
│
├── frontend/                         ← React + Vite project
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/               ← Static images (logo, hero, team photos)
│   │   │   └── icons/                ← SVG icons
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header/
│   │   │   │   │   ├── Header.jsx
│   │   │   │   │   └── Header.scss
│   │   │   │   ├── Footer/
│   │   │   │   │   ├── Footer.jsx
│   │   │   │   │   └── Footer.scss
│   │   │   │   └── Layout.jsx        ← Wraps Header + Outlet + Footer
│   │   │   │
│   │   │   ├── ui/                   ← Reusable atomic components
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── Badge/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Spinner/
│   │   │   │   └── Alert/
│   │   │   │
│   │   │   ├── forms/                ← Form components
│   │   │   │   ├── ContactForm/
│   │   │   │   │   ├── ContactForm.jsx
│   │   │   │   │   └── ContactForm.scss
│   │   │   │   ├── ConsultationForm/
│   │   │   │   └── DemoRequestForm/
│   │   │   │
│   │   │   └── sections/             ← Page section components
│   │   │       ├── Hero/
│   │   │       ├── StatsBar/
│   │   │       ├── ServicesGrid/
│   │   │       ├── ProductsShowcase/
│   │   │       ├── PortfolioGrid/
│   │   │       ├── PortfolioItemModal/
│   │   │       ├── TestimonialsSection/
│   │   │       ├── TeamSection/
│   │   │       ├── CTABanner/
│   │   │       └── SectionHeader/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   └── HomePage.scss
│   │   │   ├── About/
│   │   │   ├── Services/
│   │   │   ├── Portfolio/
│   │   │   ├── Contact/
│   │   │   ├── Careers/
│   │   │   └── NotFound/
│   │   │
│   │   ├── services/                 ← API client
│   │   │   └── api.js
│   │   │
│   │   ├── hooks/                    ← Custom React hooks
│   │   │   ├── useApi.js             ← Generic fetch hook (loading, error, data)
│   │   │   ├── useForm.js            ← Form state + validation hook
│   │   │   └── useScrollAnimation.js ← IntersectionObserver for fade-in effects
│   │   │
│   │   ├── utils/
│   │   │   ├── validators.js         ← Email, phone, required validators
│   │   │   └── helpers.js            ← Date format, text truncate, etc.
│   │   │
│   │   ├── styles/
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _reset.scss
│   │   │   ├── _typography.scss
│   │   │   ├── _animations.scss
│   │   │   └── main.scss
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx                  ← Vite entry point
│   │   └── router.jsx                ← React Router configuration
│   │
│   ├── index.html                    ← Vite HTML template
│   ├── vite.config.js
│   ├── package.json
│   ├── .eslintrc.js
│   └── .env.local                    ← VITE_API_BASE_URL=http://localhost:8000
│
├── .gitignore
└── README.md
```

---

## 5. Data Flow Diagrams

### 5.1 Page Load (Services Page)

```
Browser requests /services
        │
        ▼
React Router renders <ServicesPage />
        │
        ▼
useEffect → api.getServices()
        │
        ▼ HTTP GET http://localhost:8000/api/v1/services/
Django ServiceListView
        │
        ▼
MySQL query: SELECT * FROM portfolio_service WHERE is_active=1 ORDER BY sort_order
        │
        ▼
ServiceSerializer → JSON response
        │
        ▼ 200 OK [{...}, {...}]
useState setServices(data)
        │
        ▼
React renders <ServicesGrid services={services} />
        │
        ▼
Browser displays service cards
```

### 5.2 Form Submission (Consultation Request)

```
User fills ConsultationForm → clicks "Submit"
        │
        ▼
useForm validation:
  ├─[invalid]──► setState errors → show inline errors → STOP
  │
  ▼ (valid)
setLoading(true)
        │
        ▼ HTTP POST /api/v1/consultation/
        │   Body: { full_name, company_name, email, phone, service_interest, message }
        │
DRF ConsultationCreateView
        │
        ▼
Check throttle: ip_address not rate-limited
        │
ConsultationRequestSerializer.is_valid()
  ├─[invalid]──► 400 { field: [error] }
  │
  ▼ (valid)
serializer.save()
        │
        ▼
ConsultationRequest row created in MySQL
        │
        ▼
Django signal fires:
  ├─ send_mail → sales@accetraa.com (internal notification)
  └─ send_mail → submitter email (acknowledgement)
        │
        ▼ 201 { "message": "Thank you!..." }
setLoading(false)
setSuccess(true)
        │
        ▼
Form replaced with success message component
```

---

## 6. Environment Configuration

### 6.1 Backend Environment Variables

**File:** `backend/.env` (git-ignored)
**Template:** `backend/.env.example`

```bash
# Django
DJANGO_SECRET_KEY=your-very-long-random-secret-key
DJANGO_SETTINGS_MODULE=accetraa.settings.development
DEBUG=True

# Database (MySQL)
DB_NAME=accetraa_db
DB_USER=accetraa_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306

# Email — Development (console output)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
# Email — Production (AWS SES)
# EMAIL_BACKEND=django_ses.SESBackend
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_SES_REGION_NAME=ap-south-1

# Notification recipients
SALES_EMAIL=sales@accetraa.com
HR_EMAIL=hr@accetraa.com
FROM_EMAIL=no-reply@accetraa.com

# CORS — allow React dev server
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Media files — Development (local)
MEDIA_ROOT=./media/
MEDIA_URL=/media/
# Production (AWS S3)
# AWS_STORAGE_BUCKET_NAME=
# AWS_S3_REGION_NAME=
```

### 6.2 Frontend Environment Variables

**File:** `frontend/.env.local` (git-ignored)
**Template:** `frontend/.env.example`

```bash
# Development
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Production (set in CI/CD or Vercel/build environment)
# VITE_API_BASE_URL=https://api.accetraa.com/api/v1
```

**Usage in code:**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## 7. Development Setup

### 7.1 Prerequisites
- Python 3.11+
- Node.js 18+ and npm/yarn
- MySQL 8.0 (local installation or Docker)
- Git

### 7.2 Local MySQL Setup
```
Database name:  accetraa_db
User:           accetraa_user
Password:       (defined in .env)
Host:           localhost
Port:           3306
Character set:  utf8mb4
Collation:      utf8mb4_unicode_ci
```

### 7.3 Running in Development

**Terminal 1 — Django backend:**
```
cd backend
python -m venv venv
venv\Scripts\activate         (Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver    → http://localhost:8000
```

**Terminal 2 — React frontend:**
```
cd frontend
npm install
npm run dev                   → http://localhost:5173
```

**Access points during development:**
| URL | Purpose |
|---|---|
| `http://localhost:5173` | React frontend (public website) |
| `http://localhost:8000/admin/` | Django admin panel |
| `http://localhost:8000/api/v1/` | REST API |
| `http://localhost:8000/api/v1/health/` | Health check |

### 7.4 Loading Seed Data
```
python manage.py loaddata apps/portfolio/fixtures/initial_services.json
python manage.py loaddata apps/portfolio/fixtures/initial_categories.json
```

---

## 8. Production Architecture (AWS)

Phase 1 production deployment uses AWS services. **This is not implemented during development — only after development is complete and approved.**

```
Internet Users
       │
       ▼
AWS CloudFront (CDN)
├── /static/*         → AWS S3 (React build output — static website hosting)
├── /media/*          → AWS S3 (user uploads — portfolio images, product thumbnails)
└── /api/*            → AWS EC2 (Django application server via Nginx + Gunicorn)
       │
       ▼
AWS EC2 (t3.small — sufficient for Phase 1)
├── Nginx (reverse proxy + SSL termination)
└── Gunicorn (WSGI server, 4 workers)
       │
       ▼
AWS RDS (MySQL 8.0, db.t3.micro)
       │
       ▼ (email sending)
AWS SES (transactional email)
       │
       ▼ (future: SMS / push notifications)
AWS SNS
```

**Static file hosting (React SPA):**
- `npm run build` generates `dist/` folder
- Uploaded to S3 bucket with static website hosting enabled
- CloudFront distribution fronts the S3 bucket
- `index.html` served for all paths (SPA routing)
- Cache: `index.html` — 60 seconds; all other assets — 1 year (content-hashed filenames)

**Media files (Django uploads):**
- `django-storages` with S3 backend
- `DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'`
- Separate S3 bucket for media
- CloudFront serves media via CDN

**Environment variable management on EC2:**
- `/etc/environment` or systemd service environment file
- Never committed to git

---

## 9. Security Architecture

### 9.1 Security Controls by Layer

| Layer | Control | Implementation |
|---|---|---|
| Network | HTTPS only | AWS CloudFront enforces HTTPS; EC2 Nginx redirect HTTP→HTTPS |
| Network | DDoS protection | AWS CloudFront (basic), AWS Shield Standard (free) |
| Application | CSRF | DRF uses JWT (stateless); no CSRF tokens needed for API; Django admin uses Django's own CSRF |
| Application | CORS | `django-cors-headers`; production allows only `accetraa.com` |
| Application | SQL injection | Django ORM parameterized queries; no raw SQL |
| Application | Input validation | DRF serializer validation on every endpoint |
| Application | Rate limiting | DRF throttling per form endpoint (3/hour per IP) |
| Application | Secret management | All secrets in environment variables; never in source code |
| Application | XSS | React escapes all rendered content by default; no `dangerouslySetInnerHTML` |
| Data | DB access | EC2 → RDS only via VPC private subnet; no public RDS endpoint |
| File | Media uploads | Django admin only; file type not validated for Phase 1 (admin-only uploads — low risk) |
| Auth | Admin login | Django's built-in brute-force protection (`AXES` library recommended for Phase 2) |

### 9.2 Security Headers (Nginx — Production)
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

---

## 10. Phase 2 Extensibility Design

Phase 1 architecture decisions that make Phase 2 easy:

| Design Decision | Phase 2 Benefit |
|---|---|
| Django multi-app structure | Add `apps/blog/`, `apps/careers/`, `apps/resources/` without touching existing apps |
| API versioned at `/api/v1/` | Introduce `/api/v2/` endpoints without breaking Phase 1 frontend |
| React Router lazy loading | Add new routes (`/blog`, `/services/:slug`) by adding one route entry |
| Component-based SCSS | New page components get their own `.scss` file; no global style conflicts |
| `TimeStampedModel` base | All future models inherit timestamps automatically |
| `slug` field on all content models | URLs like `/services/ai-data-solutions` work without code changes — slugs already exist |
| `description` field (nullable) on Service/Product | Service/Product detail pages can be built immediately — content field already in DB |
| Lead `admin_notes` field | Admin workflow enhancements (status history, assignments) are additive |
| JWT API auth already configured | Phase 2 custom React admin panel can use JWT without backend changes |
| S3 for media in production | Phase 2 blog post images, white paper PDFs — same storage backend |
| AWS SES for email | Phase 2 newsletter, drip campaigns — same email infrastructure |

### Phase 2 New Apps (planned, not built):
```
apps/blog/           → Blog posts, categories, tags
apps/resources/      → White papers, FAQ, case studies
apps/careers/        → Job postings, applications
apps/marketing/      → Newsletter subscribers, campaigns
apps/company/        → Editable team, partners, testimonials, site settings
```

---

*Phase 1 Architecture v2.0 — DRAFT. Awaiting approval.*

# Development Roadmap — Phase 1 MVP
## Accetraa Technologies Corporate Website
**Version:** 1.0
**Date:** 2026-06-03
**Status:** APPROVED FOR DEVELOPMENT

---

## Table of Contents

1. [Phase 1 Overview](#1-phase-1-overview)
2. [Pre-Development Checklist](#2-pre-development-checklist)
3. [Development Sprints](#3-development-sprints)
4. [Task Breakdown by Sprint](#4-task-breakdown-by-sprint)
5. [Milestone Summary](#5-milestone-summary)
6. [Definition of Done — Phase 1](#6-definition-of-done--phase-1)
7. [Risk Register](#7-risk-register)
8. [Phase 2 Roadmap (Preview)](#8-phase-2-roadmap-preview)

---

## 1. Phase 1 Overview

| Item | Detail |
|---|---|
| **Goal** | Launch a professional 5-page corporate website with lead capture |
| **Pages** | Home, About Us, Services, Portfolio & Products, Contact Us (+ optional Careers) |
| **Forms** | Contact, Consultation Request, Demo Request |
| **Tech Stack** | React + Vite + SCSS (frontend) / Python + Django + DRF (backend) / MySQL |
| **Estimated Duration** | 7–8 weeks (1 developer) or 4–5 weeks (2 developers) |
| **Deployment Target** | AWS (S3 + CloudFront + EC2 + RDS + SES) |
| **Launch Ready** | End of Sprint 7 |

### Team Assumption
This roadmap assumes **1–2 full-stack developers**. Times can be parallelised with separate frontend and backend developers.

---

## 2. Pre-Development Checklist

These must be completed **before** Sprint 1 begins. Blocking items are marked ⛔.

| # | Item | Owner | Status |
|---|---|---|---|
| P-01 | ⛔ Architecture documents approved (SRS, DB, API, ARCH) | Stakeholders | Pending approval |
| P-02 | ⛔ Content package delivered: company copy, team bios, service descriptions, portfolio images, product descriptions | Accetraa Marketing | Not started |
| P-03 | ⛔ Brand assets delivered: logo (SVG + PNG), brand colours, typography | Accetraa Design | Not started |
| P-04 | Development environment confirmed: Python 3.11+, Node.js 18+, MySQL 8.0, Git | Developer(s) | Not started |
| P-05 | GitHub (or equivalent) repository created with branch strategy defined | Tech Lead | Not started |
| P-06 | Social media URLs confirmed: LinkedIn, Twitter/X, Instagram | Accetraa Marketing | Not started |
| P-07 | Contact email addresses confirmed: sales@, hr@, no-reply@ | Accetraa | Not started |
| P-08 | Domain and DNS access confirmed (for production) | Accetraa | Not started |
| P-09 | AWS account access confirmed (for future deployment) | Accetraa / Tech Lead | Not started |

---

## 3. Development Sprints

### Sprint Overview

| Sprint | Duration | Focus | Deliverable |
|---|---|---|---|
| **Sprint 0** | 3 days | Setup & project skeleton | Runnable dev environment |
| **Sprint 1** | 1 week | Backend: Models, migrations, admin, seed data | Working Django API + admin |
| **Sprint 2** | 1 week | Backend: API endpoints + form validation | All 7 public endpoints complete |
| **Sprint 3** | 1 week | Frontend: Core layout + Home page | Home page renders live data |
| **Sprint 4** | 1 week | Frontend: About + Services pages | 3 pages complete |
| **Sprint 5** | 1 week | Frontend: Portfolio & Products page | 4 pages + portfolio modal |
| **Sprint 6** | 1 week | Frontend: Contact page + all 3 forms | All forms submit to API |
| **Sprint 7** | 1 week | Integration, polish, testing, QA | Phase 1 complete and QA-signed |

**Total: 7.5 weeks** (can compress to 5 weeks with 2 parallel developers on Sprint 3–6)

---

## 4. Task Breakdown by Sprint

---

### Sprint 0 — Setup (3 days)

**Goal:** Both frontend and backend projects run on localhost, connected to MySQL.

| Task ID | Task | Est. |
|---|---|---|
| S0-01 | Create Git repository; define branch strategy (`main`, `develop`, `feature/*`) | 2h |
| S0-02 | Create Django project structure: `backend/` with `accetraa/settings/` (base, dev, prod) | 3h |
| S0-03 | Install and configure backend dependencies: Django, DRF, `djangorestframework-simplejwt`, `django-cors-headers`, `mysqlclient`, `python-decouple` | 2h |
| S0-04 | Configure MySQL database locally; verify Django connects | 2h |
| S0-05 | Run `python manage.py migrate` (Django built-in tables); create superuser | 1h |
| S0-06 | Create React + Vite project: `frontend/` with React Router, Axios, Sass | 2h |
| S0-07 | Scaffold frontend folder structure: `pages/`, `components/`, `services/`, `styles/` | 2h |
| S0-08 | Configure CORS: Django allows `http://localhost:5173` | 1h |
| S0-09 | Verify end-to-end: React calls `GET /api/v1/health/` → Django responds → displayed in browser | 2h |
| S0-10 | Set up `.env` / `.env.example` for both projects | 1h |
| S0-11 | Configure SCSS: create `_variables.scss`, `_mixins.scss`, `_reset.scss`, import in `main.scss` | 2h |

**Sprint 0 Deliverable:** Both servers running; health check endpoint confirmed; SCSS setup complete.

---

### Sprint 1 — Backend: Models & Admin (1 week)

**Goal:** All Django models created, migrated, and working in Django admin with seed data.

| Task ID | Task | Est. |
|---|---|---|
| S1-01 | Create `apps/core/` app; define `TimeStampedModel` abstract base; register app | 2h |
| S1-02 | Create `apps/portfolio/` app; define `Service`, `Product`, `PortfolioCategory`, `PortfolioItem` models | 4h |
| S1-03 | Create `apps/leads/` app; define `ContactRequest`, `ConsultationRequest`, `DemoRequest` models | 3h |
| S1-04 | Run `makemigrations` + `migrate`; verify all tables created in MySQL | 1h |
| S1-05 | Customise Django admin for `Service`: list_display, list_editable (is_active, sort_order), search, prepopulated slug | 2h |
| S1-06 | Customise Django admin for `Product`: same as S1-05 + is_featured | 2h |
| S1-07 | Customise Django admin for `PortfolioItem`: category filter, is_featured, is_active | 2h |
| S1-08 | Customise Django admin for all 3 lead models: readonly submitted fields, status/notes editable, filters | 3h |
| S1-09 | Add CSV export action to all lead admin views | 2h |
| S1-10 | Create seed fixtures for 8 services, 4 portfolio categories, and 6 products | 3h |
| S1-11 | Load fixtures; verify all data appears in Django admin | 1h |
| S1-12 | Add `HealthCheckView` to `apps/core/views.py`; wire to `/api/v1/health/` | 1h |

**Sprint 1 Deliverable:** Django admin at `/admin/` shows all models with correct customisation; seed data visible.

---

### Sprint 2 — Backend: API Endpoints (1 week)

**Goal:** All 7 public API endpoints and 7 admin API endpoints are complete, tested via Postman/curl.

| Task ID | Task | Est. |
|---|---|---|
| S2-01 | Write `ServiceSerializer` (public) and `ServiceAdminSerializer` | 2h |
| S2-02 | Write `ServiceListView` (public GET) and `ServiceAdminViewSet` (CRUD) | 2h |
| S2-03 | Write `ProductSerializer`, `ProductAdminSerializer`; `ProductListView`, `ProductAdminViewSet` | 3h |
| S2-04 | Write `PortfolioCategorySerializer`; `PortfolioCategoryListView`; admin viewset | 2h |
| S2-05 | Write `PortfolioItemSerializer` (nested category); `PortfolioItemListView` with category filter; admin viewset | 3h |
| S2-06 | Write `ContactRequestSerializer` (public write-only) with field validation | 2h |
| S2-07 | Write `ContactCreateView` with throttling; wire to `/api/v1/contact/` | 2h |
| S2-08 | Write `ConsultationRequestSerializer` + `ConsultationCreateView`; wire to API | 2h |
| S2-09 | Write `DemoRequestSerializer` + `DemoRequestCreateView`; wire to API | 2h |
| S2-10 | Write custom throttle classes for all 3 form endpoints (3/hour per IP) | 2h |
| S2-11 | Write admin serializers for all 3 lead types (read + status/notes PATCH) | 3h |
| S2-12 | Write admin viewsets for all 3 lead types; register in URLs | 3h |
| S2-13 | Configure `apps/leads/signals.py`; write `email.py` helper; test email output to console | 3h |
| S2-14 | Configure JWT auth (`djangorestframework-simplejwt`); add token endpoints to URLs | 1h |
| S2-15 | Write `IsStaffUser` permission; apply to all admin viewsets | 1h |
| S2-16 | Configure CORS for production (allowed origins from env var) | 1h |
| S2-17 | Manual API test: all endpoints via Postman/curl — verify responses, status codes, throttling, validation errors | 3h |

**Sprint 2 Deliverable:** All API endpoints respond correctly. Form submissions create DB records. Email output visible in console.

---

### Sprint 3 — Frontend: Layout + Home Page (1 week)

**Goal:** Responsive layout (Header + Footer) complete; Home page renders live data from API.

| Task ID | Task | Est. |
|---|---|---|
| S3-01 | Configure `vite.config.js`: proxy `/api` to `localhost:8000`, SCSS support | 1h |
| S3-02 | Configure `router.jsx`: all 5 routes with lazy loading; `Layout` wrapper with `<Outlet>` | 2h |
| S3-03 | Build `Header` component: logo, desktop nav links, CTA buttons, responsive hamburger menu | 5h |
| S3-04 | Build `Footer` component: nav columns, contact info, social icons | 3h |
| S3-05 | Write `api.js` service module: axios instance + `getServices()`, `getProducts()`, `getPortfolioItems()`, `getCategories()` | 2h |
| S3-06 | Write `useApi` hook: loading, data, error state management | 2h |
| S3-07 | Build `HeroSection`: headline, tagline, two CTA buttons, background image | 3h |
| S3-08 | Build `StatsBar`: company numbers (hardcoded values from constants) | 2h |
| S3-09 | Build `ServicesGrid` + `ServiceCard`: fetches from API; icon + name + short_description | 4h |
| S3-10 | Build `ProductsShowcase` + `ProductCard`: fetches featured products from API | 3h |
| S3-11 | Build `PortfolioHighlights`: fetches featured portfolio items; thumbnail + title + category badge | 3h |
| S3-12 | Build `TestimonialsSection`: static quotes; carousel or static grid | 3h |
| S3-13 | Build `CTABanner` (reusable): "Ready to transform your business?" with buttons | 1h |
| S3-14 | Assemble `HomePage` with all sections | 2h |
| S3-15 | SCSS: brand colours, typography, spacing applied to all components built in this sprint | 3h |
| S3-16 | Responsive testing: mobile (375px), tablet (768px), desktop (1280px) for all Sprint 3 components | 3h |

**Sprint 3 Deliverable:** Home page at `localhost:5173` fully responsive with live API data.

---

### Sprint 4 — Frontend: About + Services Pages (1 week)

| Task ID | Task | Est. |
|---|---|---|
| S4-01 | Build `AboutPage`: `AboutHero` section | 2h |
| S4-02 | `CompanyStory` section: paragraphs + timeline visual (using provided content) | 3h |
| S4-03 | `MissionVision` section: two-column cards | 2h |
| S4-04 | `CoreValues` section: icon grid (6 values with icons) | 2h |
| S4-05 | `TeamSection`: profile cards (photo, name, title, LinkedIn icon) — static content | 3h |
| S4-06 | `PartnersSection`: logo grid — static images | 2h |
| S4-07 | Assemble `AboutPage` with all sections; responsive | 2h |
| S4-08 | `SectionHeader` reusable component (title + subtitle) | 1h |
| S4-09 | Build `ServicesPage`: `ServicesHero` | 1h |
| S4-10 | `ServicesGrid` on Services page: fetches all services from API (reuse or extend S3-09) | 2h |
| S4-11 | `IndustriesServed` section: 6 industry icons with labels (static visual) | 3h |
| S4-12 | CTA section on Services page | 1h |
| S4-13 | Assemble `ServicesPage`; responsive | 2h |
| S4-14 | Careers page (optional — static): `CareersHero`, `WhyJoinUs`, `CurrentOpeningsPlaceholder` | 3h |
| S4-15 | SCSS polish for all Sprint 4 components | 2h |
| S4-16 | Responsive testing: all Sprint 4 pages across breakpoints | 2h |

**Sprint 4 Deliverable:** About and Services pages live with content.

---

### Sprint 5 — Frontend: Portfolio & Products Page (1 week)

| Task ID | Task | Est. |
|---|---|---|
| S5-01 | Build `PortfolioPage` skeleton: hero section | 1h |
| S5-02 | `ProductsSection`: fetch all products; `ProductCard` with thumbnail, name, tagline, short_description, "Request Demo" button | 5h |
| S5-03 | "Request Demo" button: navigate to `/contact` with `?tab=demo` query param to pre-select Demo tab | 2h |
| S5-04 | `PortfolioFilter`: category tabs (All + 4 categories); client-side filter of portfolio items by category | 3h |
| S5-05 | `PortfolioGrid`: responsive grid; fetch all portfolio items; `PortfolioCard` component (thumbnail, title, category badge, technologies) | 4h |
| S5-06 | `PortfolioItemModal`: opens on card click; shows full description, technologies, project URL link; close button; backdrop click to close; keyboard Escape to close | 5h |
| S5-07 | CTA section on portfolio page | 1h |
| S5-08 | Assemble `PortfolioPage` | 2h |
| S5-09 | SCSS: products grid, portfolio grid, filter tabs, modal overlay | 3h |
| S5-10 | Responsive testing: products grid, portfolio filter, modal on mobile | 3h |

**Sprint 5 Deliverable:** Portfolio & Products page with working filter and item modal.

---

### Sprint 6 — Frontend: Contact Page + Forms (1 week)

| Task ID | Task | Est. |
|---|---|---|
| S6-01 | Build `ContactPage` skeleton: hero + contact info panel | 2h |
| S6-02 | Form tabs component: "General Enquiry | Consultation | Demo Request" (URL query param controlled: `?tab=`) | 3h |
| S6-03 | `FormField` component: label + input + error message display | 2h |
| S6-04 | `FormSelect` component: styled dropdown | 1h |
| S6-05 | `FormTextarea` component | 1h |
| S6-06 | Write `useForm` hook: field state, `onChange` handler, validation runner, touched/dirty tracking | 4h |
| S6-07 | Write `validators.js`: `required`, `validEmail`, `minLength`, `maxLength` validators | 2h |
| S6-08 | Build `ContactForm`: all fields, validation, API submit via `leadsAPI.submitContact()` | 4h |
| S6-09 | Build `ConsultationForm`: all fields (service interest dropdown from API or constant list), validation, submit | 4h |
| S6-10 | Build `DemoRequestForm`: all fields (product dropdown from API or constant list), validation, submit | 4h |
| S6-11 | Success state component: replaces form on successful submission | 1h |
| S6-12 | Error state: inline API error messages (rate limit, server error) | 2h |
| S6-13 | `SocialLinks` section on contact page | 1h |
| S6-14 | Read `?tab=` query param on page load; activate correct form tab | 2h |
| S6-15 | SCSS for all form components, tabs, contact page layout | 3h |
| S6-16 | Full form testing: validation errors, successful submission, rate limit error, loading state | 3h |
| S6-17 | `NotFoundPage` (404): styled page with "Go Home" button | 1h |

**Sprint 6 Deliverable:** All 3 forms functional — validate, submit to API, show success/error.

---

### Sprint 7 — Integration, Polish & QA (1 week)

**Goal:** Production-ready Phase 1 website. Every page tested, all edge cases handled.

| Task ID | Task | Est. |
|---|---|---|
| S7-01 | **Full integration test**: load every page, submit every form; verify DB records created, emails sent to console | 4h |
| S7-02 | **Cross-browser test**: Chrome, Firefox, Safari, Edge — all pages and forms | 3h |
| S7-03 | **Mobile responsiveness audit**: all pages on 375px (iPhone), 390px (iPhone Pro), 768px (iPad), 1024px (laptop) | 4h |
| S7-04 | Performance audit: run Lighthouse on all pages; target LCP < 3s; compress images if needed | 3h |
| S7-05 | Image optimisation: compress all static images; convert to WebP where supported | 2h |
| S7-06 | Add `loading="lazy"` to all below-fold images; ensure hero images are eager | 1h |
| S7-07 | Implement scroll-reveal animations (`useScrollAnimation` hook + CSS transitions) | 3h |
| S7-08 | Check all external links open in new tab (`target="_blank" rel="noopener noreferrer"`) | 1h |
| S7-09 | Review all API error states: network failure, 500 error, empty data states | 2h |
| S7-10 | Empty state components: "No portfolio items found" etc. | 1h |
| S7-11 | Page title and meta description set correctly per page (`react-helmet-async` or Vite HTML transform) | 2h |
| S7-12 | `robots.txt` in `public/`: allow all, disallow `/admin/` | 0.5h |
| S7-13 | Environment variable audit: ensure no hardcoded URLs, credentials, or dev-only settings in production build | 1h |
| S7-14 | Django security checklist: `DEBUG=False`, `ALLOWED_HOSTS`, `SECRET_KEY` from env, `SECURE_HSTS_SECONDS` | 2h |
| S7-15 | Accessibility quick audit: keyboard navigation through all forms; visible focus indicators; image alt text | 3h |
| S7-16 | Final stakeholder demo and sign-off | 2h |
| S7-17 | Prepare deployment documentation: `.env` template, migration commands, `npm run build` output location | 2h |

**Sprint 7 Deliverable:** Phase 1 complete, tested, documented, ready for production deployment.

---

## 5. Milestone Summary

| Milestone | Date (approx.) | Criteria |
|---|---|---|
| **M0 — Architecture Approved** | Before Sprint 0 | All 5 docs reviewed and signed off by stakeholders |
| **M1 — Content Ready** | Before Sprint 3 | All copy, images, team bios, product descriptions received from Accetraa |
| **M2 — Backend Complete** | End of Sprint 2 | All API endpoints return correct data; forms create DB records |
| **M3 — Frontend Complete** | End of Sprint 6 | All 5 pages render; all 3 forms submit successfully |
| **M4 — QA Sign-off** | End of Sprint 7 | All cross-browser and responsive tests pass; stakeholder approval |
| **M5 — Production Launch** | Post Sprint 7 | AWS deployment complete; domain live; forms sending real emails |

---

## 6. Definition of Done — Phase 1

Phase 1 is complete when ALL of the following are true:

**Functional:**
- [ ] Home page loads and displays live services, products, and portfolio data from API
- [ ] About page displays company story, team, values, and partners
- [ ] Services page displays all 8 services from API
- [ ] Portfolio page displays all products and portfolio items; category filter works; item modal opens
- [ ] Contact page: all 3 tabs visible; all 3 forms validate correctly and submit to API
- [ ] Form success/error states display correctly
- [ ] Form submissions create database records visible in Django admin
- [ ] Django admin: services, products, portfolio items are fully editable
- [ ] Django admin: leads (contact, consultation, demo) are visible with status management

**Technical:**
- [ ] No hardcoded API URLs — reads from `VITE_API_BASE_URL` environment variable
- [ ] No secrets in source code
- [ ] `npm run build` completes without errors
- [ ] `python manage.py check --deploy` raises no critical issues
- [ ] All Django migrations committed and applied

**Quality:**
- [ ] All pages tested on Chrome, Firefox, Safari, Edge
- [ ] All pages responsive at 375px, 768px, 1024px, 1280px
- [ ] Lighthouse performance score ≥ 70 on mobile (Phase 2 will optimise further)
- [ ] No console errors on any page in production build
- [ ] All images have `alt` text

**Content:**
- [ ] All provided company content is displayed correctly
- [ ] All team member photos, names, and titles are accurate
- [ ] All social media links are correct and open in new tab
- [ ] Contact email addresses and phone numbers are correct

---

## 7. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-01 | Content not delivered by Sprint 3 | High | High | Build with placeholder content (lorem ipsum + placeholder images); replace when real content arrives |
| R-02 | Brand assets (logo, colours) not ready | Medium | High | Use temporary branding; establish brand variables in SCSS so one-time replacement is trivial |
| R-03 | Scope creep ("can we add a blog?") | High | High | Document Phase 2 roadmap; refer all additions to Phase 2; freeze Phase 1 scope at M0 |
| R-04 | Portfolio images not provided | Medium | Medium | Use placeholder cards with project titles only; images optional for Phase 1 |
| R-05 | MySQL local setup issues on developer machine | Low | Medium | Provide Docker Compose alternative: `docker-compose up` for MySQL container |
| R-06 | CORS issues in development | Low | Low | Already addressed in Sprint 0; documented in architecture |
| R-07 | AWS SES email in sandbox mode (requires production access approval) | Medium | Low | Phase 1 development uses console email; SES only needed at production launch |
| R-08 | Designer dependency for UI | Medium | High | Use a clean, professional design system in SCSS; developer can produce a quality MVP without a separate designer |

---

## 8. Phase 2 Roadmap (Preview)

Phase 2 begins after Phase 1 is live and stable. Estimated 8–10 weeks.

| Feature | Notes |
|---|---|
| **Blog / News** | New `apps/blog/` Django app; blog listing + post detail pages; admin CRUD |
| **Individual Service Pages** | Add React route `/services/:slug`; `description` field already in `portfolio_service` table |
| **Individual Product Pages** | Add React route `/products/:slug`; `description` field ready in `portfolio_product` |
| **Portfolio Detail Pages** | Add React route `/portfolio/:slug`; replace modal with full page |
| **Resource Centre** | White papers (gated download), FAQ, Case Studies |
| **Career Portal** | Job listings, application form with resume upload; `apps/careers/` Django app |
| **Newsletter Subscription** | Email capture in footer; `apps/marketing/` Django app; AWS SES bulk send |
| **Custom React Admin Panel** | Replace Django admin with polished React admin (uses JWT API — already built) |
| **SEO Enhancements** | `react-helmet-async` for all pages, Open Graph, structured data (JSON-LD), sitemap.xml |
| **reCAPTCHA v3** | Add to all 3 Phase 1 forms |
| **Site Settings (editable)** | Stats bar numbers, testimonials, homepage content — admin-editable via `apps/company/` |
| **Analytics** | Google Analytics 4 + Google Tag Manager |

---

*Phase 1 Roadmap v1.0 — DRAFT. Awaiting approval before development begins.*

# Software Requirements Specification — Phase 1 MVP
## Accetraa Technologies Corporate Website
**Version:** 2.0 (Phase 1 — MVP)
**Date:** 2026-06-03
**Status:** APPROVED FOR DEVELOPMENT
**Replaces:** SRS v1.0 (full-scope draft)

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Phase 1 Scope Definition](#2-phase-1-scope-definition)
3. [What Is OUT of Phase 1 Scope](#3-what-is-out-of-phase-1-scope)
4. [Stakeholders and User Classes](#4-stakeholders-and-user-classes)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Sitemap](#7-sitemap)
8. [Page Hierarchy](#8-page-hierarchy)
9. [User Flows](#9-user-flows)
10. [Constraints and Assumptions](#10-constraints-and-assumptions)

---

## 1. Introduction

### 1.1 Purpose
This document defines the software requirements for **Phase 1 (MVP)** of the Accetraa Technologies corporate website. It is intentionally scoped to the minimum necessary to launch a professional, credible company web presence quickly.

### 1.2 Business Objective
Launch a fast, modern, mobile-responsive corporate website that:
- Establishes Accetraa's brand presence online
- Showcases services, products, and portfolio work
- Generates leads via Contact, Consultation, and Demo request forms
- Provides a foundation for future feature phases

### 1.3 Phase Philosophy
> **Ship fast. Showcase well. Capture leads.**

Phase 1 is a **marketing website** — not an application platform. Every architectural decision prioritises speed of delivery and quality of presentation over feature breadth.

### 1.4 Tech Stack (Defined)
| Layer | Technology |
|---|---|
| Frontend | React + Vite + SCSS + React Router DOM |
| Backend | Python + Django + Django REST Framework |
| Database | MySQL 8.0 |
| Development | Localhost (Django dev server + Vite dev server) |
| Production (future) | AWS (EC2 / S3 / CloudFront / RDS / SES / SNS) |

### 1.5 Definitions
| Term | Meaning |
|---|---|
| MVP | Minimum Viable Product — Phase 1 |
| Lead | A form submission (contact, consultation, or demo request) |
| Showcase | A display-only section — no purchase or login functionality |
| Admin | Internal Accetraa staff who manage website content |
| DRF | Django REST Framework |

---

## 2. Phase 1 Scope Definition

### 2.1 Pages in Scope (5 + 1 optional)

| # | Page | Route | Priority |
|---|---|---|---|
| 1 | Home | `/` | Required |
| 2 | About Us | `/about` | Required |
| 3 | Services | `/services` | Required |
| 4 | Portfolio & Products | `/portfolio` | Required |
| 5 | Contact Us | `/contact` | Required |
| 6 | Careers | `/careers` | Optional (low effort — static content) |

### 2.2 Forms in Scope (3 only)

| # | Form | Purpose |
|---|---|---|
| 1 | Contact Form | General enquiries |
| 2 | Consultation Request Form | Prospects requesting a consultation |
| 3 | Demo Request Form | Prospects requesting a product demo |

### 2.3 Admin Panel in Scope
The Django admin panel (built-in, customised) manages:
- Services
- Products
- Portfolio Items
- Contact Requests (view + status update)
- Consultation Requests (view + status update)
- Demo Requests (view + status update)

---

## 3. What Is OUT of Phase 1 Scope

The following are explicitly **excluded** from Phase 1. They are designed for in the architecture to ensure Phase 2+ can add them without rework.

| Excluded Feature | Planned Phase |
|---|---|
| Individual service detail pages | Phase 2 |
| Individual product detail pages | Phase 2 |
| Industry landing pages | Phase 2 |
| Blog / News | Phase 2 |
| Resource Centre (White Papers, Case Studies, FAQ) | Phase 2 |
| Career portal (job listings, application forms) | Phase 2 or 3 |
| Client portal / login | Phase 3 |
| HRMS application | Phase 3 |
| ERP application | Phase 3 |
| AI Chatbot application | Phase 3 |
| Recruitment Platform | Phase 3 |
| BPO Platform | Phase 3 |
| Newsletter subscription | Phase 2 |
| SEO landing pages | Phase 2 |
| Case study detail pages | Phase 2 |
| Multi-language / i18n | Future |
| Payment / e-commerce | Future |

---

## 4. Stakeholders and User Classes

### 4.1 Stakeholders
| Stakeholder | Interest |
|---|---|
| Accetraa Leadership | Brand presence, lead capture |
| Sales Team | Quality of consultation/demo request data |
| Website Visitors / Prospects | Fast, credible company information |
| Internal Admin Staff | Easy content updates via admin panel |

### 4.2 User Classes — Phase 1 Only
| User | Description | Access |
|---|---|---|
| Anonymous Visitor | Any person browsing the public website | All 5 pages |
| Lead / Prospect | Visitor who submits a form | Form submission only |
| Admin User | Internal staff managing content | Django admin panel |

---

## 5. Functional Requirements

### 5.1 Home Page (HP)

| ID | Requirement |
|---|---|
| HP-01 | Hero section: company name, tagline, two CTA buttons — "Request Consultation" and "Book a Demo" |
| HP-02 | Services overview: card grid displaying service names and short descriptions (data from CMS) |
| HP-03 | Products showcase: card grid of featured products with name and tagline (data from CMS) |
| HP-04 | Portfolio highlights: display 3–4 featured portfolio items with thumbnail, title, and category |
| HP-05 | Company stats bar: configurable numbers (e.g., years in business, clients, projects, team size) — hardcoded values for Phase 1 |
| HP-06 | Testimonials section: 2–3 static client quotes (hardcoded for Phase 1) |
| HP-07 | "About Us" summary: 2–3 sentence company introduction with link to About page |
| HP-08 | CTA section: "Ready to get started?" with buttons linking to Contact and Consultation forms |
| HP-09 | Sticky navigation header: logo + nav links for all 5 pages |
| HP-10 | Footer: company name, tagline, nav links, contact email, phone, address, social media links |

### 5.2 About Us Page (AU)

| ID | Requirement |
|---|---|
| AU-01 | Company story: paragraphs covering founding, mission, vision — static content |
| AU-02 | Mission & Vision statements: distinct visual sections |
| AU-03 | Core values: icon + label grid (e.g., Innovation, Integrity, Excellence) |
| AU-04 | Team section: leadership profile cards — photo, name, title, LinkedIn link — static/hardcoded for Phase 1 |
| AU-05 | Company stats: same stats bar as homepage |
| AU-06 | Partners section: partner logo grid — static for Phase 1 |
| AU-07 | CTA: "Work with us" button linking to Contact page |

### 5.3 Services Page (SV)

| ID | Requirement |
|---|---|
| SV-01 | Page hero: title "What We Do" with subtitle |
| SV-02 | Services grid: cards fetched from API — each card shows icon, name, short description |
| SV-03 | All 8 services displayed: AI & Data Solutions, Software Development, Mobile App Development, Cloud Services, Cybersecurity, Digital Transformation, HR & Recruitment Services, Startup Consulting |
| SV-04 | Each service card has a "Learn More" placeholder — links to Contact page with pre-filled subject for Phase 1 (no individual service pages yet) |
| SV-05 | Industries served: icon grid showing 6 industries — static visual section |
| SV-06 | CTA section: "Interested in our services? Request a Consultation" button |

### 5.4 Portfolio & Products Page (PP)

| ID | Requirement |
|---|---|
| PP-01 | Page hero: title "Our Work & Products" |
| PP-02 | **Products showcase section** — card grid of all 6 products (data from API): UrSaloon, BPO, HRMS, ERP, AI Chatbot, Recruitment Management System. Each card: thumbnail, name, tagline, short description, "Request Demo" CTA button |
| PP-03 | "Request Demo" button opens the Demo Request form (modal or navigates to `/contact#demo`) |
| PP-04 | **Portfolio section** — filterable grid of portfolio items (data from API) |
| PP-05 | Portfolio filter: tabs/buttons for All, Web Projects, Mobile Applications, AI Projects, Enterprise Solutions |
| PP-06 | Portfolio item card: thumbnail, title, category badge, technologies used list |
| PP-07 | Clicking a portfolio item opens a **modal/lightbox** with full description, additional images, and technologies — no separate detail page in Phase 1 |
| PP-08 | CTA section: "Have a project in mind? Let's talk." with Contact link |

### 5.5 Contact Us Page (CT)

| ID | Requirement |
|---|---|
| CT-01 | Page displays three contact options as tabs or sections: General Enquiry, Consultation Request, Demo Request |
| CT-02 | **General Contact Form** fields: Full Name (required), Email (required), Subject (optional), Message (required) |
| CT-03 | **Consultation Request Form** fields: Full Name (required), Company Name (required), Email (required), Phone (required), Service of Interest (dropdown — 8 services + "General"), Message (optional) |
| CT-04 | **Demo Request Form** fields: Full Name (required), Company Name (required), Email (required), Phone (required), Product of Interest (dropdown — 6 products), Preferred Date (optional), Message (optional) |
| CT-05 | All forms: client-side validation with inline error messages |
| CT-06 | All forms: POST to Django REST API endpoint |
| CT-07 | On successful submission: display confirmation message inline; do not reload page |
| CT-08 | On API error: display user-friendly error message |
| CT-09 | Contact info display: email address, phone number, office address, business hours |
| CT-10 | Social media links: LinkedIn, Twitter/X, Instagram, Facebook |
| CT-11 | Each form subject to rate limiting (server-side: max 3 submissions per IP per hour) |
| CT-12 | Form data stored in database; admin notified via email (AWS SES in production, console in dev) |

### 5.6 Careers Page (optional, static — CA)

| ID | Requirement |
|---|---|
| CA-01 | Static page: company culture section — text + image |
| CA-02 | "Why Join Us" section: 4–6 benefit icons with labels |
| CA-03 | "Current Openings" placeholder: static text "We are growing! Send your CV to careers@accetraa.com" |
| CA-04 | CTA: Email link to careers@accetraa.com |
| CA-05 | Note: No job listing system, no application form in Phase 1 |

### 5.7 Admin Panel (AD)

| ID | Requirement |
|---|---|
| AD-01 | Django's built-in admin panel (customised) at `/admin/` |
| AD-02 | Admin login with username + password |
| AD-03 | Manage Services: create, edit, delete, reorder, enable/disable |
| AD-04 | Manage Products: create, edit, delete, reorder, enable/disable, mark as featured |
| AD-05 | Manage Portfolio Items: create, edit, delete, reorder, set category |
| AD-06 | Manage Portfolio Categories: create, edit, delete |
| AD-07 | View Contact Requests: list view, detail view, mark as read/resolved |
| AD-08 | View Consultation Requests: list view, detail view, update status |
| AD-09 | View Demo Requests: list view, detail view, update status |
| AD-10 | All lead tables: searchable by name/email, filterable by status and date |

---

## 6. Non-Functional Requirements

### 6.1 Performance
| ID | Requirement |
|---|---|
| PERF-01 | Page load time under 3 seconds on a standard 4G connection |
| PERF-02 | Images compressed and served in WebP where supported |
| PERF-03 | Lazy loading for below-fold images |
| PERF-04 | JavaScript bundle split by route (React Router lazy loading) |

### 6.2 Responsive Design
| ID | Requirement |
|---|---|
| RESP-01 | Fully responsive across mobile (320px), tablet (768px), and desktop (1280px+) |
| RESP-02 | Mobile-first SCSS breakpoint strategy |
| RESP-03 | Touch-friendly tap targets (min 44×44px) |
| RESP-04 | Navigation collapses to hamburger menu on mobile |

### 6.3 Security
| ID | Requirement |
|---|---|
| SEC-01 | HTTPS enforced in production |
| SEC-02 | CSRF protection on all Django API endpoints (DRF handles via JWT or session) |
| SEC-03 | All form inputs validated server-side (Django serializer validation) |
| SEC-04 | SQL injection prevention via Django ORM (parameterized queries) |
| SEC-05 | Rate limiting on all form submission endpoints |
| SEC-06 | Django admin accessible only over HTTPS in production; IP whitelist recommended |
| SEC-07 | Secrets (DB password, email credentials) in environment variables only |
| SEC-08 | CORS: only the frontend domain allowed to call the API |

### 6.4 Browser Compatibility
| ID | Requirement |
|---|---|
| COMP-01 | Chrome 90+, Firefox 90+, Safari 14+, Edge 90+ |
| COMP-02 | No Internet Explorer support required |

### 6.5 Maintainability
| ID | Requirement |
|---|---|
| MNT-01 | Admin can update services, products, and portfolio items without developer involvement |
| MNT-02 | Codebase follows defined structure (see ARCHITECTURE.md) |
| MNT-03 | Environment-based configuration (dev vs. production) |

### 6.6 Scalability (Phase 2 Readiness)
| ID | Requirement |
|---|---|
| SCA-01 | Django apps structured so new apps (blog, resources, careers) can be added without modifying existing apps |
| SCA-02 | React routing structured so new pages can be added by adding a route and a page component |
| SCA-03 | API versioned at `/api/v1/` so future versions can be introduced without breaking existing frontend |
| SCA-04 | Database schema uses nullable fields and loose coupling so future tables can extend without migrations on existing tables |

---

## 7. Sitemap

```
Phase 1 — Public Website
├── /                          Home
├── /about                     About Us
├── /services                  Services
├── /portfolio                 Portfolio & Products
├── /contact                   Contact Us
└── /careers                   Careers (optional)

Admin (Django built-in)
└── /admin/                    Django Admin Panel
    ├── /admin/portfolio/service/
    ├── /admin/portfolio/product/
    ├── /admin/portfolio/portfolioitem/
    ├── /admin/portfolio/portfoliocategory/
    ├── /admin/leads/contactrequest/
    ├── /admin/leads/consultationrequest/
    └── /admin/leads/demorequest/

Phase 2 (future — routes reserved, NOT built)
├── /services/:slug            Individual service pages
├── /portfolio/:slug           Portfolio item detail pages
├── /products/:slug            Product detail pages
├── /resources/blog            Blog
├── /resources/faq             FAQ
├── /resources/white-papers    White Papers
├── /careers/openings          Job listings
└── /industries/:slug          Industry pages
```

---

## 8. Page Hierarchy

```
LEVEL 0 — ROOT
└── / (Home)

LEVEL 1 — PRIMARY NAVIGATION PAGES
├── /about          About Us
├── /services       Services
├── /portfolio      Portfolio & Products
├── /contact        Contact Us
└── /careers        Careers (optional)

UTILITY — ADMIN (Not public navigation)
└── /admin/         Django Admin Panel

RESERVED (Phase 2+, not built in Phase 1)
├── /services/:slug
├── /portfolio/:slug
├── /products/:slug
├── /blog
├── /resources/*
└── /careers/openings
```

**Phase 1 has a flat hierarchy — all pages are one level deep from root. No nested public pages.**

---

## 9. User Flows

### 9.1 Primary Flow — Prospect Submits Consultation Request
```
Visitor lands on Home (/)
       │
       ▼
Reads hero section → clicks "Request Consultation" CTA
       │
       ▼
Navigates to /contact (Consultation tab active)
       │
       ▼
Fills Consultation Form:
  Name → Company → Email → Phone → Service Interest → Message
       │
       ▼
Clicks "Submit Request"
       │
       ├─[Validation fails]──► Inline field errors displayed
       │                        User corrects → re-submits
       ▼
POST /api/v1/consultation/
       │
       ├─[Rate limit hit]───► "Too many requests. Please try later."
       ├─[Server error]─────► "Something went wrong. Please email us."
       │
       ▼
Lead stored in DB (status = new)
       │
       ├─[Async] Email notification → sales team
       ├─[Async] Acknowledgement email → prospect
       │
       ▼
Success message displayed:
"Thank you! We'll be in touch within 1 business day."
```

### 9.2 Flow — Prospect Requests a Product Demo
```
Visitor lands on /portfolio
       │
       ▼
Browses Products showcase section
       │
       ▼
Clicks "Request Demo" on a product card
       │
       ▼
Demo Request form appears (modal or scrolls to form with product pre-selected)
       │
       ▼
Fills form → submits
       │
       ▼
POST /api/v1/demo-request/
       │
       ▼
Stored in DB → email notifications → success message
```

### 9.3 Flow — Visitor Browses Portfolio
```
Visitor lands on /portfolio
       │
       ▼
Views all portfolio items (default: All category)
       │
       ▼
Clicks category filter: "Mobile Applications"
       │
       ▼
Grid filters to show only Mobile Applications items (client-side filter)
       │
       ▼
Clicks a portfolio item card
       │
       ▼
Modal opens: title, full description, technologies, additional images
       │
       ▼
Visitor closes modal → continues browsing
```

### 9.4 Flow — Admin Manages a Service
```
Admin navigates to /admin/
       │
       ▼
Logs in (username + password)
       │
       ▼
Django Admin dashboard
       │
       ▼
Clicks "Services" under Portfolio section
       │
       ▼
Sees list of all services
       │
       ▼
Clicks "Add Service" or selects existing to edit
       │
       ▼
Fills form: Name, Slug, Short Description, Full Description,
            Icon (upload or CSS class name), Sort Order, Is Active
       │
       ▼
Saves → changes immediately reflected on /services page
        (API returns updated data on next frontend fetch)
```

### 9.5 Flow — Admin Views a New Lead
```
Admin logs into /admin/
       │
       ▼
Dashboard shows recent leads (customised via Django admin)
       │
       ▼
Clicks "Consultation Requests"
       │
       ▼
List view: Name | Company | Email | Service | Status | Date
       │
       ├─ Filter by: Status (new/contacted/qualified/closed)
       ├─ Search by: name or email
       │
       ▼
Clicks a request → Detail view with all submitted fields
       │
       ▼
Admin changes Status to "Contacted" → saves
```

---

## 10. Constraints and Assumptions

### 10.1 Constraints
1. **5 pages only** — scope is fixed for Phase 1; no scope creep
2. **No CMS** — content is managed through Django admin only; no separate CMS
3. **No individual detail pages** — services, products, and portfolio items are showcase cards only
4. **No blog or resources** — Phase 2
5. **No user authentication** on public website — public pages are fully open
6. **Email in development** — console backend (Django); AWS SES in production
7. **Images** — locally stored `media/` folder in development; AWS S3 in production
8. **Localhost first** — no cloud deployment in Phase 1 development

### 10.2 Assumptions
1. All Phase 1 content (company text, team photos, service descriptions, portfolio images) provided by Accetraa before frontend development begins
2. The Careers page is optional static content — if content is not provided, it can be omitted from Phase 1
3. Portfolio item modal is sufficient; no individual portfolio detail page required for Phase 1
4. Django's built-in admin is acceptable for Phase 1 admin needs — a custom React admin is Phase 2+
5. Social media links (LinkedIn, etc.) will be provided by Accetraa team
6. The "stats bar" numbers (years, clients, projects) are hardcoded for Phase 1; editable via admin in Phase 2
7. reCAPTCHA integration is Phase 2; rate limiting is the Phase 1 spam protection

---

*Phase 1 SRS v2.0 — DRAFT. Awaiting approval before development begins.*

# API Specification — Phase 1 MVP
## Accetraa Technologies Corporate Website
**Version:** 2.0 (Phase 1)
**Date:** 2026-06-03
**Status:** APPROVED FOR DEVELOPMENT
**Framework:** Django REST Framework (DRF)
**Base URL (development):** `http://localhost:8000/api/v1`
**Base URL (production):** `https://api.accetraa.com/api/v1` *(or same domain with path prefix)*

---

## Table of Contents

1. [API Design Conventions](#1-api-design-conventions)
2. [Authentication](#2-authentication)
3. [Public Endpoints — Content](#3-public-endpoints--content)
4. [Public Endpoints — Forms](#4-public-endpoints--forms)
5. [Admin Endpoints — Authentication](#5-admin-endpoints--authentication)
6. [Admin Endpoints — Content Management](#6-admin-endpoints--content-management)
7. [Admin Endpoints — Lead Management](#7-admin-endpoints--lead-management)
8. [Error Reference](#8-error-reference)
9. [Rate Limiting](#9-rate-limiting)
10. [CORS Policy](#10-cors-policy)
11. [Phase 2 Reserved Endpoints](#11-phase-2-reserved-endpoints)

---

## 1. API Design Conventions

### URL Structure
```
/api/v1/{resource}/            → List + Create (GET, POST)
/api/v1/{resource}/{id}/       → Retrieve, Update, Delete (GET, PUT, PATCH, DELETE)
/api/v1/admin/{resource}/      → Admin-only endpoints (require JWT)
```

### HTTP Methods
| Method | Usage |
|---|---|
| `GET` | Retrieve data. No side effects. Safe to cache. |
| `POST` | Create a resource or submit a form |
| `PATCH` | Partial update (admin only) |
| `DELETE` | Delete (admin only — soft delete via `is_active=False` for content) |

### Response Envelope
**Success (list):**
```json
{
  "count": 8,
  "results": [ ... ]
}
```
DRF's default pagination envelope. Phase 1 public endpoints do not paginate (all items returned); admin list endpoints paginate at 20 per page.

**Success (single item):**
```json
{ "id": 1, "name": "...", ... }
```

**Error:**
```json
{
  "detail": "Human-readable error message."
}
```
or for validation errors:
```json
{
  "field_name": ["Error description."],
  "another_field": ["Another error."]
}
```

### Versioning
All endpoints prefixed `/api/v1/`. Future breaking changes use `/api/v2/` — the v1 prefix ensures Phase 2 can introduce new serializer shapes without breaking the Phase 1 frontend.

### Content Type
All requests and responses use `Content-Type: application/json` unless noted.

---

## 2. Authentication

### Public Endpoints
No authentication required. All public `GET` endpoints are open.

### Admin Endpoints
Use **JWT (JSON Web Token)** via the `djangorestframework-simplejwt` package.

**Token header format:**
```
Authorization: Bearer <access_token>
```

**Token lifetimes:**
- Access token: 60 minutes
- Refresh token: 7 days

**Note:** Django's session-based admin (`/admin/`) uses cookie auth — separate from the JWT API auth. Both co-exist.

---

## 3. Public Endpoints — Content

These endpoints power the frontend pages. All return only active/published items.

---

### 3.1 Services

#### `GET /api/v1/services/`
Returns all active services in display order.

**No query parameters required.**

**Response: 200 OK**
```json
[
  {
    "id": 1,
    "name": "AI & Data Solutions",
    "slug": "ai-data-solutions",
    "short_description": "Build intelligent systems with machine learning and data engineering.",
    "icon": "icon-ai.svg",
    "sort_order": 1
  },
  {
    "id": 2,
    "name": "Software Development",
    "slug": "software-development",
    "short_description": "Custom web and enterprise software built for scale.",
    "icon": "icon-code.svg",
    "sort_order": 2
  }
]
```

**Django view:** `ServiceListView` — `ListAPIView`
**Queryset filter:** `is_active=True`, ordered by `sort_order`
**Authentication:** None

---

### 3.2 Products

#### `GET /api/v1/products/`
Returns all active products.

**Query params:**
- `?featured=true` — returns only products where `is_featured=True` (used by homepage)

**Response: 200 OK**
```json
[
  {
    "id": 1,
    "name": "UrSaloon",
    "slug": "ursaloon",
    "tagline": "Complete salon management platform.",
    "short_description": "Appointments, billing, staff management, and customer loyalty in one app.",
    "thumbnail": "http://localhost:8000/media/products/ursaloon.jpg",
    "is_featured": true,
    "sort_order": 1
  }
]
```

**Django view:** `ProductListView` — `ListAPIView`
**Queryset filter:** `is_active=True`, ordered by `sort_order`

---

### 3.3 Portfolio Categories

#### `GET /api/v1/portfolio/categories/`
Returns all portfolio categories.

**Response: 200 OK**
```json
[
  { "id": 1, "name": "Web Projects", "slug": "web-projects", "sort_order": 1 },
  { "id": 2, "name": "Mobile Applications", "slug": "mobile-applications", "sort_order": 2 },
  { "id": 3, "name": "AI Projects", "slug": "ai-projects", "sort_order": 3 },
  { "id": 4, "name": "Enterprise Solutions", "slug": "enterprise-solutions", "sort_order": 4 }
]
```

---

### 3.4 Portfolio Items

#### `GET /api/v1/portfolio/`
Returns all active portfolio items.

**Query params:**
- `?category=web-projects` — filter by category slug
- `?featured=true` — returns only featured items (homepage use)

**Response: 200 OK**
```json
[
  {
    "id": 1,
    "title": "E-Commerce Platform Rebuild",
    "slug": "ecommerce-platform-rebuild",
    "short_description": "Migrated a legacy PHP store to a modern React + Django stack.",
    "description": "Full description shown in modal...",
    "client_name": null,
    "thumbnail": "http://localhost:8000/media/portfolio/ecommerce.jpg",
    "technologies": "React, Django, MySQL, AWS",
    "project_url": null,
    "is_featured": true,
    "category": {
      "id": 1,
      "name": "Web Projects",
      "slug": "web-projects"
    }
  }
]
```

**Django view:** `PortfolioItemListView` — `ListAPIView`
**Queryset filter:** `is_active=True`; optionally filter by `category__slug`

---

## 4. Public Endpoints — Forms

All form endpoints:
1. Validate payload via DRF serializer (400 on failure)
2. Apply IP-based rate limiting (429 on excess)
3. Save to database
4. Trigger async email notification (Django signals or Celery in Phase 2)
5. Return 201 with success message

---

### 4.1 Submit Contact Form

#### `POST /api/v1/contact/`

**Request Body:**
```json
{
  "full_name": "Ravi Kumar",
  "email": "ravi@example.com",
  "subject": "General Inquiry",
  "message": "Hello, I'd like to learn more about your services."
}
```

**Validation rules:**
| Field | Required | Rules |
|---|---|---|
| `full_name` | Yes | max_length=150 |
| `email` | Yes | valid email format |
| `subject` | No | max_length=255 |
| `message` | Yes | min_length=10, max_length=5000 |

**Response: 201 Created**
```json
{
  "message": "Thank you for reaching out! We'll get back to you within 2 business days."
}
```

**Response: 400 Bad Request**
```json
{
  "email": ["Enter a valid email address."],
  "message": ["This field is required."]
}
```

**Response: 429 Too Many Requests**
```json
{
  "detail": "Request was throttled. Expected available in 3600 seconds."
}
```

---

### 4.2 Submit Consultation Request

#### `POST /api/v1/consultation/`

**Request Body:**
```json
{
  "full_name": "Priya Sharma",
  "company_name": "TechCorp Pvt Ltd",
  "email": "priya@techcorp.com",
  "phone": "+91 98765 43210",
  "service_interest": "AI & Data Solutions",
  "message": "We need an ML model for demand forecasting."
}
```

**Validation rules:**
| Field | Required | Rules |
|---|---|---|
| `full_name` | Yes | max_length=150 |
| `company_name` | Yes | max_length=150 |
| `email` | Yes | valid email format |
| `phone` | Yes | max_length=30 |
| `service_interest` | Yes | max_length=150 |
| `message` | No | max_length=3000 |

**Response: 201 Created**
```json
{
  "message": "Thank you! Our team will contact you within 1 business day to schedule your consultation."
}
```

**Side effects:**
- Row created in `leads_consultationrequest` with `status='new'`
- Email sent to `sales@accetraa.com` (in production via AWS SES; in development via Django console email backend)
- Acknowledgement email sent to submitter's email address

---

### 4.3 Submit Demo Request

#### `POST /api/v1/demo-request/`

**Request Body:**
```json
{
  "full_name": "Arjun Mehta",
  "company_name": "Salon Group Ltd",
  "email": "arjun@salongroup.com",
  "phone": "+91 90000 12345",
  "product_interest": "UrSaloon",
  "preferred_date": "2026-06-20",
  "message": "We have 5 salons and want to see the multi-branch management features."
}
```

**Validation rules:**
| Field | Required | Rules |
|---|---|---|
| `full_name` | Yes | max_length=150 |
| `company_name` | Yes | max_length=150 |
| `email` | Yes | valid email |
| `phone` | Yes | max_length=30 |
| `product_interest` | Yes | max_length=150 |
| `preferred_date` | No | ISO 8601 date; must not be in the past |
| `message` | No | max_length=3000 |

**Response: 201 Created**
```json
{
  "message": "Demo request received! We'll confirm your session date within 1 business day."
}
```

---

## 5. Admin Endpoints — Authentication

These endpoints are used if a custom React admin panel is built in Phase 2. In Phase 1, the Django built-in admin at `/admin/` handles all admin needs via session auth — the JWT endpoints below are defined for future use and can be optionally activated.

### 5.1 Obtain JWT Token

#### `POST /api/v1/admin/auth/token/`
**Package:** `djangorestframework-simplejwt`

**Request Body:**
```json
{
  "username": "admin",
  "password": "securepassword"
}
```

**Response: 200 OK**
```json
{
  "access": "eyJ...",
  "refresh": "eyJ..."
}
```

---

### 5.2 Refresh JWT Token

#### `POST /api/v1/admin/auth/token/refresh/`

**Request Body:**
```json
{ "refresh": "eyJ..." }
```

**Response: 200 OK**
```json
{ "access": "eyJ..." }
```

---

### 5.3 Verify JWT Token

#### `POST /api/v1/admin/auth/token/verify/`

**Request Body:**
```json
{ "token": "eyJ..." }
```

**Response: 200 OK** (token valid) or **401** (invalid/expired)

---

## 6. Admin Endpoints — Content Management

All endpoints in this section require:
- `Authorization: Bearer <access_token>` header
- User must be `is_staff=True`

These endpoints expose full CRUD via DRF `ModelViewSet`.

### 6.1 Services CRUD

| Method | Endpoint | Action |
|---|---|---|
| `GET` | `/api/v1/admin/services/` | List all services (including inactive) |
| `POST` | `/api/v1/admin/services/` | Create new service |
| `GET` | `/api/v1/admin/services/{id}/` | Retrieve single service |
| `PUT` | `/api/v1/admin/services/{id}/` | Full update |
| `PATCH` | `/api/v1/admin/services/{id}/` | Partial update (e.g., toggle `is_active`) |
| `DELETE` | `/api/v1/admin/services/{id}/` | Delete (hard delete for content items) |

**Request body for POST/PUT:**
```json
{
  "name": "AI & Data Solutions",
  "slug": "ai-data-solutions",
  "short_description": "Build intelligent systems with ML.",
  "description": "Full long-form description here...",
  "icon": "icon-ai.svg",
  "sort_order": 1,
  "is_active": true
}
```

---

### 6.2 Products CRUD

| Method | Endpoint | Action |
|---|---|---|
| `GET` | `/api/v1/admin/products/` | List all products |
| `POST` | `/api/v1/admin/products/` | Create product |
| `GET` | `/api/v1/admin/products/{id}/` | Retrieve |
| `PUT` | `/api/v1/admin/products/{id}/` | Full update |
| `PATCH` | `/api/v1/admin/products/{id}/` | Partial update |
| `DELETE` | `/api/v1/admin/products/{id}/` | Delete |

**Note on thumbnail upload:** Use `multipart/form-data` when including a file upload. All other requests use `application/json`.

**Request body (JSON fields only):**
```json
{
  "name": "UrSaloon",
  "slug": "ursaloon",
  "tagline": "Complete salon management platform.",
  "short_description": "Appointments, billing, staff, loyalty.",
  "description": "Full product description...",
  "is_featured": true,
  "sort_order": 1,
  "is_active": true
}
```

---

### 6.3 Portfolio Categories CRUD

| Method | Endpoint | Action |
|---|---|---|
| `GET` | `/api/v1/admin/portfolio/categories/` | List categories |
| `POST` | `/api/v1/admin/portfolio/categories/` | Create category |
| `PUT` | `/api/v1/admin/portfolio/categories/{id}/` | Update |
| `DELETE` | `/api/v1/admin/portfolio/categories/{id}/` | Delete |

---

### 6.4 Portfolio Items CRUD

| Method | Endpoint | Action |
|---|---|---|
| `GET` | `/api/v1/admin/portfolio/` | List all items (all statuses) |
| `POST` | `/api/v1/admin/portfolio/` | Create item |
| `GET` | `/api/v1/admin/portfolio/{id}/` | Retrieve |
| `PUT` | `/api/v1/admin/portfolio/{id}/` | Full update |
| `PATCH` | `/api/v1/admin/portfolio/{id}/` | Partial update |
| `DELETE` | `/api/v1/admin/portfolio/{id}/` | Delete |

**Request body (JSON fields):**
```json
{
  "category": 1,
  "title": "E-Commerce Platform Rebuild",
  "slug": "ecommerce-platform-rebuild",
  "short_description": "Migrated legacy PHP to React + Django.",
  "description": "Full project description...",
  "client_name": null,
  "technologies": "React, Django, MySQL, AWS",
  "project_url": "https://example.com",
  "is_featured": true,
  "sort_order": 1,
  "is_active": true
}
```

---

## 7. Admin Endpoints — Lead Management

All require staff JWT token. These endpoints are read + status-update only. Leads cannot be created via API; only via public form endpoints.

### 7.1 Contact Requests

#### `GET /api/v1/admin/leads/contact/`
List all contact requests.

**Query params:**
- `?status=new` — filter by status
- `?search=email_or_name` — search
- `?ordering=-created_at` — sort (default: newest first)

**Response: 200 OK**
```json
{
  "count": 14,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "full_name": "Ravi Kumar",
      "email": "ravi@example.com",
      "subject": "General Inquiry",
      "message": "Hello, I'd like to learn...",
      "status": "new",
      "created_at": "2026-06-03T10:30:00Z"
    }
  ]
}
```

#### `GET /api/v1/admin/leads/contact/{id}/`
Retrieve a single contact request (full detail).

#### `PATCH /api/v1/admin/leads/contact/{id}/`
Update status only.

**Request Body:**
```json
{ "status": "resolved" }
```

---

### 7.2 Consultation Requests

#### `GET /api/v1/admin/leads/consultation/`
List all consultation requests.

**Query params:** `?status=`, `?search=`, `?ordering=`

#### `GET /api/v1/admin/leads/consultation/{id}/`
Full detail including `admin_notes`.

#### `PATCH /api/v1/admin/leads/consultation/{id}/`
```json
{
  "status": "contacted",
  "admin_notes": "Called on 2026-06-04. Interested in ML pipeline."
}
```

---

### 7.3 Demo Requests

#### `GET /api/v1/admin/leads/demo/`
List all demo requests.

#### `GET /api/v1/admin/leads/demo/{id}/`
Full detail.

#### `PATCH /api/v1/admin/leads/demo/{id}/`
```json
{
  "status": "scheduled",
  "admin_notes": "Demo scheduled for 2026-06-20 at 2 PM via Google Meet."
}
```

---

## 8. Error Reference

### HTTP Status Codes Used

| Code | Meaning | When |
|---|---|---|
| `200 OK` | Success | GET, PATCH success |
| `201 Created` | Resource created | POST form submissions, admin create |
| `400 Bad Request` | Validation failed | Form field errors, invalid data |
| `401 Unauthorized` | No valid auth token | Admin endpoints without token |
| `403 Forbidden` | Token valid but not staff | Non-staff user accessing admin endpoints |
| `404 Not Found` | Resource does not exist | GET/PATCH on non-existent ID |
| `405 Method Not Allowed` | Wrong HTTP method | e.g., DELETE on a read-only endpoint |
| `429 Too Many Requests` | Rate limit exceeded | Form endpoints |
| `500 Internal Server Error` | Unhandled exception | Server-side bugs |

### Validation Error Format (DRF standard)
```json
{
  "full_name": ["This field is required."],
  "email": ["Enter a valid email address."]
}
```

### Generic Error Format
```json
{
  "detail": "Authentication credentials were not provided."
}
```

---

## 9. Rate Limiting

Implemented via DRF throttling classes (`AnonRateThrottle` + custom scope throttles).

**Configuration in `settings.py`:**
```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'contact_form': '3/hour',
        'consultation_form': '3/hour',
        'demo_form': '3/hour',
    }
}
```

| Endpoint | Limit | Window | Scope |
|---|---|---|---|
| `POST /api/v1/contact/` | 3 requests | Per hour | Per IP |
| `POST /api/v1/consultation/` | 3 requests | Per hour | Per IP |
| `POST /api/v1/demo-request/` | 3 requests | Per hour | Per IP |
| `GET /api/v1/*` (public content) | 100 requests | Per hour | Per IP |
| Admin endpoints | 200 requests | Per hour | Per user |

**Rate limit exceeded response:**
```json
{
  "detail": "Request was throttled. Expected available in 3420 seconds."
}
```

---

## 10. CORS Policy

**Package:** `django-cors-headers`

**Development settings:**
```python
CORS_ALLOW_ALL_ORIGINS = True  # Development only
```

**Production settings:**
```python
CORS_ALLOWED_ORIGINS = [
    "https://accetraa.com",
    "https://www.accetraa.com",
]
CORS_ALLOW_CREDENTIALS = False
```

Allowed HTTP methods: `GET, POST, PATCH, OPTIONS`
Allowed headers: `Content-Type, Authorization`

---

## 11. Phase 2 Reserved Endpoints

These URL patterns are **reserved** in the URL configuration for Phase 2. The routes exist in `urls.py` but return `501 Not Implemented` until developed.

| Reserved Endpoint | Phase 2 Feature |
|---|---|
| `GET /api/v1/blog/` | Blog listing |
| `GET /api/v1/blog/{slug}/` | Blog post detail |
| `GET /api/v1/industries/` | Industries listing |
| `GET /api/v1/services/{slug}/` | Individual service detail |
| `GET /api/v1/products/{slug}/` | Individual product detail |
| `GET /api/v1/portfolio/{slug}/` | Portfolio item detail page |
| `POST /api/v1/newsletter/subscribe/` | Newsletter subscription |
| `GET /api/v1/careers/openings/` | Job listings |
| `POST /api/v1/careers/apply/` | Job application |
| `GET /api/v1/resources/` | Resources (white papers, FAQ) |

**Rationale:** Reserving these routes ensures the frontend can add links to them in Phase 2 without URL conflicts, and API consumers (future mobile apps) can document them as "coming soon."

---

### Django URL Router Configuration (summary)

```python
# accetraa/urls.py

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),

    # API v1 — Public
    path('api/v1/services/', ServiceListView.as_view()),
    path('api/v1/products/', ProductListView.as_view()),
    path('api/v1/portfolio/', PortfolioItemListView.as_view()),
    path('api/v1/portfolio/categories/', PortfolioCategoryListView.as_view()),
    path('api/v1/contact/', ContactCreateView.as_view()),
    path('api/v1/consultation/', ConsultationCreateView.as_view()),
    path('api/v1/demo-request/', DemoRequestCreateView.as_view()),

    # API v1 — JWT Auth
    path('api/v1/admin/auth/token/', TokenObtainPairView.as_view()),
    path('api/v1/admin/auth/token/refresh/', TokenRefreshView.as_view()),
    path('api/v1/admin/auth/token/verify/', TokenVerifyView.as_view()),

    # API v1 — Admin CRUD (Phase 1)
    path('api/v1/admin/services/', include(service_admin_router.urls)),
    path('api/v1/admin/products/', include(product_admin_router.urls)),
    path('api/v1/admin/portfolio/', include(portfolio_admin_router.urls)),
    path('api/v1/admin/portfolio/categories/', include(category_admin_router.urls)),
    path('api/v1/admin/leads/contact/', include(contact_lead_router.urls)),
    path('api/v1/admin/leads/consultation/', include(consultation_lead_router.urls)),
    path('api/v1/admin/leads/demo/', include(demo_lead_router.urls)),

    # Media files (development only — handled by S3/CloudFront in production)
    path('media/', serve, {'document_root': settings.MEDIA_ROOT}),
]
```

---

*Phase 1 API Spec v2.0 — DRAFT. Awaiting approval.*

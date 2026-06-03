"""
Root URL configuration — Accetraa Technologies.

Phase 1 — Active endpoints:
  /admin/               → Django Admin Panel (session auth — always active)
  /api/v1/health/       → Health check (public)
  /api/v1/services/     → Public: list active services

Phase 2 — Reserved (NOT active in Phase 1):
  /api/v1/admin/auth/token/            → JWT obtain       (React Admin Panel)
  /api/v1/admin/auth/token/refresh/    → JWT refresh      (React Admin Panel)
  /api/v1/admin/auth/token/verify/     → JWT verify       (React Admin Panel)
  /api/v1/admin/services/              → Admin CRUD API   (React Admin Panel)
  /api/v1/admin/products/              → Admin CRUD API   (React Admin Panel)
  ... (all admin/* routes)

New modules uncommented here as each is reviewed and approved.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from apps.core.views import HealthCheckView

# ── Apply admin site branding ──────────────────────────────────────────────────
admin.site.site_header = getattr(settings, 'ADMIN_SITE_HEADER', 'Accetraa Technologies')
admin.site.site_title  = getattr(settings, 'ADMIN_SITE_TITLE',  'Accetraa Admin')
admin.site.index_title = getattr(settings, 'ADMIN_INDEX_TITLE', 'Website Administration')


urlpatterns = [

    # ── Django Admin (session auth — Phase 1 CMS) ────────────────────────────
    path('admin/', admin.site.urls),

    # ── Health Check ──────────────────────────────────────────────────────────
    path('api/v1/health/', HealthCheckView.as_view(), name='health-check'),

    # =========================================================================
    # PHASE 1 — PUBLIC API ENDPOINTS
    # =========================================================================

    # Module 1: Services
    path('api/v1/', include('apps.services.urls')),

    # Module 2: Products
    path('api/v1/', include('apps.products.urls')),

    # Module 3: Portfolio
    path('api/v1/', include('apps.portfolio.urls')),

    # Module 4: Contact
    path('api/v1/', include('apps.contact.urls')),

    # Module 5: Consultation
    path('api/v1/', include('apps.consultation.urls')),

    # Module 6: Demo Requests
    path('api/v1/', include('apps.demo_requests.urls')),

    # =========================================================================
    # PHASE 2 — RESERVED: React Admin Panel (JWT-protected Admin CRUD API)
    # =========================================================================
    # To activate Phase 2 admin API:
    #   1. pip install djangorestframework-simplejwt==5.3.1
    #   2. Uncomment 'rest_framework_simplejwt' in settings/base.py THIRD_PARTY_APPS
    #   3. Uncomment SIMPLE_JWT block in settings/base.py
    #   4. Uncomment the imports and URL patterns below
    #
    # from rest_framework_simplejwt.views import (
    #     TokenObtainPairView, TokenRefreshView, TokenVerifyView,
    # )
    #
    # path('api/v1/admin/auth/token/',         TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/v1/admin/auth/token/refresh/', TokenRefreshView.as_view(),    name='token_refresh'),
    # path('api/v1/admin/auth/token/verify/',  TokenVerifyView.as_view(),     name='token_verify'),
    # path('api/v1/admin/services/',           include('apps.services.admin_urls')),
    # path('api/v1/admin/products/',           include('apps.products.admin_urls')),
    # path('api/v1/admin/portfolio/',          include('apps.portfolio.admin_urls')),
    # path('api/v1/admin/contact/',            include('apps.contact.admin_urls')),
    # path('api/v1/admin/consultation/',       include('apps.consultation.admin_urls')),
    # path('api/v1/admin/demo-requests/',      include('apps.demo_requests.admin_urls')),
    # =========================================================================
]

# Serve media files via Django dev server in development.
# In production, media is served from S3 via CloudFront.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

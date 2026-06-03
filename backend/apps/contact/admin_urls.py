"""
PHASE 2 — Reserved: Admin URL patterns for the contact app.
NOT included in Phase 1 root urls.py.

To activate in Phase 2:
  In accetraa/urls.py, uncomment:
    path('api/v1/admin/contact/', include('apps.contact.admin_urls')),

Resulting admin endpoints (GET and PATCH only — no POST, PUT, or DELETE):
  GET   /api/v1/admin/contact/          → list all contact requests
  GET   /api/v1/admin/contact/{id}/     → retrieve single request
  PATCH /api/v1/admin/contact/{id}/     → update status only
"""
from rest_framework.routers import DefaultRouter
from .views import ContactRequestAdminViewSet

router = DefaultRouter()
router.register(r'', ContactRequestAdminViewSet, basename='admin-contact')

urlpatterns = router.urls

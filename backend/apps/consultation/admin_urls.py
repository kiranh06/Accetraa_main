"""
PHASE 2 — Reserved: Admin URL patterns for the consultation app.
NOT included in Phase 1 root urls.py.

To activate in Phase 2:
  In accetraa/urls.py, uncomment:
    path('api/v1/admin/consultation/', include('apps.consultation.admin_urls')),

Resulting admin endpoints (GET and PATCH only — no POST, PUT, or DELETE):
  GET   /api/v1/admin/consultation/          → list all requests
  GET   /api/v1/admin/consultation/{id}/     → retrieve single request
  PATCH /api/v1/admin/consultation/{id}/     → update status only
"""
from rest_framework.routers import DefaultRouter
from .views import ConsultationRequestAdminViewSet

router = DefaultRouter()
router.register(r'', ConsultationRequestAdminViewSet, basename='admin-consultation')

urlpatterns = router.urls

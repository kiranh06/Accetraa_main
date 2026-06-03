"""
PHASE 2 — Reserved: Admin URL patterns for the demo_requests app.
NOT included in Phase 1 root urls.py.

To activate in Phase 2:
  In accetraa/urls.py, uncomment:
    path('api/v1/admin/demo-requests/', include('apps.demo_requests.admin_urls')),

Resulting admin endpoints (GET and PATCH only — no POST, PUT, or DELETE):
  GET   /api/v1/admin/demo-requests/          → list all requests
  GET   /api/v1/admin/demo-requests/{id}/     → retrieve single request
  PATCH /api/v1/admin/demo-requests/{id}/     → update status only
"""
from rest_framework.routers import DefaultRouter
from .views import DemoRequestAdminViewSet

router = DefaultRouter()
router.register(r'', DemoRequestAdminViewSet, basename='admin-demo-request')

urlpatterns = router.urls

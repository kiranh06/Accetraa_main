"""
Admin URL patterns for the services app (DRF Router — staff-only).
Included by root urls.py at: path('api/v1/admin/services/', include('apps.services.admin_urls'))

Resulting admin endpoints:
  GET    /api/v1/admin/services/        → list all
  POST   /api/v1/admin/services/        → create
  GET    /api/v1/admin/services/{id}/   → retrieve
  PUT    /api/v1/admin/services/{id}/   → full update
  PATCH  /api/v1/admin/services/{id}/   → partial update
  DELETE /api/v1/admin/services/{id}/   → delete
"""
from rest_framework.routers import DefaultRouter
from .views import ServiceAdminViewSet

router = DefaultRouter()
router.register(r'', ServiceAdminViewSet, basename='admin-service')

urlpatterns = router.urls

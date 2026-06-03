"""
PHASE 2 — Reserved: Admin URL patterns for the products app.
NOT included in Phase 1 root urls.py.

To activate in Phase 2:
  1. Ensure JWT is configured (see settings/base.py PHASE 2 comments).
  2. In accetraa/urls.py, uncomment:
       path('api/v1/admin/products/', include('apps.products.admin_urls')),

Resulting admin endpoints (all staff-only via JWT):
  GET    /api/v1/admin/products/        → list all
  POST   /api/v1/admin/products/        → create
  GET    /api/v1/admin/products/{id}/   → retrieve
  PUT    /api/v1/admin/products/{id}/   → full update
  PATCH  /api/v1/admin/products/{id}/   → partial update
  DELETE /api/v1/admin/products/{id}/   → delete
"""
from rest_framework.routers import DefaultRouter
from .views import ProductAdminViewSet

router = DefaultRouter()
router.register(r'', ProductAdminViewSet, basename='admin-product')

urlpatterns = router.urls

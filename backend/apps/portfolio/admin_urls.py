"""
PHASE 2 — Reserved: Admin URL patterns for the portfolio app.
NOT included in Phase 1 root urls.py.

To activate in Phase 2:
  In accetraa/urls.py, uncomment:
    path('api/v1/admin/portfolio/',            include('apps.portfolio.admin_urls')),
    path('api/v1/admin/portfolio/categories/', include('apps.portfolio.category_admin_urls')),

Resulting admin endpoints (all staff-only):
  GET/POST   /api/v1/admin/portfolio/           → list / create items
  GET/PUT/PATCH/DELETE /api/v1/admin/portfolio/{id}/ → item CRUD

  GET/POST   /api/v1/admin/portfolio/categories/           → list / create
  GET/PUT/PATCH/DELETE /api/v1/admin/portfolio/categories/{id}/ → CRUD
"""
from rest_framework.routers import DefaultRouter
from .views import PortfolioItemAdminViewSet, PortfolioCategoryAdminViewSet

item_router = DefaultRouter()
item_router.register(r'', PortfolioItemAdminViewSet, basename='admin-portfolio-item')

category_router = DefaultRouter()
category_router.register(r'', PortfolioCategoryAdminViewSet, basename='admin-portfolio-category')

urlpatterns = item_router.urls
category_urlpatterns = category_router.urls

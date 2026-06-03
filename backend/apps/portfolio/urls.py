"""
Public URL patterns for the portfolio app.
Included by root urls.py at: path('api/v1/', include('apps.portfolio.urls'))

Resulting public endpoints:
  GET /api/v1/portfolio/                      → All active portfolio items
  GET /api/v1/portfolio/?category=web-projects → Filtered by category slug
  GET /api/v1/portfolio/?featured=true         → Featured items only (homepage)
  GET /api/v1/portfolio/categories/            → All portfolio categories (filter tabs)
"""
from django.urls import path
from .views import PortfolioItemListView, PortfolioCategoryListView

urlpatterns = [
    path('portfolio/',            PortfolioItemListView.as_view(),    name='portfolio-list'),
    path('portfolio/categories/', PortfolioCategoryListView.as_view(), name='portfolio-category-list'),
]

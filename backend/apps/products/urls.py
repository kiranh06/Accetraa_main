"""
Public URL patterns for the products app.
Included by root urls.py at: path('api/v1/', include('apps.products.urls'))

Resulting public endpoint:
  GET /api/v1/products/              → All active products
  GET /api/v1/products/?featured=true → Featured products only (homepage)
"""
from django.urls import path
from .views import ProductListView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
]

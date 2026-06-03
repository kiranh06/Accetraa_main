from rest_framework import generics, viewsets, filters
from rest_framework.permissions import AllowAny

from .models import Product
from .serializers import ProductSerializer, ProductAdminSerializer
from apps.core.permissions import IsStaffUser


class ProductListView(generics.ListAPIView):
    """
    GET /api/v1/products/
    Public endpoint: returns all active products.
    No authentication required. No pagination (6 products max in Phase 1).

    Query parameters:
      ?featured=true   → Returns only products where is_featured=True (homepage use).
    """
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = None  # All products returned; no pagination needed for ≤ 6 items.

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        featured = self.request.query_params.get('featured', None)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        return queryset

    def get_serializer_context(self):
        """Pass request to serializer so thumbnail_url returns absolute URLs."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# ── PHASE 2 — Reserved: React Admin Panel ──────────────────────────────────────
class ProductAdminViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for products. Requires JWT authentication with is_staff=True.
    NOT exposed in Phase 1 URL routes.
    Activated in Phase 2 by including apps.products.admin_urls in urls.py.

    Endpoints (all under /api/v1/admin/products/):
      GET    /           → list all products (including inactive)
      POST   /           → create new product
      GET    /{id}/      → retrieve single product
      PUT    /{id}/      → full update
      PATCH  /{id}/      → partial update (e.g. toggle is_featured, is_active)
      DELETE /{id}/      → delete product
    """
    serializer_class = ProductAdminSerializer
    permission_classes = [IsStaffUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'tagline', 'short_description']
    ordering_fields = ['sort_order', 'name', 'is_featured', 'created_at']
    ordering = ['sort_order', 'name']

    def get_queryset(self):
        return Product.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

from rest_framework import generics, viewsets, filters
from rest_framework.permissions import AllowAny

from .models import PortfolioCategory, PortfolioItem
from .serializers import (
    PortfolioCategorySerializer,
    PortfolioItemSerializer,
    PortfolioCategoryAdminSerializer,
    PortfolioItemAdminSerializer,
)
from apps.core.permissions import IsStaffUser


# ── Public Views ───────────────────────────────────────────────────────────────

class PortfolioCategoryListView(generics.ListAPIView):
    """
    GET /api/v1/portfolio/categories/
    Public endpoint: returns all categories for the portfolio filter tabs.
    No authentication required. No pagination (4 categories in Phase 1).
    """
    serializer_class = PortfolioCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None
    queryset = PortfolioCategory.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class PortfolioItemListView(generics.ListAPIView):
    """
    GET /api/v1/portfolio/
    Public endpoint: returns active portfolio items for the showcase grid.
    No authentication required.

    Query parameters:
      ?category=web-projects   → Filter by category slug
      ?featured=true           → Return only featured items (homepage highlights)

    Eager-loads category and images to avoid N+1 queries.
    """
    serializer_class = PortfolioItemSerializer
    permission_classes = [AllowAny]
    pagination_class = None  # All items returned; frontend handles display.

    def get_queryset(self):
        queryset = (
            PortfolioItem.objects
            .filter(is_active=True)
            .select_related('category')
            .prefetch_related('images')
        )

        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        featured = self.request.query_params.get('featured')
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)

        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# ── PHASE 2 — Reserved: React Admin Panel ──────────────────────────────────────

class PortfolioCategoryAdminViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for portfolio categories.
    NOT exposed in Phase 1 URL routes.
    Activated in Phase 2 via apps.portfolio.admin_urls.
    """
    serializer_class = PortfolioCategoryAdminSerializer
    permission_classes = [IsStaffUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['sort_order', 'name']
    ordering = ['sort_order']
    queryset = PortfolioCategory.objects.all()


class PortfolioItemAdminViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for portfolio items.
    NOT exposed in Phase 1 URL routes.
    Activated in Phase 2 via apps.portfolio.admin_urls.
    """
    serializer_class = PortfolioItemAdminSerializer
    permission_classes = [IsStaffUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'client_name', 'technologies', 'short_description']
    ordering_fields = ['sort_order', 'title', 'created_at', 'category']
    ordering = ['sort_order', '-created_at']

    def get_queryset(self):
        queryset = (
            PortfolioItem.objects
            .select_related('category')
            .prefetch_related('images')
        )
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

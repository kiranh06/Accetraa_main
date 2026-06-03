from rest_framework import generics, viewsets, filters
from rest_framework.permissions import AllowAny

from .models import Service
from .serializers import ServiceSerializer, ServiceAdminSerializer
from apps.core.permissions import IsStaffUser


class ServiceListView(generics.ListAPIView):
    """
    GET /api/v1/services/
    Public endpoint: returns all active services ordered by sort_order.
    No authentication required.
    No pagination — all services are returned (maximum 8 in Phase 1).
    """
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    pagination_class = None  # Return full list; no pagination needed for ≤ 8 items.

    def get_queryset(self):
        return Service.objects.filter(is_active=True)


class ServiceAdminViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for services. Requires JWT authentication with is_staff=True.

    Endpoints (all under /api/v1/admin/services/):
      GET    /           → list all services (including inactive)
      POST   /           → create new service
      GET    /{id}/      → retrieve single service
      PUT    /{id}/      → full update
      PATCH  /{id}/      → partial update (e.g. toggle is_active or change sort_order)
      DELETE /{id}/      → delete service
    """
    serializer_class = ServiceAdminSerializer
    permission_classes = [IsStaffUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'short_description']
    ordering_fields = ['sort_order', 'name', 'created_at']
    ordering = ['sort_order', 'name']

    def get_queryset(self):
        return Service.objects.all()

from rest_framework import generics, viewsets, filters, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import ConsultationRequest
from .serializers import ConsultationRequestSerializer, ConsultationRequestAdminSerializer
from apps.core.permissions import IsStaffUser
from apps.core.throttling import ConsultationFormThrottle


class ConsultationCreateView(generics.CreateAPIView):
    """
    POST /api/v1/consultation/
    Public endpoint: accepts and stores a consultation request.

    - No authentication required.
    - Rate limited to 3 submissions per hour per IP (ConsultationFormThrottle).
    - IP address and user agent captured server-side.
    - Returns 201 with a success message only — never echoes stored data.
    - Email notifications dispatched via Django signal after save.
    """
    serializer_class   = ConsultationRequestSerializer
    permission_classes = [AllowAny]
    throttle_classes   = [ConsultationFormThrottle]

    def get_client_ip(self):
        """Extract the real client IP, accounting for reverse proxies."""
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return self.request.META.get('REMOTE_ADDR')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        raw_ua = self.request.META.get('HTTP_USER_AGENT', '').strip()
        serializer.save(
            ip_address=self.get_client_ip(),
            user_agent=raw_ua or None,
        )

        return Response(
            {
                'message': (
                    'Thank you! Our team will contact you within 1 business day '
                    'to schedule your consultation.'
                )
            },
            status=status.HTTP_201_CREATED,
        )


# ── PHASE 2 — Reserved: React Admin Panel ──────────────────────────────────────

class ConsultationRequestAdminViewSet(viewsets.ModelViewSet):
    """
    Admin read + status management for consultation requests.
    NOT exposed in Phase 1 URL routes.
    Activated in Phase 2 via apps.consultation.admin_urls.

    Submitted fields are read-only. Only `status` can be PATCHed.
    POST and DELETE are disabled.
    """
    serializer_class  = ConsultationRequestAdminSerializer
    permission_classes = [IsStaffUser]
    http_method_names  = ['get', 'patch', 'head', 'options']
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ['full_name', 'email', 'company_name', 'service_interest']
    ordering_fields    = ['created_at', 'status', 'service_interest']
    ordering           = ['-created_at']

    def get_queryset(self):
        queryset = ConsultationRequest.objects.all()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        service_filter = self.request.query_params.get('service')
        if service_filter:
            queryset = queryset.filter(service_interest__icontains=service_filter)
        return queryset

from rest_framework import generics, viewsets, filters, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import ContactRequest
from .serializers import ContactRequestSerializer, ContactRequestAdminSerializer
from apps.core.permissions import IsStaffUser
from apps.core.throttling import ContactFormThrottle


class ContactCreateView(generics.CreateAPIView):
    """
    POST /api/v1/contact/
    Public endpoint: accepts and stores a contact form submission.

    - No authentication required.
    - Rate limited to 3 submissions per hour per IP (ContactFormThrottle).
    - IP address captured server-side and stored for spam tracking.
    - Returns 201 with a success message — never echoes submitted data back.
    - Email notifications dispatched via Django signal after save.
    """
    serializer_class   = ContactRequestSerializer
    permission_classes = [AllowAny]
    throttle_classes   = [ContactFormThrottle]

    def get_client_ip(self):
        """Extract the real client IP, accounting for reverse proxies."""
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return self.request.META.get('REMOTE_ADDR')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Attach server-captured metadata before saving.
        # user_agent: stored as None if header is absent or empty.
        raw_ua = self.request.META.get('HTTP_USER_AGENT', '').strip()
        serializer.save(
            ip_address=self.get_client_ip(),
            user_agent=raw_ua or None,
        )

        return Response(
            {'message': "Thank you for contacting us! We'll get back to you within 2 business days."},
            status=status.HTTP_201_CREATED,
        )


# ── PHASE 2 — Reserved: React Admin Panel ──────────────────────────────────────

class ContactRequestAdminViewSet(viewsets.ModelViewSet):
    """
    Admin read + status management for contact requests.
    NOT exposed in Phase 1 URL routes.
    Activated in Phase 2 via apps.contact.admin_urls.

    Submissions are read-only (full_name, email, etc. cannot be modified).
    Only `status` can be PATCHed.
    POST and DELETE are disabled — contact records are never created or deleted via API.
    """
    serializer_class   = ContactRequestAdminSerializer
    permission_classes = [IsStaffUser]
    http_method_names  = ['get', 'patch', 'head', 'options']   # no POST, PUT, DELETE
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ['full_name', 'email', 'company_name', 'subject']
    ordering_fields    = ['created_at', 'status']
    ordering           = ['-created_at']

    def get_queryset(self):
        queryset = ContactRequest.objects.all()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

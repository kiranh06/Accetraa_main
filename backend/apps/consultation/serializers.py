from rest_framework import serializers
from .models import ConsultationRequest

# Accepted values for service_interest.
# Must stay in sync with the services fixture (apps/services/fixtures/initial_services.json).
# "General" is the fallback for prospects who are unsure which service they need.
VALID_SERVICES = [
    'AI & Data Solutions',
    'Software Development',
    'Mobile App Development',
    'Cloud Services',
    'Cybersecurity',
    'Digital Transformation',
    'HR & Recruitment Services',
    'Startup Consulting',
    'General',
]


class ConsultationRequestSerializer(serializers.ModelSerializer):
    """
    Public write serializer for the Request Consultation form.
    Used by: POST /api/v1/consultation/

    - Accepts only the fields a visitor submits.
    - `status`, `ip_address`, and `user_agent` are excluded — set server-side.
    - Returns only a success message on 201; never echoes back stored data.
    """

    class Meta:
        model  = ConsultationRequest
        fields = [
            'full_name',
            'email',
            'phone',
            'company_name',
            'service_interest',
            'message',
        ]

    # ── Field-level validation ─────────────────────────────────────────────────

    def validate_full_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Full name is required.')
        if len(value) < 2:
            raise serializers.ValidationError('Please enter your full name.')
        return value

    def validate_email(self, value):
        return value.strip().lower()

    def validate_phone(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Phone number is required.')
        return value

    def validate_company_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Company name is required.')
        return value

    def validate_service_interest(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Please select a service of interest.')
        if value not in VALID_SERVICES:
            raise serializers.ValidationError(
                f'Invalid service selection. Choose from: {", ".join(VALID_SERVICES)}.'
            )
        return value

    def validate_message(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Message is required.')
        if len(value) < 10:
            raise serializers.ValidationError(
                'Message is too short. Please provide more detail (minimum 10 characters).'
            )
        if len(value) > 5000:
            raise serializers.ValidationError(
                'Message is too long (maximum 5000 characters).'
            )
        return value


class ConsultationRequestAdminSerializer(serializers.ModelSerializer):
    """
    Admin read serializer — all fields including system fields.
    Reserved for Phase 2 React Admin Panel.
    Used by: /api/v1/admin/consultation/ (staff-only, not exposed in Phase 1 URLs)

    Only `status` can be PATCHed.
    All submitted and system fields are read-only — never modified post-creation.
    """
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model  = ConsultationRequest
        fields = '__all__'
        read_only_fields = [
            'full_name', 'email', 'phone', 'company_name',
            'service_interest', 'message',
            'ip_address', 'user_agent',
            'created_at', 'updated_at',
        ]

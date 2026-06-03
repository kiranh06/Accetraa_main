from rest_framework import serializers
from .models import DemoRequest

# Accepted values for product_interest.
# Must stay in sync with the products fixture and frontend dropdown options.
VALID_PRODUCTS = [
    'HRMS',
    'ERP',
    'Recruitment Management System',
    'AI Chatbot',
    'BPO Platform',
]

# Accepted values for company_size (optional field).
VALID_COMPANY_SIZES = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+',
]


class DemoRequestSerializer(serializers.ModelSerializer):
    """
    Public write serializer for the Request a Demo form.
    Used by: POST /api/v1/demo-requests/

    - Accepts only the fields a visitor submits.
    - `status`, `ip_address`, and `user_agent` are excluded — set server-side.
    - Returns only a success message on 201; never echoes back stored data.
    """

    class Meta:
        model  = DemoRequest
        fields = [
            'full_name',
            'email',
            'phone',
            'company_name',
            'job_title',
            'product_interest',
            'company_size',
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

    def validate_job_title(self, value):
        if value:
            return value.strip()
        return value

    def validate_product_interest(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Please select a product of interest.')
        if value not in VALID_PRODUCTS:
            raise serializers.ValidationError(
                f'Invalid product selection. Choose from: {", ".join(VALID_PRODUCTS)}.'
            )
        return value

    def validate_company_size(self, value):
        if value:
            value = value.strip()
            if value not in VALID_COMPANY_SIZES:
                raise serializers.ValidationError(
                    f'Invalid company size. Choose from: {", ".join(VALID_COMPANY_SIZES)}.'
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


class DemoRequestAdminSerializer(serializers.ModelSerializer):
    """
    Admin read serializer — all fields including system fields.
    Reserved for Phase 2 React Admin Panel.
    Used by: /api/v1/admin/demo-requests/ (staff-only, not exposed in Phase 1 URLs)

    Only `status` can be PATCHed.
    All submitted and system fields are read-only — never modified post-creation.
    """
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model  = DemoRequest
        fields = '__all__'
        read_only_fields = [
            'full_name', 'email', 'phone', 'company_name', 'job_title',
            'product_interest', 'company_size', 'message',
            'ip_address', 'user_agent',
            'created_at', 'updated_at',
        ]

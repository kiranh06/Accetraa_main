from rest_framework import serializers
from .models import ContactRequest


class ContactRequestSerializer(serializers.ModelSerializer):
    """
    Public write serializer for the contact form.
    Used by: POST /api/v1/contact/

    - Accepts only the fields a visitor submits.
    - `status`, `ip_address`, and `user_agent` are excluded — set by the view, not the user.
    - Returns only a success message on 201; never echoes back stored data.
    """

    class Meta:
        model  = ContactRequest
        fields = [
            'full_name',
            'email',
            'phone',
            'company_name',
            'subject',
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

    def validate_phone(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Phone number is required.')
        return value

    def validate_subject(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Subject is required.')
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

    def validate_email(self, value):
        return value.strip().lower()

    def validate_company_name(self, value):
        if value:
            return value.strip()
        return value


class ContactRequestAdminSerializer(serializers.ModelSerializer):
    """
    Admin read serializer — all fields including system fields.
    Reserved for Phase 2 React Admin Panel.
    Used by: /api/v1/admin/contact/ (staff-only, not exposed in Phase 1 URLs)

    Status updates use this serializer with partial=True.
    Submitted fields (full_name, email, etc.) are read-only — never modified post-creation.
    """
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model  = ContactRequest
        fields = '__all__'
        read_only_fields = [
            'full_name', 'email', 'phone', 'company_name',
            'subject', 'message', 'ip_address', 'user_agent',
            'created_at', 'updated_at',
        ]

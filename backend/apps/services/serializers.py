from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """
    Public serializer — returns only the fields needed by the frontend.
    Used by: GET /api/v1/services/
    """
    class Meta:
        model = Service
        fields = [
            'id',
            'name',
            'slug',
            'short_description',
            'icon',
            'sort_order',
        ]


class ServiceAdminSerializer(serializers.ModelSerializer):
    """
    Admin serializer — exposes all fields for full CRUD management.
    Used by: /api/v1/admin/services/ (staff-only)
    """
    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def validate_name(self, value):
        """Ensure service name is not blank after stripping whitespace."""
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Service name cannot be blank.')
        return value

    def validate_short_description(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Short description cannot be blank.')
        return value

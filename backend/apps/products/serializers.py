from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    """
    Public serializer — fields required by the frontend product cards.
    Used by: GET /api/v1/products/
    Excludes internal fields (description, created_at, updated_at).
    """
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'tagline',
            'short_description',
            'thumbnail_url',
            'is_featured',
            'sort_order',
        ]

    def get_thumbnail_url(self, obj):
        """Return absolute URL for the thumbnail, or None if not set."""
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None


class ProductAdminSerializer(serializers.ModelSerializer):
    """
    Admin serializer — all fields for full CRUD management.
    Reserved for Phase 2 React Admin Panel.
    Used by: /api/v1/admin/products/ (staff-only, not exposed in Phase 1 URLs)
    """
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Product name cannot be blank.')
        return value

    def validate_short_description(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Short description cannot be blank.')
        return value

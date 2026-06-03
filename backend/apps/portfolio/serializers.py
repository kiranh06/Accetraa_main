from rest_framework import serializers
from .models import PortfolioCategory, PortfolioItem, PortfolioItemImage


# ── Helpers ────────────────────────────────────────────────────────────────────

def build_image_url(request, image_field):
    """Return absolute URL for an ImageField, or None if the field is empty."""
    if image_field:
        if request:
            return request.build_absolute_uri(image_field.url)
        return image_field.url
    return None


# ── Public Serializers ─────────────────────────────────────────────────────────

class PortfolioCategorySerializer(serializers.ModelSerializer):
    """
    Public serializer for portfolio categories.
    Used by: GET /api/v1/portfolio/categories/
    Powers the filter tabs on the Portfolio & Products page.
    """
    class Meta:
        model = PortfolioCategory
        fields = ['id', 'name', 'slug', 'sort_order']


class PortfolioItemImageSerializer(serializers.ModelSerializer):
    """
    Nested serializer for gallery images.
    Embedded inside PortfolioItemSerializer.
    """
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioItemImage
        fields = ['id', 'image_url', 'caption', 'sort_order']

    def get_image_url(self, obj):
        return build_image_url(self.context.get('request'), obj.image)


class PortfolioItemSerializer(serializers.ModelSerializer):
    """
    Public serializer for portfolio items.
    Used by: GET /api/v1/portfolio/

    Includes:
      - Nested category (id, name, slug) for frontend filter matching
      - thumbnail_url as an absolute URL
      - Nested gallery images
      - technologies as a list (split from comma-separated string)

    Excludes internal fields: is_active, created_at, updated_at.
    """
    category = PortfolioCategorySerializer(read_only=True)
    thumbnail_url = serializers.SerializerMethodField()
    images = PortfolioItemImageSerializer(many=True, read_only=True)
    technologies_list = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioItem
        fields = [
            'id',
            'title',
            'slug',
            'client_name',
            'short_description',
            'description',
            'thumbnail_url',
            'technologies',
            'technologies_list',
            'project_url',
            'is_featured',
            'sort_order',
            'category',
            'images',
        ]

    def get_thumbnail_url(self, obj):
        return build_image_url(self.context.get('request'), obj.thumbnail)

    def get_technologies_list(self, obj):
        """
        Split the comma-separated technologies string into a clean list.
        Returns an empty list if the field is blank.
        Example: "React, Django, MySQL" → ["React", "Django", "MySQL"]
        """
        if obj.technologies:
            return [t.strip() for t in obj.technologies.split(',') if t.strip()]
        return []


# ── Admin Serializers (Phase 2 — React Admin Panel) ───────────────────────────

class PortfolioCategoryAdminSerializer(serializers.ModelSerializer):
    """
    Admin serializer for categories — full CRUD.
    Reserved for Phase 2 React Admin Panel.
    """
    class Meta:
        model = PortfolioCategory
        fields = '__all__'

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Category name cannot be blank.')
        return value


class PortfolioItemAdminSerializer(serializers.ModelSerializer):
    """
    Admin serializer for portfolio items — full CRUD.
    Reserved for Phase 2 React Admin Panel.
    """
    class Meta:
        model = PortfolioItem
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def validate_title(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Title cannot be blank.')
        return value

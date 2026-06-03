from django.contrib import admin
from django.utils.html import format_html
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Django admin configuration for Product.
    Allows content managers to manage product showcase cards without touching code.
    """

    # ── List view ──────────────────────────────────────────────────────────────
    list_display = [
        'sort_order',
        'name',
        'slug',
        'tagline',
        'thumbnail_preview',
        'is_featured',
        'is_active',
        'updated_at',
    ]
    list_display_links = ['name']
    list_editable = ['sort_order', 'is_featured', 'is_active']
    list_filter = ['is_active', 'is_featured']
    search_fields = ['name', 'tagline', 'short_description']
    ordering = ['sort_order', 'name']
    list_per_page = 25

    # ── Detail/Edit form ───────────────────────────────────────────────────────
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['thumbnail_preview', 'created_at', 'updated_at']

    fieldsets = (
        ('Identity', {
            'fields': ('name', 'slug'),
            'description': (
                'The slug is auto-generated from the name. '
                'Do not change it after the product is live — it will become the URL in Phase 2.'
            ),
        }),
        ('Card Content', {
            'fields': ('tagline', 'short_description', 'thumbnail', 'thumbnail_preview'),
            'description': 'These fields are shown on the product card on the Portfolio page.',
        }),
        ('Full Description', {
            'fields': ('description',),
            'classes': ('collapse',),
            'description': 'Reserved for Phase 2 individual product pages. Leave blank for Phase 1.',
        }),
        ('Display Settings', {
            'fields': ('sort_order', 'is_featured', 'is_active'),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    # ── Custom columns ─────────────────────────────────────────────────────────
    @admin.display(description='Thumbnail')
    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" style="height:48px; width:auto; border-radius:4px;" />',
                obj.thumbnail.url,
            )
        return '—'

from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    """
    Django admin configuration for Service.
    Allows non-technical staff to manage services without touching code.
    """

    # ── List view ──────────────────────────────────────────────────────────────
    list_display = [
        'sort_order',
        'name',
        'slug',
        'icon',
        'is_active',
        'updated_at',
    ]
    list_display_links = ['name']
    list_editable = ['sort_order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'short_description']
    ordering = ['sort_order', 'name']
    list_per_page = 25

    # ── Detail/Edit form ───────────────────────────────────────────────────────
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Identity', {
            'fields': ('name', 'slug', 'icon'),
            'description': (
                'The slug is auto-generated from the name. '
                'Do not change it after the service is live — it will be used in URLs in Phase 2.'
            ),
        }),
        ('Content', {
            'fields': ('short_description', 'description'),
        }),
        ('Display Settings', {
            'fields': ('sort_order', 'is_active'),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

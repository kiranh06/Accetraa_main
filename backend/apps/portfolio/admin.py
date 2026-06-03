from django.contrib import admin
from django.utils.html import format_html
from .models import PortfolioCategory, PortfolioItem, PortfolioItemImage


# ── Gallery Inline ─────────────────────────────────────────────────────────────

class PortfolioItemImageInline(admin.TabularInline):
    """
    Inline admin for gallery images.
    Appears inside the PortfolioItem edit form, allowing content managers
    to upload and manage multiple project images in one place.
    """
    model = PortfolioItemImage
    extra = 1          # Show one blank row for adding a new image.
    max_num = 10       # Cap at 10 gallery images per project.
    fields = ['image', 'image_preview', 'caption', 'sort_order']
    readonly_fields = ['image_preview']
    ordering = ['sort_order']

    @admin.display(description='Preview')
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:60px; width:auto; border-radius:4px;" />',
                obj.image.url,
            )
        return '—'


# ── Portfolio Category Admin ───────────────────────────────────────────────────

@admin.register(PortfolioCategory)
class PortfolioCategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for portfolio categories (filter tabs).
    Content managers use this to add/rename/reorder the portfolio filter buttons.
    """
    list_display  = ['sort_order', 'name', 'slug', 'item_count']
    list_display_links = ['name']
    list_editable = ['sort_order']
    search_fields = ['name']
    ordering      = ['sort_order', 'name']
    prepopulated_fields = {'slug': ('name',)}

    @admin.display(description='Projects')
    def item_count(self, obj):
        count = obj.items.filter(is_active=True).count()
        return count


# ── Portfolio Item Admin ───────────────────────────────────────────────────────

@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    """
    Admin configuration for portfolio items.
    Includes the gallery image inline so all project images are managed
    from a single edit form.
    """

    # ── List view ──────────────────────────────────────────────────────────────
    list_display = [
        'sort_order',
        'thumbnail_preview',
        'title',
        'category',
        'client_name',
        'is_featured',
        'is_active',
        'updated_at',
    ]
    list_display_links = ['title']
    list_editable      = ['sort_order', 'is_featured', 'is_active']
    list_filter        = ['category', 'is_active', 'is_featured']
    search_fields      = ['title', 'client_name', 'technologies', 'short_description']
    ordering           = ['sort_order', '-created_at']
    list_per_page      = 25

    # ── Detail/Edit form ───────────────────────────────────────────────────────
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields     = ['thumbnail_preview', 'created_at', 'updated_at']
    inlines             = [PortfolioItemImageInline]

    fieldsets = (
        ('Project Identity', {
            'fields': ('title', 'slug', 'category', 'client_name'),
            'description': (
                'The slug is auto-generated from the title. '
                'Leave Client Name blank to display the project anonymously.'
            ),
        }),
        ('Content', {
            'fields': ('short_description', 'description'),
            'description': (
                'Short description appears on the portfolio card. '
                'Full description appears in the project modal.'
            ),
        }),
        ('Media', {
            'fields': ('thumbnail', 'thumbnail_preview'),
            'description': 'Thumbnail is the main card image. Additional images are managed in the Gallery section below.',
        }),
        ('Technical Details', {
            'fields': ('technologies', 'project_url'),
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

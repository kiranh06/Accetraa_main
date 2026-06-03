import csv
from django.contrib import admin
from django.http import HttpResponse
from django.utils import timezone
from django.utils.html import format_html
from .models import DemoRequest


@admin.register(DemoRequest)
class DemoRequestAdmin(admin.ModelAdmin):
    """
    Admin configuration for DemoRequest.

    Design principles:
    - All submitted fields are read-only — admins view, never edit, what was submitted.
    - Only `status` is editable.
    - Bulk status actions match the 5-state lifecycle.
    - CSV export for sales team pipeline management.
    """

    # ── List view ──────────────────────────────────────────────────────────────
    list_display = [
        'created_at',
        'full_name',
        'company_name',
        'email',
        'phone',
        'product_interest',
        'status_badge',
    ]
    list_display_links = ['full_name']
    list_filter        = ['status', 'product_interest', 'created_at']
    search_fields      = ['full_name', 'email', 'company_name', 'product_interest', 'message']
    ordering           = ['-created_at']
    list_per_page      = 30
    date_hierarchy     = 'created_at'
    actions            = [
        'mark_as_contacted',
        'mark_as_demo_scheduled',
        'mark_as_demo_completed',
        'mark_as_closed',
        'export_as_csv',
    ]

    # ── Detail / Edit form ─────────────────────────────────────────────────────
    readonly_fields = [
        'full_name', 'email', 'phone', 'company_name', 'job_title',
        'product_interest', 'company_size', 'message',
        'ip_address', 'user_agent',
        'created_at', 'updated_at',
    ]

    fieldsets = (
        ('Prospect Information', {
            'fields': ('full_name', 'email', 'phone', 'company_name', 'job_title', 'company_size'),
            'description': 'Read-only — exactly as submitted by the prospect.',
        }),
        ('Demo Request Details', {
            'fields': ('product_interest', 'message'),
        }),
        ('Demo Status', {
            'fields': ('status',),
            'description': (
                'New → Contacted → Demo Scheduled → Demo Completed. '
                'Use Closed for cancelled or unqualified requests.'
            ),
        }),
        ('System', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    # ── Status badge ───────────────────────────────────────────────────────────
    @admin.display(description='Status', ordering='status')
    def status_badge(self, obj):
        colours = {
            DemoRequest.Status.NEW:            '#1a73e8',  # blue
            DemoRequest.Status.CONTACTED:      '#f59e0b',  # amber
            DemoRequest.Status.DEMO_SCHEDULED: '#7c3aed',  # purple
            DemoRequest.Status.DEMO_COMPLETED: '#16a34a',  # green
            DemoRequest.Status.CLOSED:         '#6b7280',  # grey
        }
        colour = colours.get(obj.status, '#6b7280')
        return format_html(
            '<span style="color:{};font-weight:600;">{}</span>',
            colour,
            obj.get_status_display(),
        )

    # ── Bulk actions ───────────────────────────────────────────────────────────
    @admin.action(description='Mark selected as Contacted')
    def mark_as_contacted(self, request, queryset):
        updated = queryset.filter(
            status=DemoRequest.Status.NEW
        ).update(status=DemoRequest.Status.CONTACTED)
        self.message_user(request, f'{updated} request(s) marked as Contacted.')

    @admin.action(description='Mark selected as Demo Scheduled')
    def mark_as_demo_scheduled(self, request, queryset):
        updated = queryset.filter(
            status=DemoRequest.Status.CONTACTED
        ).update(status=DemoRequest.Status.DEMO_SCHEDULED)
        self.message_user(request, f'{updated} request(s) marked as Demo Scheduled.')

    @admin.action(description='Mark selected as Demo Completed')
    def mark_as_demo_completed(self, request, queryset):
        updated = queryset.filter(
            status=DemoRequest.Status.DEMO_SCHEDULED
        ).update(status=DemoRequest.Status.DEMO_COMPLETED)
        self.message_user(request, f'{updated} request(s) marked as Demo Completed.')

    @admin.action(description='Mark selected as Closed')
    def mark_as_closed(self, request, queryset):
        updated = queryset.exclude(
            status=DemoRequest.Status.CLOSED
        ).update(status=DemoRequest.Status.CLOSED)
        self.message_user(request, f'{updated} request(s) marked as Closed.')

    @admin.action(description='Export selected to CSV')
    def export_as_csv(self, request, queryset):
        timestamp = timezone.now().strftime('%Y%m%d_%H%M')
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            f'attachment; filename="demo_requests_{timestamp}.csv"'
        )
        writer = csv.writer(response)
        writer.writerow([
            'ID', 'Date', 'Full Name', 'Company', 'Email', 'Phone',
            'Job Title', 'Product Interest', 'Company Size', 'Message', 'Status',
        ])
        for obj in queryset.order_by('-created_at'):
            writer.writerow([
                obj.pk,
                obj.created_at.strftime('%Y-%m-%d %H:%M'),
                obj.full_name,
                obj.company_name,
                obj.email,
                obj.phone,
                obj.job_title or '',
                obj.product_interest,
                obj.company_size or '',
                obj.message,
                obj.get_status_display(),
            ])
        return response

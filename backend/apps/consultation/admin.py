import csv
from django.contrib import admin
from django.http import HttpResponse
from django.utils import timezone
from django.utils.html import format_html
from .models import ConsultationRequest


@admin.register(ConsultationRequest)
class ConsultationRequestAdmin(admin.ModelAdmin):
    """
    Admin configuration for ConsultationRequest.

    Design principles:
    - All submitted fields are read-only — admins view, never edit, what was submitted.
    - Only `status` is editable.
    - Bulk status actions match the 4-state lifecycle: New → Scheduled → Completed | Closed.
    - CSV export for sales team pipeline management.
    """

    # ── List view ──────────────────────────────────────────────────────────────
    list_display = [
        'created_at',
        'full_name',
        'company_name',
        'email',
        'phone',
        'service_interest',
        'status_badge',
    ]
    list_display_links = ['full_name']
    list_filter        = ['status', 'service_interest', 'created_at']
    search_fields      = ['full_name', 'email', 'company_name', 'service_interest', 'message']
    ordering           = ['-created_at']
    list_per_page      = 30
    date_hierarchy     = 'created_at'
    actions            = [
        'mark_as_scheduled',
        'mark_as_completed',
        'mark_as_closed',
        'export_as_csv',
    ]

    # ── Detail / Edit form ─────────────────────────────────────────────────────
    readonly_fields = [
        'full_name', 'email', 'phone', 'company_name',
        'service_interest', 'message',
        'ip_address', 'user_agent',
        'created_at', 'updated_at',
    ]

    fieldsets = (
        ('Prospect Information', {
            'fields': ('full_name', 'email', 'phone', 'company_name'),
            'description': 'Read-only — exactly as submitted by the prospect.',
        }),
        ('Request Details', {
            'fields': ('service_interest', 'message'),
        }),
        ('Consultation Status', {
            'fields': ('status',),
            'description': (
                'New → Scheduled (call booked) → Completed (delivered). '
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
            ConsultationRequest.Status.NEW:       '#1a73e8',  # blue
            ConsultationRequest.Status.SCHEDULED: '#7c3aed',  # purple
            ConsultationRequest.Status.COMPLETED: '#16a34a',  # green
            ConsultationRequest.Status.CLOSED:    '#6b7280',  # grey
        }
        colour = colours.get(obj.status, '#6b7280')
        return format_html(
            '<span style="color:{};font-weight:600;">{}</span>',
            colour,
            obj.get_status_display(),
        )

    # ── Bulk actions ───────────────────────────────────────────────────────────
    @admin.action(description='Mark selected as Scheduled')
    def mark_as_scheduled(self, request, queryset):
        updated = queryset.filter(
            status=ConsultationRequest.Status.NEW
        ).update(status=ConsultationRequest.Status.SCHEDULED)
        self.message_user(request, f'{updated} request(s) marked as Scheduled.')

    @admin.action(description='Mark selected as Completed')
    def mark_as_completed(self, request, queryset):
        updated = queryset.filter(
            status=ConsultationRequest.Status.SCHEDULED
        ).update(status=ConsultationRequest.Status.COMPLETED)
        self.message_user(request, f'{updated} request(s) marked as Completed.')

    @admin.action(description='Mark selected as Closed')
    def mark_as_closed(self, request, queryset):
        updated = queryset.exclude(
            status=ConsultationRequest.Status.CLOSED
        ).update(status=ConsultationRequest.Status.CLOSED)
        self.message_user(request, f'{updated} request(s) marked as Closed.')

    @admin.action(description='Export selected to CSV')
    def export_as_csv(self, request, queryset):
        timestamp = timezone.now().strftime('%Y%m%d_%H%M')
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            f'attachment; filename="consultation_requests_{timestamp}.csv"'
        )
        writer = csv.writer(response)
        writer.writerow([
            'ID', 'Date', 'Full Name', 'Company', 'Email', 'Phone',
            'Service Interest', 'Message', 'Status',
        ])
        for obj in queryset.order_by('-created_at'):
            writer.writerow([
                obj.pk,
                obj.created_at.strftime('%Y-%m-%d %H:%M'),
                obj.full_name,
                obj.company_name,
                obj.email,
                obj.phone,
                obj.service_interest,
                obj.message,
                obj.get_status_display(),
            ])
        return response

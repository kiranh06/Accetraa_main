import csv
from django.contrib import admin
from django.http import HttpResponse
from django.utils import timezone
from .models import ContactRequest


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    """
    Admin configuration for ContactRequest.

    Design principles:
    - All submitted fields are read-only — admins view but never edit what was submitted.
    - Only `status` is editable, capturing the follow-up workflow state.
    - Includes an export-to-CSV action for handing off leads to the sales team.
    """

    # ── List view ──────────────────────────────────────────────────────────────
    list_display = [
        'created_at',
        'full_name',
        'email',
        'phone',
        'company_name',
        'subject',
        'status_badge',
    ]
    list_display_links = ['full_name']
    list_filter        = ['status', 'created_at']
    search_fields      = ['full_name', 'email', 'company_name', 'subject', 'message']
    ordering           = ['-created_at']
    list_per_page      = 30
    date_hierarchy     = 'created_at'
    actions            = ['mark_as_contacted', 'mark_as_closed', 'export_as_csv']

    # ── Detail / Edit form ─────────────────────────────────────────────────────
    readonly_fields = [
        'full_name', 'email', 'phone', 'company_name',
        'subject', 'message', 'ip_address', 'user_agent', 'created_at', 'updated_at',
    ]

    fieldsets = (
        ('Submitted Information', {
            'fields': (
                'full_name', 'email', 'phone', 'company_name',
                'subject', 'message',
            ),
            'description': 'These fields are read-only — exactly as submitted by the visitor.',
        }),
        ('Follow-up Status', {
            'fields': ('status',),
            'description': (
                'Update the status as your team follows up on this request. '
                'New → Contacted → Closed.'
            ),
        }),
        ('System', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    # ── Custom list display ────────────────────────────────────────────────────
    @admin.display(description='Status', ordering='status')
    def status_badge(self, obj):
        colours = {
            ContactRequest.Status.NEW:       '#1a73e8',
            ContactRequest.Status.CONTACTED: '#f59e0b',
            ContactRequest.Status.CLOSED:    '#6b7280',
        }
        colour = colours.get(obj.status, '#6b7280')
        from django.utils.html import format_html
        return format_html(
            '<span style="color:{};font-weight:600;">{}</span>',
            colour,
            obj.get_status_display(),
        )

    # ── Bulk actions ───────────────────────────────────────────────────────────
    @admin.action(description='Mark selected as Contacted')
    def mark_as_contacted(self, request, queryset):
        updated = queryset.filter(
            status=ContactRequest.Status.NEW
        ).update(status=ContactRequest.Status.CONTACTED)
        self.message_user(request, f'{updated} request(s) marked as Contacted.')

    @admin.action(description='Mark selected as Closed')
    def mark_as_closed(self, request, queryset):
        updated = queryset.exclude(
            status=ContactRequest.Status.CLOSED
        ).update(status=ContactRequest.Status.CLOSED)
        self.message_user(request, f'{updated} request(s) marked as Closed.')

    @admin.action(description='Export selected to CSV')
    def export_as_csv(self, request, queryset):
        timestamp = timezone.now().strftime('%Y%m%d_%H%M')
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            f'attachment; filename="contact_requests_{timestamp}.csv"'
        )
        writer = csv.writer(response)
        writer.writerow([
            'ID', 'Date', 'Full Name', 'Email', 'Phone',
            'Company', 'Subject', 'Message', 'Status',
        ])
        for obj in queryset.order_by('-created_at'):
            writer.writerow([
                obj.pk,
                obj.created_at.strftime('%Y-%m-%d %H:%M'),
                obj.full_name,
                obj.email,
                obj.phone,
                obj.company_name or '',
                obj.subject,
                obj.message,
                obj.get_status_display(),
            ])
        return response

from django.db import models
from apps.core.models import TimeStampedModel


class DemoRequest(TimeStampedModel):
    """
    Stores a submission from the public Request a Demo form.

    A prospect provides their contact details and the Accetraa product they
    want to see demonstrated. The sales team follows up to schedule the demo.

    Phase 1 scope: capture, store, notify, and track status.
    No calendar integration, video conferencing, or CRM.

    Table: demo_requests_demorequest
    """

    class Status(models.TextChoices):
        NEW            = 'new',       'New'
        CONTACTED      = 'contacted', 'Contacted'
        DEMO_SCHEDULED = 'scheduled', 'Demo Scheduled'
        DEMO_COMPLETED = 'completed', 'Demo Completed'
        CLOSED         = 'closed',    'Closed'

    # ── Submitted fields (never modified after creation) ──────────────────────
    full_name = models.CharField(
        max_length=150,
        help_text='Full name of the person requesting the demo.',
    )
    email = models.EmailField(
        help_text='Contact email address.',
    )
    phone = models.CharField(
        max_length=30,
        help_text='Contact phone number.',
    )
    company_name = models.CharField(
        max_length=150,
        help_text='Company or organisation name.',
    )
    job_title = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        help_text='Job title or role of the requester (optional).',
    )
    product_interest = models.CharField(
        max_length=150,
        help_text='The Accetraa product the prospect wants to see demonstrated.',
    )
    company_size = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text='Approximate number of employees at the prospect company (optional).',
    )
    message = models.TextField(
        help_text='Additional context, specific use cases, or questions from the prospect.',
    )

    # ── Admin-managed fields ───────────────────────────────────────────────────
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.NEW,
        db_index=True,
        help_text=(
            'Tracks the demo lifecycle. '
            'New → Contacted → Demo Scheduled → Demo Completed | Closed.'
        ),
    )

    # ── System fields ──────────────────────────────────────────────────────────
    ip_address = models.GenericIPAddressField(
        blank=True,
        null=True,
        help_text='Submitter IP address. Used for rate limiting and spam detection.',
    )
    user_agent = models.TextField(
        blank=True,
        null=True,
        help_text='Browser/device user agent string. Used for spam investigation.',
    )

    class Meta:
        verbose_name        = 'Demo Request'
        verbose_name_plural = 'Demo Requests'
        ordering            = ['-created_at']

    def __str__(self):
        return (
            f'{self.full_name} ({self.company_name}) '
            f'— {self.product_interest} [{self.get_status_display()}]'
        )

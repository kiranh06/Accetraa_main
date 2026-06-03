from django.db import models
from apps.core.models import TimeStampedModel


class ConsultationRequest(TimeStampedModel):
    """
    Stores a submission from the public Request Consultation form.

    A prospect provides their contact details and the service they are
    interested in. The sales team then follows up to schedule and deliver
    the consultation.

    Phase 1 scope: capture, store, notify, and track status.
    No calendar, scheduler, video conferencing, or CRM integration.

    Table: consultation_consultationrequest
    """

    class Status(models.TextChoices):
        NEW       = 'new',       'New'
        SCHEDULED = 'scheduled', 'Scheduled'
        COMPLETED = 'completed', 'Completed'
        CLOSED    = 'closed',    'Closed'

    # ── Submitted fields (never modified after creation) ──────────────────────
    full_name = models.CharField(
        max_length=150,
        help_text='Full name of the person requesting the consultation.',
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
    service_interest = models.CharField(
        max_length=150,
        help_text='The Accetraa service the prospect is interested in discussing.',
    )
    message = models.TextField(
        help_text='Additional context or specific questions from the prospect.',
    )

    # ── Admin-managed fields ───────────────────────────────────────────────────
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.NEW,
        db_index=True,
        help_text=(
            'Tracks the consultation lifecycle. '
            'New → Scheduled (call booked) → Completed (delivered) | Closed (cancelled/not qualified).'
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
        verbose_name        = 'Consultation Request'
        verbose_name_plural = 'Consultation Requests'
        ordering            = ['-created_at']

    def __str__(self):
        return f'{self.full_name} ({self.company_name}) — {self.service_interest} [{self.get_status_display()}]'

from django.db import models
from apps.core.models import TimeStampedModel


class ContactRequest(TimeStampedModel):
    """
    Stores a submission from the public Contact Us form.

    Phase 1 scope: capture, store, notify, and manage status.
    No ticketing, CRM integration, assignment, or chat.

    Table: contact_contactrequest
    """

    class Status(models.TextChoices):
        NEW       = 'new',       'New'
        CONTACTED = 'contacted', 'Contacted'
        CLOSED    = 'closed',    'Closed'

    # ── Submitted fields (never modified after creation) ──────────────────────
    full_name = models.CharField(
        max_length=150,
        help_text='Submitter full name.',
    )
    email = models.EmailField(
        help_text='Submitter email address.',
    )
    phone = models.CharField(
        max_length=30,
        help_text='Submitter phone number.',
    )
    company_name = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        help_text='Company or organisation name (optional).',
    )
    subject = models.CharField(
        max_length=255,
        help_text='Brief subject of the enquiry.',
    )
    message = models.TextField(
        help_text='Full message from the submitter.',
    )

    # ── Admin-managed fields ───────────────────────────────────────────────────
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.NEW,
        db_index=True,
        help_text='Tracks the follow-up status of this contact request.',
    )

    # ── System fields ──────────────────────────────────────────────────────────
    ip_address = models.GenericIPAddressField(
        blank=True,
        null=True,
        help_text='IP address of the submitter. Used for rate limiting and spam detection.',
    )
    user_agent = models.TextField(
        blank=True,
        null=True,
        help_text='Browser/device user agent string captured at submission time. Used for spam investigation.',
    )

    class Meta:
        verbose_name        = 'Contact Request'
        verbose_name_plural = 'Contact Requests'
        ordering            = ['-created_at']

    def __str__(self):
        return f'{self.full_name} — {self.subject} ({self.get_status_display()})'

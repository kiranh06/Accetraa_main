"""
Signal handlers for the consultation app.
Registered via ConsultationConfig.ready() in apps.py.

Fires on ConsultationRequest creation only — not on status updates.
Phase 2: replace with Celery tasks for async delivery.
"""
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import ConsultationRequest
from .email import send_consultation_notification, send_consultation_acknowledgement


@receiver(post_save, sender=ConsultationRequest)
def on_consultation_request_created(sender, instance, created, **kwargs):
    """Send both emails only when a new request is first created."""
    if not created:
        return

    send_consultation_notification(instance)
    send_consultation_acknowledgement(instance)

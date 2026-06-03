"""
Django signal handlers for the contact app.
Registered in ContactConfig.ready() inside apps.py.

On ContactRequest creation:
  1. Notify the internal team (send_contact_notification)
  2. Send acknowledgement to the submitter (send_contact_acknowledgement)

Both emails are sent synchronously in Phase 1.
Phase 2: replace with a Celery task for non-blocking async delivery.
"""
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import ContactRequest
from .email import send_contact_notification, send_contact_acknowledgement


@receiver(post_save, sender=ContactRequest)
def on_contact_request_created(sender, instance, created, **kwargs):
    """Fire email notifications only on initial creation, not on status updates."""
    if not created:
        return

    send_contact_notification(instance)
    send_contact_acknowledgement(instance)

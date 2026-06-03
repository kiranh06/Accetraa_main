"""
Signal handlers for the demo_requests app.
Registered via DemoRequestsConfig.ready() in apps.py.

Fires on DemoRequest creation only — not on status updates.
Phase 2: replace with Celery tasks for async delivery.
"""
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import DemoRequest
from .email import send_demo_request_notification, send_demo_request_acknowledgement


@receiver(post_save, sender=DemoRequest)
def on_demo_request_created(sender, instance, created, **kwargs):
    """Send both emails only when a new request is first created."""
    if not created:
        return

    send_demo_request_notification(instance)
    send_demo_request_acknowledgement(instance)

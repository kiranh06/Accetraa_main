"""
Email notification helpers for the contact app.

In development: emails are printed to the console (EMAIL_BACKEND = console).
In production:  emails are sent via AWS SES (EMAIL_BACKEND = django_ses.SESBackend).

Both functions are called from signals.py after a ContactRequest is saved.
"""
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_contact_notification(contact_request):
    """
    Notify the internal team that a new contact request has been submitted.
    Sent to: settings.SALES_EMAIL (or CONTACT_EMAIL if defined).
    """
    recipient = getattr(settings, 'CONTACT_EMAIL', settings.SALES_EMAIL)

    subject = f'[New Contact] {contact_request.subject} — {contact_request.full_name}'

    body = (
        f'A new contact request has been submitted on the Accetraa website.\n\n'
        f'Name:    {contact_request.full_name}\n'
        f'Email:   {contact_request.email}\n'
        f'Phone:   {contact_request.phone}\n'
        f'Company: {contact_request.company_name or "—"}\n'
        f'Subject: {contact_request.subject}\n\n'
        f'Message:\n{contact_request.message}\n\n'
        f'---\n'
        f'Submitted: {contact_request.created_at.strftime("%d %b %Y, %I:%M %p")}\n'
        f'IP Address: {contact_request.ip_address or "Unknown"}\n'
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient],
            fail_silently=False,
        )
    except Exception:
        logger.exception(
            'Failed to send contact notification email for ContactRequest id=%s',
            contact_request.pk,
        )


def send_contact_acknowledgement(contact_request):
    """
    Send an acknowledgement email to the person who submitted the contact form.
    Reassures the visitor that their message was received.
    """
    subject = f'We received your message — {contact_request.subject}'

    body = (
        f'Hi {contact_request.full_name},\n\n'
        f'Thank you for reaching out to Accetraa Technologies.\n\n'
        f'We have received your message and will get back to you within '
        f'2 business days.\n\n'
        f'Your message summary:\n'
        f'Subject: {contact_request.subject}\n'
        f'Message: {contact_request.message[:200]}{"..." if len(contact_request.message) > 200 else ""}\n\n'
        f'If your enquiry is urgent, please email us directly at {settings.DEFAULT_FROM_EMAIL}.\n\n'
        f'Best regards,\n'
        f'The Accetraa Technologies Team\n'
        f'https://accetraa.com\n'
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact_request.email],
            fail_silently=False,
        )
    except Exception:
        logger.exception(
            'Failed to send contact acknowledgement email for ContactRequest id=%s',
            contact_request.pk,
        )

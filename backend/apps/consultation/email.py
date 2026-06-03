"""
Email notification helpers for the consultation app.

Development: printed to console (EMAIL_BACKEND = console).
Production:  sent via AWS SES (EMAIL_BACKEND = django_ses.SESBackend).
"""
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_consultation_notification(consultation_request):
    """
    Notify the sales team of a new consultation request.
    Sent to: settings.SALES_EMAIL
    """
    subject = (
        f'[New Consultation] {consultation_request.service_interest} — '
        f'{consultation_request.full_name} ({consultation_request.company_name})'
    )

    body = (
        f'A new consultation request has been submitted on the Accetraa website.\n\n'
        f'Name:             {consultation_request.full_name}\n'
        f'Company:          {consultation_request.company_name}\n'
        f'Email:            {consultation_request.email}\n'
        f'Phone:            {consultation_request.phone}\n'
        f'Service Interest: {consultation_request.service_interest}\n\n'
        f'Message:\n{consultation_request.message}\n\n'
        f'---\n'
        f'Submitted: {consultation_request.created_at.strftime("%d %b %Y, %I:%M %p")}\n'
        f'IP Address: {consultation_request.ip_address or "Unknown"}\n'
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.SALES_EMAIL],
            fail_silently=False,
        )
    except Exception:
        logger.exception(
            'Failed to send consultation notification email for ConsultationRequest id=%s',
            consultation_request.pk,
        )


def send_consultation_acknowledgement(consultation_request):
    """
    Send an acknowledgement email to the prospect.
    Confirms their request was received and sets response expectations.
    """
    subject = f'We received your consultation request — Accetraa Technologies'

    body = (
        f'Hi {consultation_request.full_name},\n\n'
        f'Thank you for your interest in Accetraa Technologies.\n\n'
        f'We have received your consultation request for '
        f'"{consultation_request.service_interest}" and our team will '
        f'get in touch within 1 business day to schedule a session.\n\n'
        f'Your request summary:\n'
        f'Service: {consultation_request.service_interest}\n'
        f'Message: {consultation_request.message[:200]}'
        f'{"..." if len(consultation_request.message) > 200 else ""}\n\n'
        f'If you have any urgent questions, please contact us at '
        f'{settings.DEFAULT_FROM_EMAIL}.\n\n'
        f'Best regards,\n'
        f'The Accetraa Technologies Team\n'
        f'https://accetraa.com\n'
    )

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[consultation_request.email],
            fail_silently=False,
        )
    except Exception:
        logger.exception(
            'Failed to send consultation acknowledgement email for ConsultationRequest id=%s',
            consultation_request.pk,
        )

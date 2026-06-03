"""
Email notification helpers for the demo_requests app.

Development: printed to console (EMAIL_BACKEND = console).
Production:  sent via AWS SES (EMAIL_BACKEND = django_ses.SESBackend).
"""
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_demo_request_notification(demo_request):
    """
    Notify the sales team of a new demo request.
    Sent to: settings.SALES_EMAIL
    """
    subject = (
        f'[New Demo Request] {demo_request.product_interest} — '
        f'{demo_request.full_name} ({demo_request.company_name})'
    )

    body = (
        f'A new demo request has been submitted on the Accetraa website.\n\n'
        f'Name:             {demo_request.full_name}\n'
        f'Company:          {demo_request.company_name}\n'
        f'Email:            {demo_request.email}\n'
        f'Phone:            {demo_request.phone}\n'
        f'Job Title:        {demo_request.job_title or "—"}\n'
        f'Product Interest: {demo_request.product_interest}\n'
        f'Company Size:     {demo_request.company_size or "—"}\n\n'
        f'Message:\n{demo_request.message}\n\n'
        f'---\n'
        f'Submitted: {demo_request.created_at.strftime("%d %b %Y, %I:%M %p")}\n'
        f'IP Address: {demo_request.ip_address or "Unknown"}\n'
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
            'Failed to send demo request notification email for DemoRequest id=%s',
            demo_request.pk,
        )


def send_demo_request_acknowledgement(demo_request):
    """
    Send an acknowledgement email to the prospect.
    Confirms their request was received and sets response expectations.
    """
    subject = 'We received your demo request — Accetraa Technologies'

    body = (
        f'Hi {demo_request.full_name},\n\n'
        f'Thank you for your interest in Accetraa Technologies.\n\n'
        f'We have received your request for a demonstration of '
        f'"{demo_request.product_interest}" and our team will '
        f'get in touch within 1 business day to arrange your session.\n\n'
        f'Your request summary:\n'
        f'Product: {demo_request.product_interest}\n'
        f'Message: {demo_request.message[:200]}'
        f'{"..." if len(demo_request.message) > 200 else ""}\n\n'
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
            recipient_list=[demo_request.email],
            fail_silently=False,
        )
    except Exception:
        logger.exception(
            'Failed to send demo request acknowledgement email for DemoRequest id=%s',
            demo_request.pk,
        )

from rest_framework.throttling import AnonRateThrottle


class ContactFormThrottle(AnonRateThrottle):
    """Limits contact form submissions to 3 per hour per IP."""
    scope = 'contact_form'


class ConsultationFormThrottle(AnonRateThrottle):
    """Limits consultation requests to 3 per hour per IP."""
    scope = 'consultation_form'


class DemoFormThrottle(AnonRateThrottle):
    """Limits demo requests to 3 per hour per IP."""
    scope = 'demo_form'

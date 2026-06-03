from django.apps import AppConfig


class ConsultationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name  = 'apps.consultation'
    label = 'consultation'
    verbose_name = 'Consultation'

    def ready(self):
        """Register signal handlers when the app is fully loaded."""
        import apps.consultation.signals  # noqa: F401

from django.apps import AppConfig


class ContactConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name  = 'apps.contact'
    label = 'contact'
    verbose_name = 'Contact'

    def ready(self):
        """Register signal handlers when the app is fully loaded."""
        import apps.contact.signals  # noqa: F401

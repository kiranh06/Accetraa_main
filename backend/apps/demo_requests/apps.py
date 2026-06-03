from django.apps import AppConfig


class DemoRequestsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name  = 'apps.demo_requests'
    label = 'demo_requests'
    verbose_name = 'Demo Requests'

    def ready(self):
        """Register signal handlers when the app is fully loaded."""
        import apps.demo_requests.signals  # noqa: F401

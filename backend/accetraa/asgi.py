"""
ASGI config for Accetraa project.
Exposes the ASGI callable as a module-level variable named ``application``.
Reserved for future async / WebSocket support.
"""
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'accetraa.settings.production')
application = get_asgi_application()

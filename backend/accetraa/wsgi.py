"""
WSGI config for Accetraa project.
Exposes the WSGI callable as a module-level variable named ``application``.
Used by Gunicorn in production: gunicorn accetraa.wsgi:application
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'accetraa.settings.production')
application = get_wsgi_application()

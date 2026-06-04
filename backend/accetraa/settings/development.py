"""
Development settings.
Usage: DJANGO_SETTINGS_MODULE=accetraa.settings.development
"""
from .base import *  # noqa: F401, F403
from decouple import config

# ── Debug ──────────────────────────────────────────────────────────────────────
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# ── Database — local MySQL ─────────────────────────────────────────────────────
DATABASES = {
    'default': {
        'ENGINE':   'django.db.backends.mysql',
        'NAME':     config('DB_NAME'),
        'USER':     config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST':     config('DB_HOST', default='localhost'),
        'PORT':     config('DB_PORT', default='3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        'CONN_MAX_AGE': 60,
    }
}

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow all origins in development so the React Vite dev server (any port) can connect.
CORS_ALLOW_ALL_ORIGINS = True

# ── Email ──────────────────────────────────────────────────────────────────────
# Prints emails to the console instead of sending them.
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# ── DRF — add browsable API renderer in development ───────────────────────────
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [  # noqa: F405
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]

# ── Media files ────────────────────────────────────────────────────────────────
# Served locally by Django dev server (handled by urls.py static() call).
# No S3 in development.

# ── Logging ───────────────────────────────────────────────────────────────────
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {
            'format': '[{levelname}] {name}: {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'WARNING',  # Set to DEBUG to see all SQL queries
            'propagate': False,
        },
    },
}

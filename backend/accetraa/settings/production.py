"""
Production settings.
Usage: DJANGO_SETTINGS_MODULE=accetraa.settings.production
All sensitive values MUST be set via environment variables — never hardcoded here.
"""
from .base import *  # noqa: F401, F403
from decouple import config

# ── Database — AWS RDS MySQL ───────────────────────────────────────────────────
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

# ── Security ───────────────────────────────────────────────────────────────────
DEBUG = False
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [h.strip() for h in v.split(',')])

# Django security hardening
SECURE_HSTS_SECONDS           = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD            = True
SECURE_SSL_REDIRECT            = True
SESSION_COOKIE_SECURE          = True
CSRF_COOKIE_SECURE             = True
SECURE_CONTENT_TYPE_NOSNIFF    = True
X_FRAME_OPTIONS                = 'DENY'

# ── Email — AWS SES ────────────────────────────────────────────────────────────
EMAIL_BACKEND       = 'django_ses.SESBackend'
AWS_SES_REGION_NAME = config('AWS_SES_REGION_NAME', default='ap-south-1')

# ── File Storage — AWS S3 ──────────────────────────────────────────────────────
DEFAULT_FILE_STORAGE   = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID      = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY  = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_S3_BUCKET_NAME')
AWS_S3_REGION_NAME     = config('AWS_S3_REGION_NAME', default='ap-south-1')
AWS_S3_FILE_OVERWRITE  = False
AWS_DEFAULT_ACL        = None  # Use bucket ACL; do not make files publicly readable by default
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',  # 1 day cache for media files
}

_cloudfront_domain = config('AWS_CLOUDFRONT_DOMAIN', default='')
if _cloudfront_domain:
    MEDIA_URL = f'https://{_cloudfront_domain}/'
    AWS_S3_CUSTOM_DOMAIN = _cloudfront_domain

# ── DRF — JSON only in production ─────────────────────────────────────────────
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [  # noqa: F405
    'rest_framework.renderers.JSONRenderer',
]

# ── Logging ───────────────────────────────────────────────────────────────────
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'json': {
            'format': '{"time": "%(asctime)s", "level": "%(levelname)s", "name": "%(name)s", "message": "%(message)s"}',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'json',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'apps': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

"""
Base settings shared across all environments.
Do NOT use this file directly — import from development.py or production.py.
"""
from pathlib import Path
from decouple import config, Csv

# ── Paths ──────────────────────────────────────────────────────────────────────
# BASE_DIR → backend/
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# ── Security ───────────────────────────────────────────────────────────────────
SECRET_KEY = config('DJANGO_SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=Csv())


# ── Application Definition ─────────────────────────────────────────────────────
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    # 'rest_framework_simplejwt',  ← PHASE 2: Uncomment when React Admin Panel is built.
    'corsheaders',
]

LOCAL_APPS = [
    'apps.core',
    'apps.services',
    'apps.products',
    'apps.portfolio',
    'apps.contact',
    'apps.consultation',
    'apps.demo_requests',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


# ── Middleware ─────────────────────────────────────────────────────────────────
# CorsMiddleware must be placed before CommonMiddleware.
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# ── URL & WSGI ─────────────────────────────────────────────────────────────────
ROOT_URLCONF = 'accetraa.urls'
WSGI_APPLICATION = 'accetraa.wsgi.application'


# ── Templates ──────────────────────────────────────────────────────────────────
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# ── Database ───────────────────────────────────────────────────────────────────
# Reads connection details from environment variables.
# Override in development.py / production.py if needed.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
            # Enforce strict SQL mode — prevents silent data truncation.
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        'CONN_MAX_AGE': 60,
    }
}


# ── Password Validation ────────────────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ── Internationalisation ───────────────────────────────────────────────────────
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True


# ── Static & Media Files ───────────────────────────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Development: files stored in backend/media/
# Production: overridden in production.py to use AWS S3
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# ── Default Primary Key ────────────────────────────────────────────────────────
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ── Django REST Framework ──────────────────────────────────────────────────────
REST_FRAMEWORK = {
    # ── Phase 1: Session + Basic authentication ────────────────────────────────
    # SessionAuthentication  → powers the browsable API in development
    # BasicAuthentication    → allows curl/Postman testing with username:password
    #
    # ── Phase 2 change ────────────────────────────────────────────────────────
    # When the React Admin Panel is built, add JWTAuthentication:
    #   'rest_framework_simplejwt.authentication.JWTAuthentication',
    # and uncomment SIMPLE_JWT settings below.
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    # Public by default; admin ViewSets override with IsStaffUser (Phase 2).
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon':              '100/hour',   # general public API rate
        'contact_form':      '3/hour',
        'consultation_form': '3/hour',
        'demo_form':         '3/hour',
    },
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',  # required for file uploads (resume)
        'rest_framework.parsers.FormParser',
    ],
}


# ── PHASE 2 — JWT Configuration ────────────────────────────────────────────────
# Uncomment this entire block when djangorestframework-simplejwt is re-added
# and the React Admin Panel authentication is implemented.
#
# from datetime import timedelta
#
# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME':  timedelta(hours=1),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
#     'ROTATE_REFRESH_TOKENS':  False,
#     'AUTH_HEADER_TYPES':      ('Bearer',),
#     'AUTH_HEADER_NAME':       'HTTP_AUTHORIZATION',
# }
# ──────────────────────────────────────────────────────────────────────────────


# ── CORS ──────────────────────────────────────────────────────────────────────
# Specific origins set here; development.py may override with CORS_ALLOW_ALL_ORIGINS.
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:5173',
    cast=Csv(),
)
CORS_ALLOW_CREDENTIALS = False
CORS_ALLOW_METHODS = ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT']
CORS_ALLOW_HEADERS = ['accept', 'authorization', 'content-type', 'origin', 'x-requested-with']


# ── Email ──────────────────────────────────────────────────────────────────────
# Backend is overridden per environment.
EMAIL_BACKEND = config(
    'EMAIL_BACKEND',
    default='django.core.mail.backends.console.EmailBackend',
)
DEFAULT_FROM_EMAIL = config('EMAIL_FROM', default='no-reply@accetraa.com')
SALES_EMAIL       = config('SALES_EMAIL', default='sales@accetraa.com')
HR_EMAIL          = config('HR_EMAIL',    default='hr@accetraa.com')


# ── Admin Site Branding ────────────────────────────────────────────────────────
ADMIN_SITE_HEADER = 'Accetraa Technologies'
ADMIN_SITE_TITLE  = 'Accetraa Admin'
ADMIN_INDEX_TITLE = 'Website Administration'

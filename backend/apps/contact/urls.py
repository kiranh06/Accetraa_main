"""
Public URL patterns for the contact app.
Included by root urls.py at: path('api/v1/', include('apps.contact.urls'))

Resulting public endpoint:
  POST /api/v1/contact/   → Submit a contact request (rate-limited, validation enforced)
"""
from django.urls import path
from .views import ContactCreateView

urlpatterns = [
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
]

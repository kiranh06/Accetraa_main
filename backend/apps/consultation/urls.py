"""
Public URL patterns for the consultation app.
Included by root urls.py at: path('api/v1/', include('apps.consultation.urls'))

Resulting public endpoint:
  POST /api/v1/consultation/   → Submit a consultation request (rate-limited, validated)
"""
from django.urls import path
from .views import ConsultationCreateView

urlpatterns = [
    path('consultation/', ConsultationCreateView.as_view(), name='consultation-create'),
]

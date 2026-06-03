"""
Public URL patterns for the demo_requests app.
Included by root urls.py at: path('api/v1/', include('apps.demo_requests.urls'))

Resulting public endpoint:
  POST /api/v1/demo-requests/   → Submit a demo request (rate-limited, validated)
"""
from django.urls import path
from .views import DemoRequestCreateView

urlpatterns = [
    path('demo-requests/', DemoRequestCreateView.as_view(), name='demo-request-create'),
]

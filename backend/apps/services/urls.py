"""
Public URL patterns for the services app.
Included by root urls.py at: path('api/v1/', include('apps.services.urls'))

Resulting public endpoint:
  GET /api/v1/services/  → ServiceListView
"""
from django.urls import path
from .views import ServiceListView

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='service-list'),
]

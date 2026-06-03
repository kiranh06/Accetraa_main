from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import connection, OperationalError


class HealthCheckView(APIView):
    """
    GET /api/v1/health/
    Public endpoint used by uptime monitors.
    Returns 200 OK when the application and database are healthy.
    Returns 503 when the database is unreachable.
    """
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        db_status = 'ok'
        try:
            connection.ensure_connection()
        except OperationalError:
            db_status = 'error'

        overall = 'ok' if db_status == 'ok' else 'degraded'
        http_status = 200 if overall == 'ok' else 503

        return Response(
            {
                'status':   overall,
                'version':  '1.0.0',
                'checks': {
                    'database': db_status,
                },
            },
            status=http_status,
        )

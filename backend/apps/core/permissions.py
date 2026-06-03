from rest_framework.permissions import BasePermission


class IsStaffUser(BasePermission):
    """
    Grants access only to authenticated Django staff users (is_staff=True).
    Applied to all admin-facing API endpoints.
    """
    message = 'Admin access required. Please authenticate with a staff account.'

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )

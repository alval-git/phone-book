from rest_framework.permissions import BasePermission
from ..models import AdminProfile, DepartmentInOrganisation
from django.shortcuts import get_object_or_404

SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')

class isAdminForOrganisationOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        else:
            admin_profile = get_object_or_404(AdminProfile,user=request.user)
            organisation_department_id = request.data.get("organisation_department")
            organisation_in_request = get_object_or_404(DepartmentInOrganisation, id=organisation_department_id).organisation.id
            for org in admin_profile.organisations.all():
                if org.id == organisation_in_request:
                    return True
    
            return False
from django.urls import path
from .api_views import EmpInOrgDepApiView, EmpApiView, OrganisationsApiListView, DepInOrgListView, DepartmentsListView


urlpatterns = [
    path('employee/', EmpApiView.as_view(), name="employee"),
    path('employee-in-department/', EmpInOrgDepApiView.as_view(), name="create_emp_in_org_dep"),
    path('organisations/', OrganisationsApiListView.as_view(), name="organisations"),
    path('organisation/departments/', DepInOrgListView.as_view(), name="dep_in_org" ),
    path('departments/', DepartmentsListView.as_view(), name="departments_list"),
    
]


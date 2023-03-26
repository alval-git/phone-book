from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions, status
from .permissions import isAdminForOrganisationOrReadOnly
from .serializers import EmployeeSerializer, EmpInOrgDepSerializer, OrganisationsListSerializer, DepInOrgListSerializer,\
                         DepartmentsListSerializer
from ..models import Organisation, DepartmentInOrganisation, Department, Employee, EmployeeInOrganisationDepartment

class EmpApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        emp_serializer = EmployeeSerializer(data=request.data)
		
        if emp_serializer.is_valid():
            employee = emp_serializer.save()
            if employee:
                json = emp_serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
            return Response(emp_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format='json'):
        snippets = Employee.objects.all()
        serializer = EmployeeSerializer(snippets, many=True)
        return Response(serializer.data)


class EmpInOrgDepApiView(APIView):
    permission_classes = (isAdminForOrganisationOrReadOnly,)

    def post(self, request, format='json'):
        serializer = EmpInOrgDepSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            employee = serializer.save()
            if employee:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, format='json'):
        snippets = EmployeeInOrganisationDepartment.objects.all()
        serializer = EmpInOrgDepSerializer(snippets, many=True)
        return Response(serializer.data)

    
class OrganisationsApiListView(ListAPIView):
    serializer_class = OrganisationsListSerializer
    queryset = Organisation.objects.all()
    permission_classes = (permissions.AllowAny,)


class DepInOrgListView(ListAPIView):
    serializer_class = DepInOrgListSerializer
    queryset = DepartmentInOrganisation.objects.all()
    permission_classes = (permissions.AllowAny,)


class DepartmentsListView(ListAPIView):
    serializer_class = DepartmentsListSerializer
    queryset = Department.objects.all()
    permission_classes = (permissions.AllowAny,)

    
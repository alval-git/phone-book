from rest_framework import serializers

from ..models import Employee, EmployeeInOrganisationDepartment, DepartmentInOrganisation, Organisation, Department, AdditionalInfo


class AdditioanalInfoSerializer(serializers.ModelSerializer):
    address = serializers.CharField(max_length=120)
    post_code = serializers.CharField(max_length=6)
    amts_code = serializers.CharField(max_length=4)

    class Meta:
        model = AdditionalInfo
        fields = ['address', 'post_code', 'amts_code']              


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30, required=True)
    surname = serializers.CharField(max_length=30, required=True)
    second_name = serializers.CharField(max_length=30, required=True)
    landline = serializers.CharField(max_length=20, required=False)
    mob_phone = serializers.CharField(max_length=20, required=True)
    email = serializers.CharField(max_length=60, required=False)


    class Meta:
        model = Employee
        fields = ('name', 'surname', 'second_name', 'landline', 'mob_phone', 'email', 'id')

        def create(self, validated_data):
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance





class OrganisationsListSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    ministry = serializers.PrimaryKeyRelatedField(read_only=True)
    name_of_organisation = serializers.CharField(max_length=90)
    additional_info = AdditioanalInfoSerializer(read_only=True)
    general_organisation = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Organisation
        fields = ('ministry', 'name_of_organisation', 'additional_info', 'general_organisation', 'id')


class DepartmentsListSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name_of_department = serializers.CharField(max_length=90)

    class Meta:
        model = Department
        fields = ('id', 'name_of_department')


class DepInOrgListSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    organisation = OrganisationsListSerializer(read_only=True)
    department = DepartmentsListSerializer(read_only=True)
    
    class Meta:
        model = DepartmentInOrganisation
        fields = ('id', 'organisation', 'department')


class EmpInOrgDepSerializer(serializers.ModelSerializer):
    # organisation_department = DepInOrgListSerializer(read_only=False)
    # employee = EmployeeSerializer(read_only=False)

    class Meta:
        model = EmployeeInOrganisationDepartment
        fields = ('organisation_department', 'employee')

        
        
        def to_representation(self, instance):
            response = super().to_representation(instance)
            response['organisation_department'] = DepInOrgListSerializer(instance.department).data
            response['employee'] = EmployeeSerializer(instance.employee).data
            return response
        

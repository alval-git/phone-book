from django.contrib import admin

from .models import AdditionalInfo, Employee, Organisation, Ministry, Department, EmployeeInOrganisationDepartment, \
    DepartmentInOrganisation, AdminProfile


# Register your models here.
@admin.register(AdditionalInfo)
class AddInfoAdmin(admin.ModelAdmin):
    pass


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass


@admin.register(Organisation)
class OrganisationAdmin(admin.ModelAdmin):
    pass


@admin.register(Ministry)
class MinistryAdmin(admin.ModelAdmin):
    pass


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    pass


@admin.register(DepartmentInOrganisation)
class DepartmentOrganisationAdmin(admin.ModelAdmin):
    pass


@admin.register(EmployeeInOrganisationDepartment)
class EmployeeInOrgDepartmentAdmin(admin.ModelAdmin):
    pass

@admin.register(AdminProfile)
class EmployeeInOrgDepartmentAdmin(admin.ModelAdmin):
    pass
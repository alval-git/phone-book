from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.
class AdditionalInfo(models.Model):
    address = models.CharField(max_length=120, blank=True)
    post_code = models.CharField(blank=True, max_length=6)
    amts_code = models.CharField(blank=True, max_length=4)

    def __str__(self):
        return ''' {} {} {} '''.format(self.address, self.post_code, self.amts_code)


class Department(models.Model):
    name_of_department = models.CharField(max_length=90)

    def __str__(self):
        return self.name_of_department


class Ministry(models.Model):
    name_of_ministry = models.CharField(max_length=90)

    def __str__(self):
        return self.name_of_ministry


class Organisation(models.Model):
    ministry = models.ForeignKey(Ministry, on_delete=models.CASCADE)
    name_of_organisation = models.CharField(max_length=90)
    additional_info = models.ForeignKey(AdditionalInfo, on_delete=models.SET_NULL, null=True)
    general_organisation = models.ForeignKey('Organisation', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name_of_organisation
    


class Employee(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    landline = models.CharField(max_length=20)
    mob_phone = models.CharField(max_length=20)
    email = models.CharField(max_length=60, null=True, blank=True)

    def __str__(self):
        return '''{} {} {} {} '''.format(self.id,self.surname, self.name, self.second_name)


class DepartmentInOrganisation(models.Model):
    organisation = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return ''' {} {} {}  '''.format(self.organisation.name_of_organisation,
                                        self.department.name_of_department, self.id)


class EmployeeInOrganisationDepartment(models.Model):
    organisation_department = models.ForeignKey(DepartmentInOrganisation, on_delete=models.CASCADE,  )
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, )

    class Meta:
        unique_together = ["employee", "organisation_department"]

    def __str__(self):
        return ''' {} {} {}  '''.format(self.organisation_department.organisation.name_of_organisation,
                                        self.organisation_department.department.name_of_department, self.employee.surname)


class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')
    organisations = models.ManyToManyField(Organisation, blank=True)

    @receiver(post_save, sender=User, dispatch_uid="create_profile")
    def create_profile(sender, instance, **kwargs):
        if kwargs["created"]:
            AdminProfile.objects.create(user=instance)

    def __str__(self):
        return self.user.username
from django.db import models
from django.conf import settings
from django.utils import timezone
from assets.models import Asset

class Assignment(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_assigned = models.DateField(default=timezone.now)   # default for existing + new rows
    date_returned = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)  # default for existing + new rows
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Assignment"
        verbose_name_plural = "Assignments"
        ordering = ['date_assigned']

    def __str__(self):
        return f"{self.asset.name} -> {self.employee.username}"

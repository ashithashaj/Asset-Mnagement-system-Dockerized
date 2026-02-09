from django.db import models

class Asset(models.Model):
    STATUS_CHOICES = (
        ('Available', 'Available'),
        ('Assigned', 'Assigned'),
        ('Under Repair', 'Under Repair'),
        ('Retired', 'Retired'),
    )

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    purchase_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.serial_number})"

from django.db import models

class InventoryItem(models.Model):
    item_type = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    threshold = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.item_type} ({self.quantity})"

    def is_low_stock(self):
        return self.quantity <= self.threshold

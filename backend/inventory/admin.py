from django.contrib import admin
from .models import InventoryItem

@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('item_type', 'quantity', 'threshold', 'created_at')
    list_filter = ('item_type',)
    search_fields = ('item_type',)
    ordering = ('item_type',)

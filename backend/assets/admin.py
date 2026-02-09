from django.contrib import admin
from .models import Asset

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'serial_number', 'status', 'purchase_date')
    list_filter = ('status', 'type', 'purchase_date')
    search_fields = ('name', 'serial_number', 'type')
    ordering = ('name',)

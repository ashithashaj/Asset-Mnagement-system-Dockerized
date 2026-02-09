from django.contrib import admin
from .models import Assignment

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('asset', 'employee', 'date_assigned', 'date_returned')
    list_filter = ('date_assigned',)
    search_fields = ('asset__name', 'employee__username')
    ordering = ('date_assigned',)

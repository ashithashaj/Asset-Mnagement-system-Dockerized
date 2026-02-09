from django.contrib import admin
from .models import Ticket

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('asset', 'issue', 'status', 'assigned_technician', 'created_at')
    list_filter = ('status', 'assigned_technician')
    search_fields = ('asset__name', 'issue', 'assigned_technician__username')
    ordering = ('-created_at',)

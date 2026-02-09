from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    asset_name = serializers.CharField(source='asset.name', read_only=True)
    technician_name = serializers.CharField(source='assigned_technician.username', read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'

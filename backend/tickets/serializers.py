# tickets/serializers.py
from rest_framework import serializers
from .models import Ticket
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')  # include fields you need

class TicketSerializer(serializers.ModelSerializer):
    asset_name = serializers.CharField(source='asset.name', read_only=True)
    assigned_technician = UserSerializer(read_only=True)  # <-- nested object
    technician_name = serializers.CharField(source='assigned_technician.username', read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'

from rest_framework import viewsets, permissions, filters
from .models import Ticket
from .serializers import TicketSerializer
from django_filters.rest_framework import DjangoFilterBackend

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'assigned_technician', 'asset']
    search_fields = ['asset__name', 'issue', 'assigned_technician__username']
    ordering_fields = ['created_at', 'status']

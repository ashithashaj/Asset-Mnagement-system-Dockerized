from rest_framework import viewsets, permissions, filters
from .models import Assignment
from .serializers import AssignmentSerializer
from django_filters.rest_framework import DjangoFilterBackend

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all().order_by('-date_assigned')
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'employee__username', 'date_assigned', 'date_returned']
    search_fields = ['asset__name', 'employee__username']
    ordering_fields = ['date_assigned', 'date_returned', 'status']

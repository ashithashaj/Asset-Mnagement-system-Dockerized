from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Assignment
from .serializers import AssignmentSerializer

# ---------------- Assignment CRUD ---------------- #
class AssignmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Assignments.
    Supports full CRUD: list, retrieve, create, update, delete.
    Supports filtering, search, and ordering.
    """
    queryset = Assignment.objects.all().order_by('-date_assigned')
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Enable filtering, search, and ordering
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'employee__username', 'date_assigned', 'date_returned']
    search_fields = ['asset__name', 'employee__username']
    ordering_fields = ['date_assigned', 'date_returned', 'status']

    # Optional: override create to ensure correct response for frontend
    def create(self, request, *args, **kwargs):
        """
        Custom create method to handle POST properly and return serialized data.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)

    # Optional: override update to ensure PUT works with frontend
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

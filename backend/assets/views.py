from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from .models import Asset
from .serializers import AssetSerializer
from assignments.models import Assignment
from assignments.serializers import AssignmentSerializer
from tickets.models import Ticket
from tickets.serializers import TicketSerializer

# ---------------- Asset CRUD ---------------- #
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all().order_by('name')
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated]
    # You can add search, filter, ordering in future if needed

# ---------------- Dashboard API ---------------- #
class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Asset stats
        total_assets = Asset.objects.count()
        asset_status = Asset.objects.values('status').annotate(count=Count('id'))

        # Latest 5 assignments
        latest_assignments = Assignment.objects.order_by('-date_assigned')[:5]
        latest_assignments_serialized = AssignmentSerializer(latest_assignments, many=True).data

        # Latest 5 tickets
        latest_tickets = Ticket.objects.order_by('-created_at')[:5]
        latest_tickets_serialized = TicketSerializer(latest_tickets, many=True).data

        return Response({
            "stats": {
                "total_assets": total_assets,
                "asset_status": list(asset_status)
            },
            "latest_assignments": latest_assignments_serialized,
            "latest_tickets": latest_tickets_serialized
        })

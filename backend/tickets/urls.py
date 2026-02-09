from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet

router = DefaultRouter()
# Register at root so no extra 'tickets' in URL
router.register(r'', TicketViewSet, basename='tickets')

urlpatterns = [
    path('', include(router.urls)),
]

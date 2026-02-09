# inventory/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryItemViewSet

router = DefaultRouter()
# Register at root so no extra 'inventory' in URL
router.register(r'', InventoryItemViewSet, basename='inventory')

urlpatterns = [
    path('', include(router.urls)),
]

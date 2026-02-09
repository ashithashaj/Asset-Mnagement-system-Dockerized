# assets/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssetViewSet, DashboardAPIView

# Create router
router = DefaultRouter()
# Register AssetViewSet at root, so no extra 'assets' in URL
router.register(r'', AssetViewSet, basename='assets')

urlpatterns = [
    # Include all router URLs
    path('', include(router.urls)),

    # Dashboard API (optional)
    path('dashboard/', DashboardAPIView.as_view(), name='dashboard'),
]

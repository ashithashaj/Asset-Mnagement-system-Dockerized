from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssetViewSet, DashboardAPIView

router = DefaultRouter()
router.register(r'assets', AssetViewSet, basename='assets')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', DashboardAPIView.as_view(), name='dashboard'),
]

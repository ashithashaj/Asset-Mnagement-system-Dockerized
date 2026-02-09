from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssignmentViewSet

router = DefaultRouter()
# Register at root so the router does not add an extra 'assignments' in URL
router.register(r'', AssignmentViewSet, basename='assignments')

urlpatterns = [
    path('', include(router.urls)),
]

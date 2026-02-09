from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Optional: API docs using Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Asset Management API",
        default_version='v1',
        description="API documentation for Asset Management System",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Users + Auth
    path('api/', include('users.urls')),

    # Assets
    path('api/', include('assets.urls')),

    # Inventory
    path('api/', include('inventory.urls')),

    # Assignments
    path('api/', include('assignments.urls')),

    # Tickets
    path('api/', include('tickets.urls')),

    # Optional: Swagger docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

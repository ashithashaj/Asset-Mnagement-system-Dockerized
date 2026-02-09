from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Redirect root to admin
def home(request):
    return redirect('admin/')

# Swagger / API documentation
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
    # Root -> admin
    path('', home, name='home'),

    # Admin
    path('admin/', admin.site.urls),

    # API routes
    path('api/users/', include('users.urls')),
    path('api/assets/', include('assets.urls')),
    path('api/inventory/', include('inventory.urls')),
    path('api/assignments/', include('assignments.urls')),
    path('api/tickets/', include('tickets.urls')),

    # Swagger docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

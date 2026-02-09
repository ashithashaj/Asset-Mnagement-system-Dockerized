from django.urls import path
from .views import signup, login, UsersListAPIView

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('users/', UsersListAPIView.as_view(), name='users-list'),  # new
]

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

User = get_user_model()  # your custom user model or default User

# ---------------- SIGNUP ---------------- #
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get("username", "").strip()
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "").strip()

    if not username or not email or not password:
        return Response({"detail": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"detail": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"detail": "User created successfully."}, status=status.HTTP_201_CREATED)


# ---------------- LOGIN ---------------- #
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "").strip()

    if not email or not password:
        return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(password):
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "username": user.username,
        "email": user.email,
    }, status=status.HTTP_200_OK)


# ---------------- USERS LIST ---------------- #
# API to fetch all users (for dropdown in Tickets)
class UsersListAPIView(APIView):
    permission_classes = [IsAuthenticated]  # requires login

    def get(self, request):
        users = User.objects.all()
        # Only send id and username for dropdown
        users_data = [{"id": u.id, "username": u.username} for u in users]
        return Response(users_data)

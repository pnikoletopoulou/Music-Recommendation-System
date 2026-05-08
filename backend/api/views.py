from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import SavedVibe
from .serializers import SavedVibeSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_vibe(request):
    emotion = request.data.get('emotion')
    activity = request.data.get('activity')

    if emotion == "happy":
        predicted_genre = "Pop"
    elif emotion == "sad":
        predicted_genre = "Lo-fi"
    elif activity == "gym":
        predicted_genre = "EDM"
    else:
        predicted_genre = "Chill"

    return Response({
        "emotion": emotion,
        "activity": activity,
        "genre": predicted_genre,
        "message": f"Feeling {emotion}? Try some {predicted_genre}!"
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    User.objects.create_user(username=username, password=password)

    return Response({"message": "User created successfully"}, status=201)

class VibeViewSet(viewsets.ModelViewSet):
    serializer_class = SavedVibeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedVibe.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import SavedVibe
from .serializers import SavedVibeSerializer

GENRE_MAP = {
    ("happy",    "working out"):       "Pop-Punk",
    ("happy",    "studying"):          "Indie Pop",
    ("happy",    "relaxing at home"):  "Acoustic Pop",
    ("happy",    "going out"):         "Dance Pop",
    ("happy",    "driving"):           "Synth-Pop",
    ("sad",      "relaxing at home"):  "Lo-fi Hip Hop",
    ("sad",      "studying"):          "Ambient",
    ("sad",      "reading"):           "Classical",
    ("sad",      "driving"):           "Indie Folk",
    ("energetic","working out"):       "EDM",
    ("energetic","running"):           "Hip Hop",
    ("energetic","going out"):         "House",
    ("energetic","driving"):           "Rock",
    ("calm",     "studying"):          "Lo-fi",
    ("calm",     "reading"):           "Jazz",
    ("calm",     "falling asleep"):    "Ambient",
    ("calm",     "relaxing at home"):  "Chillout",
    ("focused",  "studying"):          "Instrumental",
    ("focused",  "working / coding"):  "Post-Rock",
    ("anxious",  "relaxing at home"):  "Meditation",
    ("romantic", "going out"):         "R&B",
    ("romantic", "relaxing at home"):  "Soul",
    ("angry",    "working out"):       "Metal",
    ("angry",    "running"):           "Punk",
    ("nostalgic","driving"):           "80s Pop",
    ("nostalgic","relaxing at home"):  "Classic Rock",
    ("melancholic","reading"):         "Post-Rock",
    ("melancholic","falling asleep"):  "Ambient",
}

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_vibe(request):
    emotion = request.data.get('emotion', '').lower()
    activity = request.data.get('activity', '').lower()

    if not emotion or not activity:
        return Response({"error": "emotion and activity are required"}, status=400)

    genre = GENRE_MAP.get((emotion, activity))

    # Fallback: match by emotion only
    if not genre:
        emotion_defaults = {
            "happy": "Pop", "sad": "Lo-fi", "energetic": "EDM",
            "calm": "Ambient", "focused": "Instrumental",
            "anxious": "Meditation", "romantic": "R&B",
            "angry": "Rock", "nostalgic": "Classic Rock", "melancholic": "Post-Rock",
        }
        genre = emotion_defaults.get(emotion, "Chill")

    return Response({
        "emotion": emotion,
        "activity": activity,
        "genre": genre,
        "message": f"Feeling {emotion} while {activity}? Try some {genre}!"
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

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "message": "Login successful"
        }, status=200)
    else:
        return Response({"error": "Invalid credentials"}, status=401)
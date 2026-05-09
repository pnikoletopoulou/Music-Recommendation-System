import os
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import SavedVibe
from .serializers import SavedVibeSerializer

CSV_PATH = os.path.join(os.path.dirname(__file__), 'music_dataset_mock2.csv')

EMOTION_MAP = {
    "happy": "Happy",
    "sad": "Sad",
    "stressed": "Stressed",
    "energetic": "Energetic",
    "calm": "Calm",
    "angry": "Angry",
    "excited": "Excited"
}

ACTIVITY_MAP = {
    "party": "Party",
    "relaxing": "Resting",
    "studying": "Studying",
    "gym": "Gym",
    "meditation": "Meditation"
}

ML_READY = False
le_emotion = LabelEncoder()
le_activity = LabelEncoder()
le_genre = LabelEncoder()
ml_model = None

try:
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH)
        df['emotion_n'] = le_emotion.fit_transform(df['Emotion'])
        df['activity_n'] = le_activity.fit_transform(df['Activity'])
        df['genre_n'] = le_genre.fit_transform(df['track_genre'])

        X = df[['emotion_n', 'activity_n']]
        y = df['genre_n']

        ml_model = DecisionTreeClassifier(criterion='entropy', max_depth=5, random_state=48)
        ml_model.fit(X, y)
        ML_READY = True
        print("ML Model trained and ready!")
    else:
        print(f"CSV not found at {CSV_PATH}")
except Exception as e:
    print(f" ML Init Error: {e}")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_vibe(request):
    emotion_raw = request.data.get('emotion', '').lower().strip()
    activity_raw = request.data.get('activity', '').lower().strip()

    if not emotion_raw or not activity_raw:
        return Response({"error": "emotion and activity are required"}, status=400)

    emotion_csv = EMOTION_MAP.get(emotion_raw)
    activity_csv = ACTIVITY_MAP.get(activity_raw)
    genre = None
    source = "fallback"

    if ML_READY and emotion_csv and activity_csv:
        try:
            emo_enc = le_emotion.transform([emotion_csv])[0]
            act_enc = le_activity.transform([activity_csv])[0]
            pred = ml_model.predict([[emo_enc, act_enc]])[0]
            genre = le_genre.inverse_transform([pred])[0]
            source = "ml"
        except Exception as e:
            print(f"Prediction error: {e}")

    if not genre:
        fallback = {
            "happy": "POP", "sad": "BLUES", "energetic": "ROCK",
            "stressed": "LO-FI", "calm": "AMBIENT", "angry": "METAL",
        }
        genre = fallback.get(emotion_raw, "ACOUSTIC")

    return Response({
        "emotion": emotion_raw,
        "activity": activity_raw,
        "genre": genre,
        "message": f"Feeling {emotion_raw} while {activity_raw}? Try some {genre}!",
        "source": source
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
            "username": user.username
        }, status=200)
    return Response({"error": "Invalid credentials"}, status=401)

class VibeViewSet(viewsets.ModelViewSet):
    serializer_class = SavedVibeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedVibe.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
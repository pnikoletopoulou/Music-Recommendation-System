from django.db import models
from django.contrib.auth.models import User

class SavedVibe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emotion = models.CharField(max_length=50)
    activity = models.CharField(max_length=50)
    recommended_genre = models.CharField(max_length=50)
    custom_name = models.CharField(max_length=100, default="New Vibe")
    created_at = models.DateTimeField(auto_now_add=True)
    songs = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user.username} - {self.recommended_genre}"
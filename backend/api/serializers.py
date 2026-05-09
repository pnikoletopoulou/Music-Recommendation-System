from rest_framework import serializers
from .models import SavedVibe

class SavedVibeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedVibe
        fields = ['id', 'emotion', 'activity', 'recommended_genre', 'created_at']
        read_only_fields = ['user'] 
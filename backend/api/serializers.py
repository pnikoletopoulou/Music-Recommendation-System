from rest_framework import serializers
from .models import SavedVibe

class SavedVibeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedVibe
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

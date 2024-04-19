from rest_framework import serializers

from .models import Building, Audience


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ['building_id', 'name']


class AudienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audience
        fields = ['interior_id', 'name', 'building', 'is_available_for_book', 'type']
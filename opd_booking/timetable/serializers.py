from rest_framework import serializers

from .models import Building, Audience


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ['building_id']


class AudienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audience
        fields = ['interior_id', 'name', 'building', 'is_available_for_book', 'is_available_in_slot_1',
                  'is_available_in_slot_2', 'is_available_in_slot_3', 'is_available_in_slot_4',
                  'is_available_in_slot_5', 'is_available_in_slot_6', 'is_available_in_slot_7',
                  'is_booking_by']
from rest_framework import serializers
from .models import Students


class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ['username', 'password', 'email', 'access', 'is_reserved', 'reserved_audience_id', 'reserved_audience_slot']
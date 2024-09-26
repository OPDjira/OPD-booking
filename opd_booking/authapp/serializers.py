from rest_framework import serializers
from .models import Students


class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ['username','first_name', 'last_name','father_name','password', 'email', 'access']
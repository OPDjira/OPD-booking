from rest_framework import serializers
from .models import Students


class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ['username', 'password', 'email', 'access', 'is_reserved', 'reserved_audience_id', 'reserved_audience_slot']
    # username = serializers.CharField(max_length=50)
    # password = serializers.CharField(max_length=30)
    # email = serializers.EmailField()
    # access = serializers.IntegerField()
    # is_reserved = serializers.BooleanField(default=False)
    # reserved_audience_id = serializers.IntegerField()
    # reserved_audience_slot = serializers.IntegerField()
    #
    # def create(self, validated_data):
    #     return Students.objects.create(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.username = validated_data.get('username', instance.username)
    #     instance.password = validated_data.get('password', instance.password)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.access = validated_data.get('access', instance.access)
    #     instance.is_reserved = validated_data.get('is_reserved', instance.is_reserved)
    #     instance.reserved_audience_id = validated_data.get('reserved_audience_id', instance.reserved_audience_id)
    #     instance.reserved_audience_slot = validated_data.get('reserved_audience_slot', instance.reserved_audience_slot)
    #     instance.save()
    #     return instance
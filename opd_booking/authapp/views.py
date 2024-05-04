from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework import status
import json
from rest_framework.renderers import JSONRenderer
from authapp.models import Students
from authapp.serializers import StudentsSerializer
# Create your views here.

@csrf_exempt
def login(request):
    print(request)
    if request.method == "POST":
        data = json.loads((request.body.decode('utf-8')))
        try:
            query = Students.objects.get(email=data["username"], password=data["password"])
            serializer = StudentsSerializer(query)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return JsonResponse(data={}, status=status.HTTP_404_NOT_FOUND)


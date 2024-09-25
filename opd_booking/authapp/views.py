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
from django.db.models import Q


from timetable.models import Booking, Audience

from timetable.serializers import BookingSerializer


# Create your views here.

@csrf_exempt
def login(request):
    print(request)
    if request.method == "POST":
        data = json.loads((request.body.decode('utf-8')))
        try:
            query = Students.objects.get(Q(email=data["username"]) | Q(username=data["username"]), password=data["password"])
            serializer = StudentsSerializer(query)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return JsonResponse(data={}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def lk(request):
    print(request)
    if request.method == "POST":
        data = json.loads((request.body.decode('utf-8')))
        try:
            query = Students.objects.get(Q(email=data["username"]) | Q(username=data["username"]))
            serializer = StudentsSerializer(query)
            data = serializer.data
            query_books = Booking.objects.filter(ordered_by=query)
            data["bookings"] = []
            for i in query_books:
                books_sr = BookingSerializer(i)
                booking_data = books_sr.data
                audience = Audience.objects.get(interior_id=books_sr.data.get("audience"))
                audience_name = audience.name
                booking_data["audience_name"] = audience_name
                data["bookings"].append(booking_data)
            return JsonResponse(data, status=status.HTTP_200_OK)
        except Exception:
            return JsonResponse(data={}, status=status.HTTP_404_NOT_FOUND)


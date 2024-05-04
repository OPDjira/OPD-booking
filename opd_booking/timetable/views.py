from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework import status
import json
from rest_framework.renderers import JSONRenderer
from timetable.models import Booking, Audience, Building
from django.views.decorators.csrf import csrf_exempt
from timetable.serializers import BookingSerializer
from django.db.models import Q
# Create your views here.
@csrf_exempt
def booking(request):
    if request.method == "POST":
        response = {"bookings": []}
        data = json.loads((request.body.decode('utf-8')))
        audiences = Audience.objects.filter(building=data["building"])
        for i in audiences:
            query = Booking.objects.filter(date=data["date"], time=data["time"], audience=i.interior_id)
            if len(query) > 0:
                serializer = BookingSerializer(query.get())
                response["bookings"].append(serializer.data)
        print(response)
        return JsonResponse(response, status=status.HTTP_200_OK)


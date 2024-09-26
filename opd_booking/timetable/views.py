from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework import status
import json
from rest_framework.renderers import JSONRenderer
from timetable.models import Booking, Audience, Building
from django.views.decorators.csrf import csrf_exempt
from timetable.serializers import BookingSerializer, AudienceSerializer
from django.db.models import Q
from authapp.models import Students

@csrf_exempt
def booking(request):
    if request.method == "POST":
        response = {"bookings": []}
        data = json.loads((request.body.decode('utf-8')))
        print("Received booking request data:", data)  # Добавляем эту строку
        audiences = Audience.objects.filter(building=data["building"])
        for i in audiences:
            query = Booking.objects.filter(date=data["date"], time=data["time"], audience=i.interior_id)
            if len(query) > 0:
                serializer = BookingSerializer(query.get())
                serializer = dict(serializer.data)
                serializer["name"] = i.name
                response["bookings"].append(serializer)
        return JsonResponse(response, status=status.HTTP_200_OK)

@csrf_exempt
def make_booking(request):
    if request.method == "POST":
        data = json.loads((request.body.decode('utf-8')))
        building_id = data.get("building")
        audience_id = data.get("audience")
        date = data.get("date")
        time = data.get("time")
        student_email = data.get("email")

        if not all([building_id, audience_id, date, time, student_email]):
            return JsonResponse({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            building = Building.objects.get(building_id=building_id)
            audience = Audience.objects.get(interior_id=audience_id, building=building)
        except (Building.DoesNotExist, Audience.DoesNotExist):
            return JsonResponse({"error": "Invalid building or audience"}, status=status.HTTP_404_NOT_FOUND)

        try:
            student = Students.objects.get(email=student_email)
        except Students.DoesNotExist:
            return JsonResponse({"error": "Invalid student"}, status=status.HTTP_404_NOT_FOUND)

        booking, created = Booking.objects.get_or_create(
            audience=audience,
            date=date,
            time=time,
            defaults={"ordered_by": student}
        )

        if not created:
            return JsonResponse({"error": "Booking already exists"}, status=status.HTTP_409_CONFLICT)

        serializer = BookingSerializer(booking)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@csrf_exempt
def audiences(request):
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
                booking_data["audience_name"] = audience.name
                booking_data["building_name"] = audience.building.name
                data["bookings"].append(booking_data)
            response_data = json.dumps(data, ensure_ascii=False)
            return JsonResponse(json.loads(response_data), status=status.HTTP_200_OK, json_dumps_params={'ensure_ascii': False})
        except Exception:
            return JsonResponse(data={}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def delete_booking(request):
    if request.method == "DELETE":
        data = json.loads((request.body.decode('utf-8')))
        audience_id = data.get("audience")
        date = data.get("date")
        time = data.get("time")
        ordered_by = data.get("ordered_by")

        if not all([audience_id, date, time, ordered_by]):
            return JsonResponse({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            booking = Booking.objects.get(audience=audience_id, time=time, date=date, ordered_by=ordered_by)
        except (Booking.DoesNotExist):
            return JsonResponse({"error": "Invalid booking"}, status=status.HTTP_404_NOT_FOUND)

        booking.delete()
        return JsonResponse({"success": "reservation has been cancelled"}, status=status.HTTP_200_OK)

    return JsonResponse({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

from django.contrib import admin
from .models import Audience, Building, Booking
# Register your models here.

admin.site.register(Audience)
admin.site.register(Building)
admin.site.register(Booking)
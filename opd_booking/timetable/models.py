from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Building(models.Model):
    building_id = models.IntegerField()

    def __str__(self):
        return f"Buidling {self.name} (ID: {self.interior_id})"

    class Meta:
        verbose_name = 'Корпус'
        verbose_name_plural = 'Корпуса'


class Audience(models.Model):
    interior_id = models.IntegerField()
    name = models.CharField(max_length=50)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    is_available_for_book = models.BooleanField(default=True)  # слоты:
    is_available_in_slot_1 = models.BooleanField(default=False)  # 1 - 8:00-9:30
    is_available_in_slot_2 = models.BooleanField(default=False)  # 2 - 10:00-11:30
    is_available_in_slot_3 = models.BooleanField(default=False)  # 3 - 12:00-13:30
    is_available_in_slot_4 = models.BooleanField(default=False)  # 4 - 14:00-15:30
    is_available_in_slot_5 = models.BooleanField(default=False)  # 5 - 16:00-17:30
    is_available_in_slot_6 = models.BooleanField(default=False)  # 6 - 18:00-19:30
    is_available_in_slot_7 = models.BooleanField(default=False)  # 7 - 20:00-20:30
    is_booking_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Audience {self.name} (ID: {self.interior_id})"

    class Meta:
        verbose_name = 'Аудитория'
        verbose_name_plural = 'Аудитории'

from authapp.models import Students  # DO NOT TOUCH. It works, I promise
from django.db import models


# Create your models here.

class Building(models.Model):
    building_id = models.IntegerField()
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"Buidling {self.name} (ID: {self.building_id})"

    class Meta:
        verbose_name = 'Корпус'
        verbose_name_plural = 'Корпуса'


class Audience(models.Model):
    interior_id = models.IntegerField()
    name = models.CharField(max_length=50)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    is_available_for_book = models.BooleanField(default=True)
    TYPE_CHOICES = (
        ("Lecture Hall", "Lecture Hall"),
        ("Practice", "Practice"),
        ("Labs", "Labs")
    )
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default="None")

    def __str__(self):
        return f"Audience {self.name} (ID: {self.interior_id})"

    class Meta:
        verbose_name = 'Аудитория'
        verbose_name_plural = 'Аудитории'


class Booking(models.Model):
    audience = models.ForeignKey(Audience, on_delete=models.CASCADE)
    time = models.TimeField()
    date = models.DateField()
    ordered_by = models.ForeignKey(Students, on_delete=models.CASCADE)

    def __str__(self):
        return f"Order {self.indexes} (ID: {self.audience})"

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

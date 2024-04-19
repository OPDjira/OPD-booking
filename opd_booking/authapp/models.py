from django.db import models


# Create your models here.
class Students(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=30)
    email = models.EmailField()
    access = models.IntegerField()
    is_reserved = models.BooleanField(default=False)
    reserved_audience_id = models.IntegerField()
    reserved_audience_slot = models.IntegerField()

    def __str__(self):
        return f"User {self.username} ({self.email})"

    class Meta:
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'

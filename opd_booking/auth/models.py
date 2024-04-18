from django.db import models

# Create your models here.
class Students(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=30)
    email = models.EmailField()
    access = models.IntegerField(max_length=5)
    is_reserved = models.BooleanField(default=False)
    reserved_audience_id = models.IntegerField(max_length=30)
    reserved_audience_slot = models.IntegerField(max_length=30)
def __str__(self):
    return f"User {self.username} ({self.email})"
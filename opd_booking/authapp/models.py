from django.db import models


# Create your models here.
class Students(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=30)
    email = models.EmailField()
    ACCESS_CHOICES = (
        ('Student', 'Student'),
        ('Activist', 'Activist'),
        ('Teacher', 'Teacher')
    )
    access = models.CharField(max_length=50, choices=ACCESS_CHOICES, default='Student')

    def __str__(self):
        return f"User {self.username} ({self.email})"

    class Meta:
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'

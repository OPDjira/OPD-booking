# Generated by Django 5.0.4 on 2024-09-23 18:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Audience',
            fields=[
                ('interior_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('is_available_for_book', models.BooleanField(default=True)),
                ('type', models.CharField(choices=[('Lecture Hall', 'Lecture Hall'), ('Practice', 'Practice'), ('Labs', 'Labs')], default='None', max_length=255)),
            ],
            options={
                'verbose_name': 'Аудитория',
                'verbose_name_plural': 'Аудитории',
            },
        ),
        migrations.CreateModel(
            name='Building',
            fields=[
                ('building_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Корпус',
                'verbose_name_plural': 'Корпуса',
            },
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TimeField()),
                ('date', models.DateField()),
                ('audience', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timetable.audience')),
                ('ordered_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='authapp.students')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
            },
        ),
        migrations.AddField(
            model_name='audience',
            name='building',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timetable.building'),
        ),
    ]
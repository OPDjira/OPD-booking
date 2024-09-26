# Generated by Django 5.0.4 on 2024-09-23 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Students',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=30)),
                ('first_name', models.CharField(null=True)),
                ('last_name', models.CharField(null=True)),
                ('father_name', models.CharField(null=True)),
                ('email', models.EmailField(max_length=254)),
                ('access', models.CharField(choices=[('Student', 'Student'), ('Activist', 'Activist'), ('Teacher', 'Teacher')], default='Student', max_length=50)),
            ],
            options={
                'verbose_name': 'Студент',
                'verbose_name_plural': 'Студенты',
            },
        ),
    ]

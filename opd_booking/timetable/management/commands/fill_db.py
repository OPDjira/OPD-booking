import json
from requests import get
from django.core.management.base import BaseCommand
from timetable.models import Building, Audience, Booking

class Command(BaseCommand):
    def book_building(self, building_name):
        try:
            building = Building.objects.get(name=building_name)
        except Building.DoesNotExist:
            print(f"Building {building_name} does not exist")
            return

        for audience in building.audience_set.all():
            req = get(
                f"https://ruz.spbstu.ru/api/v1/ruz/buildings/{building.id}/rooms/{audience.interior_id}/scheduler")
            try:
                for lessons in req.json()['days']:
                    for lesson in lessons["lessons"]:
                        temp = {"time_start": lesson["time_start"],
                                "time_end": lesson["time_end"],
                                "date": lessons["date"]}
                        booking, created = Booking.objects.get_or_create(audience=audience, time=temp["time_start"],
                                                                         date=temp["date"])
                        if created:
                            print(
                                f"Booking created for {audience.name} on {temp['date']} from {temp['time_start']} to {temp['time_end']}")
                        else:
                            print(
                                f"Booking already exists for {audience.name} on {temp['date']} from {temp['time_start']} to {temp['time_end']}")
            except KeyError:
                print(f"Аудитория {audience.name} не найден")
    def add_arguments(self, parser):
        parser.add_argument('building', type=str, nargs='?', default="none")
    def handle(self, *args, **options):
        building = options["building"]
        if building != "none":
            self.book_building(building)
        else:
            # Корпуса
            req = get("https://ruz.spbstu.ru/api/v1/ruz/buildings/")
            data_buildings = {}
            for i in req.json()["buildings"]:
                data_buildings[i["name"]] = i["id"]

            # Корпуса в бд
            for building_name, building_id in data_buildings.items():
                building, created = Building.objects.get_or_create(building_id=building_id, defaults={'name': building_name})
                print(str(building) + ": " + str(created))

            data_rooms = {}
            # Аудитории
            for building_name, building_id in data_buildings.items():
                req = get(f"https://ruz.spbstu.ru/api/v1/ruz/buildings/{building_id}/rooms/")
                data_rooms[building_id] = {}
                for j in req.json()["rooms"]:
                    data_rooms[building_id][j["name"]] = j["id"]

            # Аудитории в бд
            for building_id, rooms in data_rooms.items():
                building = Building.objects.get(building_id=building_id)
                for room_name, room_id in rooms.items():
                    audience, created = Audience.objects.get_or_create(interior_id=room_id, defaults={'name': room_name, 'building': building})
                    print(str(audience) + ": " + str(created))

        def get_occupied_rooms_str(self, building_name):
            building = Building.objects.get(name=building_name)
            answer = {"rooms": {}}
            for room in building.audience_set.all():
                req = get(f"https://ruz.spbstu.ru/api/v1/ruz/buildings/{building.id}/rooms/{room.id}/scheduler")
                try:
                    answer["rooms"][room.id] = []
                    for lessons in req.json()['days']:
                        temp = {"time_start": lessons["lessons"][0]["time_start"],
                                "time_end": lessons["lessons"][0]["time_end"],
                                "date": lessons["date"]}
                        answer["rooms"][room.id].append(temp)
                except KeyError:
                    print(f"Аудитория {room.id} не найден")
            return answer


import json
from requests import get

req = get("https://ruz.spbstu.ru/api/v1/ruz/buildings/")
data_buildings = {}
for i in req.json()["buildings"]:
    data_buildings[i["name"]] = i["id"]

with open('data_buildings.json', 'w', encoding='utf-8') as f:
    json.dump(data_buildings, f, ensure_ascii=False, indent=4, sort_keys=True)

data_rooms = {}
for i in data_buildings.keys():
    i = data_buildings[i]
    req = get(f"https://ruz.spbstu.ru/api/v1/ruz/buildings/{i}/rooms/")
    data_rooms[i] = {}
    for j in req.json()["rooms"]:
        data_rooms[i][j["name"]] = j["id"]

with open('data_rooms.json', 'w', encoding='utf-8') as f:
    json.dump(data_rooms, f, ensure_ascii=False, indent=4, sort_keys=True)


def get_occupied_rooms(building):
    with open('data_buildings.json', 'r',
              encoding='utf-8') as f:  # Временные json с айдишниками и именами
        buildings = json.load(f)  # аудиторий/корпусов
    with open('data_rooms.json', 'r', encoding='utf-8') as f:
        rooms = json.load(f)

    building = buildings[building]
    answer = {"rooms": {}}
    for room in rooms[str(building)]:
        request = get(
            f"https://ruz.spbstu.ru/api/v1/ruz/buildings/{building}/rooms/{rooms[str(building)][room]}/scheduler")
        try:
            answer["rooms"][rooms[str(building)][room]] = []
            for lessons in request.json()['days']:
                temp = {"time_start": lessons["lessons"][0]["time_start"],
                        "time_end": lessons["lessons"][0]["time_end"],
                        "date": lessons["date"]}
                answer["rooms"][rooms[str(building)][room]].append(temp)
        except KeyError:
            print(f"Аудитория {rooms[str(building)][room]} вне расписания")
    return answer

print(get_occupied_rooms("1-й учебный корпус"))
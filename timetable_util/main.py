from requests import get
from pprint import pprint
import json

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

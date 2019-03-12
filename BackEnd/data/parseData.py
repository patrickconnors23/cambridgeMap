from pprint import pprint
import json

with open("buildings.json") as JSON:
    data = json.load(JSON)
    data = data["items"]

mDic = {}


def parseMatchString(fType, matchString):
    name, department = matchString, fType
    return name, department


def parseObj(building):
    name, department = parseMatchString(building["feature_type"],
                                        building["match_string"])
    return {
        "id": building["id"],
        "buildingType": building["feature_type"],
        "name": name,
        "department": department,
        "lat": building["lat"],
        "lon": building["lon"],
    }


data = [parseObj(x) for x in data]

for el in data:
    coord = str((el["lat"], el["lon"]))
    if coord in mDic:
        mDic[coord].append(el)
    else:
        mDic[coord] = [el]


def parseSingle(building):
    building = building[0]
    building["single"] = True
    building["aliases"] = [building["name"]]
    return building


def parseMulti(locationList):
    if len(locationList) > 100:
        return {}
    else:
        dic = {
            "id": locationList[0]["id"],
            "buildingType": "poly",
            "lat": locationList[0]["lat"],
            "lon": locationList[0]["lon"],
            "aliases": set(),
            "single": False
        }
        for el in locationList:
            dic["aliases"].add(el["name"])
            if el["buildingType"] in dic:
                dic[el["buildingType"]].append(el)
            else:
                if el["buildingType"] == "Harvard Buildings":
                    dic["name"] = el["name"]
                dic[el["buildingType"]] = [el]
        dic["aliases"] = list(dic["aliases"])
        if len(dic["aliases"]) == 1:
            dic["aliases"] = []
        # elif len(dic["aliases"]) > 10:
        #     print(dic)
        return dic


buildings = []
for key, val in mDic.items():
    if len(val) > 1:
        pv = parseMulti(val)
        if "id" in pv:
            buildings.append(parseMulti(val))
    else:
        buildings.append(parseSingle(val))


with open("buildingsRich.json", "w") as f:
    json.dump(buildings, f)

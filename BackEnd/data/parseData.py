import json
import pandas as pd

with open("buildings.json") as JSON:
    data = json.load(JSON)
    data = data["items"]

def parseMatchString(fType, matchString):
    name, department = matchString, fType
    # if fType == 'Departments, Centers,' or fType == 'Departments, Centers, Institutes':
    #     department, nameHolder = matchString.split("(")
    #     name = nameHolder[:-1]
    
    # elif fType == 'Harvard Buildings':
    #     name = matchString
    #     department = ""
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

with open("buildingsParsed.json", "w") as f:
    json.dump(data, f)

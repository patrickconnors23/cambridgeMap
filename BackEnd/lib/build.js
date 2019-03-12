const data = require("../data/buildingsParsed.json");
const locMapData = require("../data/buildingLocMap.json");
const richData = require("../data/buildingsRich.json");

class BuildingData {
    constructor() {
        this.data = data;
        this.locMap = locMapData;
        this.richData = richData;
        this.buildingTypes = [
            "Harvard Places",
            "Harvard Libraries",
            "Harvard Housing",
            "Harvard Buildings",
            "MBTA Stations",
            "Harvard Schools",
            "Harvard Museums and Galleries",
            "Harvard Rooms and Auditoriums",
            "Streets",
            "Harvard Dining",
            "Other Places",
            "Athletics Facilities",
            "Harvard Residential Houses",
            "Departments, Centers,",
            "Departments, Centers, Institutes"
        ];
    }
    getDataResource() {
        return { data: this.data };
    }
    getBuildingTypesResource() {
        return { data: this.buildingType };
    }
    getLocationMap() {
        return { data: this.locMap };
    }
    getRichData() {
        return { data: this.richData };
    }
}

module.exports = BuildingData;

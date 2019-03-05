const data = require("../data/buildingsParsed.json");

class BuildingData {
    constructor () {
        this.data = data;
        this.buildingTypes = ['Harvard Places', 
            'Harvard Libraries', 
            'Harvard Housing', 
            'Harvard Buildings', 
            'MBTA Stations', 
            'Harvard Schools', 
            'Harvard Museums and Galleries', 
            'Harvard Rooms and Auditoriums', 
            'Streets', 
            'Harvard Dining', 
            'Other Places', 
            'Athletics Facilities', 
            'Harvard Residential Houses', 
            'Departments, Centers,', 
            'Departments, Centers, Institutes']
    }
    getDataResource () {
        return {
            "data": this.data
        }
    }
    getBuildingTypesResource () {
        return {
            "data": this.buildingTypes
        }
    }


}

module.exports = BuildingData;

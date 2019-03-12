const sortBuildings = buildings => {
    console.log(buildings);
    return buildings.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
};

export default sortBuildings;

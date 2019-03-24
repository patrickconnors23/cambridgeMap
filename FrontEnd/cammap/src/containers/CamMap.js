import React, { Component } from "react";
import GMap from "../components/GMap";
import config from "../config.json";
import SearchBar from "../components/searchbar";
import SearchResultDisplay from "../components/searchResultDisplay";
import sortBuildings from "../util/util";
import Flexbox from "flexbox-react";

class CambridgeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            BUILDING_API: config.Backend.URL,
            query: this.props.location.state
                ? this.props.location.state.query
                : "",
            buildings: [],
            defaultCenter: {
                lat: 42.374479,
                lng: -71.117083
            },
            location: {
                lat: 42.374479,
                lng: -71.117083
            },
            zoomedIn: false
        };
    }

    _getBuildingData = () => {
        const promises = Promise.all([
            fetch(this.state.BUILDING_API + "/buildings"),
            fetch(this.state.BUILDING_API + "/buildings/locationMap"),
            fetch(this.state.BUILDING_API + "/buildings/richData")
        ]);

        promises
            .then(([res1, res2, res3]) => {
                return Promise.all([res1.json(), res2.json(), res3.json()]);
            })
            .then(
                ([res1, res2, res3]) => {
                    const sortedBuildings = sortBuildings(res3["data"]);
                    this.setState(
                        {
                            buildings: sortedBuildings
                        },
                        () => {
                            this._filterBuildings(this.state.query);
                        }
                    );
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                        buildings: []
                    });
                }
            );
    };

    componentDidMount() {
        this._getBuildingData();
    }

    _handleItemSelection = (id, useId) => {
        if (useId) {
            const selectedBuildings = this.state.buildings.filter(building => {
                return building.id === id;
            });
            this.setState({
                filteredBuildings: selectedBuildings,
                isLoaded: true,
                location: {
                    lat: parseFloat(selectedBuildings[0]["lat"]),
                    lng: parseFloat(selectedBuildings[0]["lon"])
                },
                zoomedIn: true
            });
        } else {
            this.setState(
                {
                    location: this.state.defaultCenter,
                    zoomedIn: false
                },
                () => {
                    this._filterBuildings(this.state.q);
                }
            );
        }
    };

    hasMatch = (q, aliases) => {
        let hasMatch = false;
        const matchQ = q.toUpperCase();
        aliases.forEach(name => {
            const matchStr = name.toUpperCase();
            if (matchStr.indexOf(matchQ) > -1) {
                hasMatch = true;
            }
        });
        return hasMatch;
    };

    _filterBuildings = q => {
        let data = [];
        if (q !== "") {
            data = this.state.buildings.filter(building => {
                return this.hasMatch(q, building.aliases);
            });
        }
        this.setState({
            q: q,
            filteredBuildings: data,
            isLoaded: true
        });
    };

    _processQueryChange = q => {
        this.setState({
            query: q,
            zoomedIn: false
        });
        this._filterBuildings(q);
    };

    render() {
        const {
            isLoaded,
            error,
            filteredBuildings,
            query,
            location,
            zoomedIn
        } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Flexbox
                    flexDirection="column"
                    maxHeight="100%"
                    minHeight="100vh"
                >
                    <Flexbox
                        flexDirection="row"
                        minWidth="100%"
                        // alignItems="center"
                        height="75px"
                        style={{
                            backgroundColor: "primary"
                        }}
                    >
                        <Flexbox
                            flexGrow={1}
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100%"
                        >
                            <SearchBar
                                queryChange={this._processQueryChange}
                                query={this.state.query}
                            />
                        </Flexbox>
                    </Flexbox>
                    <Flexbox flex={"9"} flexDirection="row">
                        <Flexbox
                            flexDirection="column"
                            minHeight="100%"
                            style={styles.searchResultContainer}
                        >
                            <SearchResultDisplay
                                results={filteredBuildings}
                                hasText={query !== ""}
                                menuItemClickHandler={this._handleItemSelection}
                                zoomedIn={this.state.zoomedIn}
                            />
                        </Flexbox>
                        <Flexbox style={styles.gmapContainer}>
                            <GMap
                                center={location}
                                zoomedIn={zoomedIn}
                                location={location}
                                buildings={filteredBuildings}
                                childClickHandler={this._handleItemSelection}
                            />
                        </Flexbox>
                    </Flexbox>
                </Flexbox>
            );
        }
    }
}

const styles = {
    gmapContainer: {
        width: "80%"
    },
    searchResultContainer: {
        width: "20%"
    }
};

export default CambridgeMap;

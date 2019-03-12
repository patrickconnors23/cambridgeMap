import React, { Component } from "react";
import GMap from "../components/GMap";
import config from "../config.json";
import SearchBar from "../components/searchbar";
import SearchResultDisplay from "../components/menuDisplay";
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
            buildings: []
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

    _handleMenuItemClick = id => {
        const selectedBuilding = this.state.buildings.filter(building => {
            return building.id === id;
        });
        this.setState({
            filteredBuildings: selectedBuilding,
            isLoaded: true
        });
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
            filteredBuildings: data,
            isLoaded: true
        });
    };

    _processQueryChange = q => {
        this.setState({
            query: q
        });
        this._filterBuildings(q);
    };

    render() {
        const { isLoaded, error, filteredBuildings, query } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Flexbox flexDirection="column" minHeight="100vh">
                    <Flexbox
                        flexDirection="row"
                        flexGrow={1}
                        minWidth="100%"
                        alignItems="center"
                        style={{
                            backgroundColor: "#edeeef"
                        }}
                    >
                        <Flexbox
                            flexGrow={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <SearchBar
                                queryChange={this._processQueryChange}
                                query={this.state.query}
                            />
                        </Flexbox>
                    </Flexbox>
                    <Flexbox flexDirection="row" flexGrow={12}>
                        <Flexbox
                            flexDirection="column"
                            style={{ width: "20%" }}
                        >
                            <SearchResultDisplay
                                results={filteredBuildings}
                                hasText={query !== ""}
                                menuItemClickHandler={this._handleMenuItemClick}
                            />
                        </Flexbox>
                        <Flexbox
                            style={{
                                width: "80%"
                            }}
                        >
                            <GMap buildings={filteredBuildings} />
                        </Flexbox>
                    </Flexbox>
                </Flexbox>
            );
        }
    }
}

export default CambridgeMap;

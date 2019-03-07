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
        var q;
        if (this.props.location.state) {
            q = this.props.location.state.query;
        } else {
            q = "";
        }
        this.state = {
            isLoaded: false,
            error: null,
            BUILDING_API: config.Backend.URL,
            query: q,
            buildings: []
        };
    }

    componentDidMount() {
        fetch(this.state.BUILDING_API + "/buildings")
            .then(res => res.json())
            .then(
                result => {
                    const sortedBuildings = sortBuildings(result["data"]);
                    console.log(sortedBuildings);
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
    }

    _filterBuildings = q => {
        let data = [];
        if (q !== "") {
            data = this.state.buildings.filter(building => {
                const matchStr = building.name.toUpperCase();
                const matchQ = q.toUpperCase();
                return matchStr.indexOf(matchQ) > -1;
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

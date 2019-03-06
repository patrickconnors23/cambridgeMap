import React, { Component } from "react";
import GMap from "../components/GMap";
import config from "../config.json";
import SearchBar from "../components/searchbar";

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
            buildings: [],
            selectedBuildings: []
        };
    }

    componentDidMount() {
        fetch(this.state.BUILDING_API + "/buildings")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        buildings: result["data"]
                    });
                },
                error => {
                    console.log(error["data"]);
                    this.setState({
                        isLoaded: true,
                        error: error,
                        buildings: []
                    });
                }
            );
    }

    _filterBuildings = q => {};

    _processQueryChange = q => {
        this.setState({
            query: q
        });
        this._filterBuildings(q);
    };

    render() {
        const { isLoaded, error, selectedBuildings } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <SearchBar
                        queryChange={this._processQueryChange}
                        query={this.state.query}
                    />
                    <GMap buildings={selectedBuildings} />
                </div>
            );
        }
    }
}

export default CambridgeMap;

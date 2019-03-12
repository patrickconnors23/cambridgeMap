import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Building from "./building";
const config = require("../config.json");

class GMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: props.buildings,
            error: null,
            GOOGLE_API_KEY: config.GoogleMaps.API_KEY,
            BUILDING_API: config.Backend.URL,
            center: {
                lat: 42.374479,
                lng: -71.117083
            },
            zoom: 16
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ buildings: nextProps.buildings });
    }

    renderLocations = buildings => {
        return buildings.map(building => {
            return (
                <Building
                    key={building.id}
                    text={building.name}
                    lat={building.lat}
                    lng={building.lon}
                />
            );
        });
    };

    createLocations = () => {
        if (this.state.buildings.length <= 20) {
            return this.renderLocations(this.state.buildings);
        }
    };

    render() {
        const { error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div style={{ height: "100%", width: "100%" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this.state.GOOGLE_API_KEY }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
                        {this.createLocations()}
                    </GoogleMapReact>
                </div>
            );
        }
    }
}

export default GMap;

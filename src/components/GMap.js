import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Building from "./building";
const config = require("../config.js");

class GMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: props.buildings,
            center: props.location,
            zoom: this.processZoom(this.props.zoomedIn),
            isZoomed: this.props.zoomedIn,
            error: null,
            GOOGLE_API_KEY: config["GOOGLE_MAPS_API_KEY"]
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            buildings: nextProps.buildings,
            center: nextProps.center,
            zoom: this.processZoom(nextProps.zoomedIn)
        });
    }

    processZoom = zoom => {
        return zoom ? 18 : 16;
    };

    renderLocations = buildings => {
        return buildings.map(building => {
            return (
                <Building
                    key={building.id}
                    id={building.id}
                    text={building.name}
                    lat={building.lat}
                    lng={building.lon}
                    parentClickHandler={this.props.childClickHandler}
                    zoomedIn={this.state.zoomedIn}
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
        console.log(config);
        console.log(this.state.GOOGLE_API_KEY);
        const { error, center, zoom } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div style={{ height: "100%", width: "100%" }}>
                    <GoogleMapReact
                        className="google-map"
                        bootstrapURLKeys={{ key: this.state.GOOGLE_API_KEY }}
                        center={center}
                        zoom={zoom}
                    >
                        {this.createLocations()}
                    </GoogleMapReact>
                </div>
            );
        }
    }
}

export default GMap;

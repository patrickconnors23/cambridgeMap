import React, {Component} from 'react'
import GMap from '../components/GMap'
// const config = require("../config.json");
import config from '../config.json'

class CambridgeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            BUILDING_API: config.Backend.URL,
            buildings: [],
            selectedBuildings: []
        };

    }

    componentDidMount() {
        fetch(this.state.BUILDING_API+"/buildings")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        buildings: result["data"]
                    })
                },
                (error) => {
                    console.log(error["data"])
                    this.setState({
                        isLoaded: true,
                        error: error,
                        buildings: []
                    })
                }
            )
    }

    render() {
        const {isLoaded, error, selectedBuildings} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>; 
        } else {
            return (
              <GMap buildings={selectedBuildings}></GMap>
            );
        }
    }
}

export default CambridgeMap;
  

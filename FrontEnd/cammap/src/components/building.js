import React, { Component } from "react";

class Building extends Component {
    render() {
        return (
            <div className="CustomMapElement">
                <div>{this.props.text}</div>
            </div>
        );
    }
}

export default Building;

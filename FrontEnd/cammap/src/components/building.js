import React, { Component } from "react";
import HomeRounded from "@material-ui/icons/HomeRounded";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";

class Building extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    displayText = text => {
        if (text.length > 20) {
            text = text.substring(0, 20);
            text += "...";
        }
        return text;
    };

    render() {
        return (
            <div>
                <Fab style={styles.homeButton} color="primary" size="small">
                    <HomeRounded />
                </Fab>
                <Chip
                    style={styles.chip}
                    color="secondary"
                    label={this.displayText(this.props.text)}
                    className={styles.chip}
                />
            </div>
        );
    }
}

const styles = {
    homeButton: {
        position: "absolute",
        transform: "translate(-50%, -50%)"
    },
    chip: {
        transform: "translate(-50%, 80%)"
    }
};

export default Building;

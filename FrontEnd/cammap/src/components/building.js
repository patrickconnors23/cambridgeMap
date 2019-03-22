import React, { Component } from "react";
import HomeRounded from "@material-ui/icons/HomeRounded";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";

class Building extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            expanded: this.props.zoomedIn
        };
    }

    _handleClick = () => {
        this.setState({ expanded: !this.state.expanded }, () => {
            console.log(this.state.expanded);
            this.props.parentClickHandler(this.state.id, this.state.expanded);
        });
    };

    displayText = text => {
        if (text.length > 20) {
            text = text.substring(0, 20);
            text += "...";
        }
        return text;
    };

    _renderCard = () => {
        if (this.state.expanded) {
            return (
                <div>asdfkjsdalk fjsdklfjdsklfjdskljfklsdjf sdkljfsdlkfj</div>
            );
        } else {
            return <div />;
        }
    };

    render() {
        return (
            <div>
                <Fab
                    style={styles.homeButton}
                    color="primary"
                    size="small"
                    onClick={this._handleClick}
                >
                    <HomeRounded />
                </Fab>
                <Chip
                    style={styles.chip}
                    color="secondary"
                    label={this.displayText(this.props.text)}
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
    },
    card: {
        backgroundColor: "white"
    }
};

export default Building;

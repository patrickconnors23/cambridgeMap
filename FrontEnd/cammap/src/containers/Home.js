import React, { Component } from "react";
import ReactBodymovin from "react-bodymovin";
import Logo from "../components/logo";
import reactLogo from "../img/react.json";
import pin from "../img/pin.json";
import lottie from "../img/lottie.json";
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Link, Redirect } from "react-router-dom";
import Flexbox from "flexbox-react";
import { Paper, Button } from "@material-ui/core";
import map from "../img/map.png";
import harvardLogo from "../img/harvardLogo.png";
import material from "../img/material.svg";
import node from "../img/node.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            toMap: false
        };
    }

    _handleQueryUpdate = event => {
        this.setState({
            query: event.target.value
        });
    };

    _handleSubmit = () => {
        this.setState({
            toMap: true
        });
    };

    _handleKeySubmit = event => {
        if (event.key === "Enter") {
            this._handleSubmit();
        }
    };

    render() {
        if (this.state.toMap === true) {
            return (
                <Redirect
                    to={{
                        pathname: "/map",
                        state: { query: this.state.query }
                    }}
                />
            );
        } else {
            return (
                <Flexbox
                    style={styles.container}
                    flexDirection="column"
                    alignItems="center"
                >
                    <Flexbox>
                        <h1>Map.Harvard 2.0</h1>
                    </Flexbox>
                    <Flexbox
                        style={styles.logoContainer}
                        flexDirection="row"
                        alignItems="center"
                    >
                        <img height="50px" width="50px" src={map} alt="map" />
                        <img
                            height="50px"
                            width="50px"
                            style={styles.img}
                            src={harvardLogo}
                            alt="harvardLogo"
                        />
                    </Flexbox>
                    <Flexbox
                        style={styles.submitContainer}
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Paper styles={styles.paper} elevation={1}>
                            <Flexbox flexDirection="column" alignItems="center">
                                <Flexbox alignItems="center">
                                    <h2>Enter Campus Map</h2>
                                </Flexbox>
                                <Flexbox alignItems="center">
                                    <TextField
                                        color="primary"
                                        autoFocus={true}
                                        fullWidth={false}
                                        value={this.state.query}
                                        onKeyPress={this._handleKeySubmit}
                                        onChange={this._handleQueryUpdate}
                                        placeholder="Search for buildings, i.e. William James Hall"
                                        inputProps={{
                                            style: { textAlign: "center" }
                                        }}
                                        style={styles.textField}
                                    />
                                </Flexbox>
                                <Flexbox justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this._handleSubmit}
                                        style={styles.submitButton}
                                    >
                                        Search
                                    </Button>
                                </Flexbox>
                            </Flexbox>
                        </Paper>
                    </Flexbox>
                    <Flexbox flexDirection="column" alignItems="center">
                        <h2 style={styles.header}>Built With</h2>
                        <Flexbox flexDirection="row">
                            <Logo isLottie={true} link={reactLogo} speed={5} />
                            <Logo isLottie={false} link={material} />
                            <Logo isLottie={true} link={lottie} speed={3} />
                            <Logo isLottie={false} link={node} speed={3} />
                            <Logo isLottie={true} link={pin} />
                        </Flexbox>
                    </Flexbox>
                    <Flexbox flexDirection="column" alignItems="center">
                        <h2 style={styles.header}>Project Inspiration</h2>
                        <p>Hello</p>
                    </Flexbox>
                </Flexbox>
            );
        }
    }
}

const styles = {
    container: {
        // backgroundColor: "red",
        minHeight: "100vh"
    },
    submitButton: {
        margin: "30px"
    },
    submitContainer: {
        width: "50%",
        // backgroundColor: "blue",
        display: "flex"
    },
    textField: {
        margin: "30px",
        width: "400px"
    },
    paper: {
        flexGrow: 1
    },
    img: {
        margin: "10px"
    },
    logoContainer: {
        marginBottom: "20px"
    },
    header: {
        marginTop: "70px"
    }
};

export default Home;

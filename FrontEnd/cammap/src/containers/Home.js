import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
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
                        <img
                            height="50px"
                            width="50px"
                            style={styles.img}
                            src={map}
                            alt="map"
                        />
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
                    <Flexbox
                        style={styles.textBody}
                        flexDirection="column"
                        alignItems="center"
                    >
                        <h2 style={styles.header}>Project Notes</h2>
                        <Typography align="left" variant="subtitle1">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Harvard’s{" "}
                            <a href="https://map.harvard.edu">
                                current campus map
                            </a>{" "}
                            is a clunky, 10 y/o solution that relies on svg +
                            server-side rendering, and proprietary software.
                            Map.Harvard 2.0 strives to give the tool a revamp
                            using modern web technologies such as Node.js,
                            Facebook’s React, Google’s Maps API and Material-UI,
                            and Airbnb’s Lottie. Though far from being a
                            production-ready product, it’s a testament to both
                            how far web development has come in the last eight
                            years, and the importance of open-source software.
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; My
                            web app relies on location data pulled from
                            Harvard's map. After running some preprocessing with
                            Python, I expose the data via a simple Node.js API.
                            Then, the React app pulls this data and renders it
                            in a searchable and interactive format.
                        </Typography>
                    </Flexbox>
                </Flexbox>
            );
        }
    }
}

const styles = {
    container: {
        minHeight: "100vh"
    },
    submitButton: {
        margin: "30px"
    },
    submitContainer: {
        width: "50%",
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
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "10px",
        marginBottom: "20px"
    },
    logoContainer: {
        marginBottom: "20px"
    },
    header: {
        marginTop: "60px",
        marginBottom: "30px"
    },
    textBody: {
        width: "75%",
        paddingBottom: "80px"
    }
};

export default Home;

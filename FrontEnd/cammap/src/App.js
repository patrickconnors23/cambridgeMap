import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CambridgeMap from "./containers/CamMap";
import Home from "./containers/Home";
import "./App.css";

const theme = createMuiTheme({
    palette: {
        primary: { main: "#a51c30" },
        secondary: { main: "#30393A" }
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <div>
                            <Route exact path="/" component={Home} />
                            <Route path="/map" component={CambridgeMap} />
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

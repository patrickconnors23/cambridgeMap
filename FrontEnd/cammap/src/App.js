import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import CambridgeMap from './containers/CamMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/map" component={CambridgeMap} />
          </div>
        </Router>
      </div>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

export default App;

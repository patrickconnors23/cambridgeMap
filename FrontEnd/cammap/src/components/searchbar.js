import React, { Component } from "react";
import { TextField } from "@material-ui/core";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
            query: this.props.query
        };
    }

    _handleQueryUpdate = event => {
        this.setState({
            query: event.target.value
        });
        this.props.queryChange(event.target.value);
    };

    render() {
        return (
            <div
                className="SearchBar"
                style={{
                    width: "50%"
                }}
            >
                <TextField
                    color="primary"
                    autoFocus={true}
                    fullWidth={true}
                    value={this.state.query}
                    onChange={this._handleQueryUpdate}
                    inputProps={{
                        style: { textAlign: "center" }
                    }}
                    placeholder="Search for buildings, i.e. William James Hall"
                />
            </div>
        );
    }
}

export default SearchBar;

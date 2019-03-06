import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        this.state = {
            isHidden: false,
            this.text
        }
    }
    render() {
        return <div>{this.props.text}</div>
    }
}

export default SearchBar;
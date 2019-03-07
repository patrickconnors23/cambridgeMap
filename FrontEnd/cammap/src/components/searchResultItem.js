import React, { Component } from "react";
import { ListItem } from "@material-ui/core";

class SearchResultItem extends Component {
    constructor(props) {
        super(props);
        const { name, id } = this.props.item;
        this.state = {
            name: name,
            id: id
        };
    }
    render() {
        const { name } = this.state;
        return (
            <ListItem divider={true}>
                <div>{name}</div>
            </ListItem>
        );
    }
}

export default SearchResultItem;

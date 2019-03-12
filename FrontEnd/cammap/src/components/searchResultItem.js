import React, { Component } from "react";
import { ListItem } from "@material-ui/core";

class SearchResultItem extends Component {
    constructor(props) {
        super(props);
        const { name, id } = this.props.item;
        console.log(this.props.item);
        this.state = {
            name: name,
            id: id,
            item: this.props.item,
            nameMap: {
                "Harvard Places": "Places",
                "Harvard Libraries": "Libraries",
                "Harvard Housing": "Housing",
                "MBTA Stations": "MBTA Stations",
                "Harvard Schools": "Schools",
                "Harvard Museums and Galleries": "Museums & Galleries",
                "Harvard Rooms and Auditoriums": "Rooms",
                Streets: "Streets",
                "Harvard Dining": "D-Halls",
                "Athletics Facilities": "Athletics",
                "Harvard Residential Houses": "Housing",
                "Departments, Centers,": "Departments",
                "Departments, Centers, Institutes": "Departments"
            }
        };
    }

    _handleItemClick = () => {
        this.props.clickHandler(this.state.id);
    };

    renderSubCategory = (name, lst) => {
        const fields = lst.map(item => {
            return <li key={item["name"]}>{item["name"]}</li>;
        });
        return (
            <li key={name}>
                <div>{this.state.nameMap[name]}</div>
                <ul>{fields}</ul>
            </li>
        );
    };

    _renderSubCategories = () => {
        let liItems = [];
        const renderCategories = [
            "Harvard Places",
            "Harvard Libraries",
            "Harvard Housing",
            "MBTA Stations",
            "Harvard Schools",
            "Harvard Museums and Galleries",
            "Harvard Rooms and Auditoriums",
            "Streets",
            "Harvard Dining",
            "Athletics Facilities",
            "Harvard Residential Houses",
            "Departments, Centers,",
            "Departments, Centers, Institutes"
        ];
        renderCategories.forEach(category => {
            if (Object.keys(this.state.item).includes(category)) {
                liItems.push(
                    this.renderSubCategory(category, this.state.item[category])
                );
            }
        });
        if (liItems.length > 10) {
            liItems = [];
        }
        return liItems;
    };

    render() {
        const subCategories = this._renderSubCategories();
        const { name } = this.state;
        return (
            <ListItem onClick={this._handleItemClick} divider={true}>
                <div>{name}</div>
                <ul>{subCategories}</ul>
            </ListItem>
        );
    }
}

export default SearchResultItem;

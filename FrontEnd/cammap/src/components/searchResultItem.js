import React, { Component } from "react";
import { ListItem } from "@material-ui/core";
import Flexbox from "flexbox-react";

class SearchResultItem extends Component {
    constructor(props) {
        super(props);
        const { name, id } = this.props.item;
        this.state = {
            name: name,
            id: id,
            item: this.props.item,
            showDetail: this.props.showDetail,
            nameMap: {
                "Harvard Places": "Places",
                "Harvard Libraries": "Libraries",
                "Harvard Housing": "Housing",
                "MBTA Stations": "MBTA Stations",
                "Harvard Schools": "Schools",
                "Harvard Museums and Galleries": "Museums & Galleries",
                "Harvard Rooms and Auditoriums": "Rooms",
                "Harvard Dining": "D-Halls",
                Streets: "Streets",
                "Athletics Facilities": "Athletics",
                "Harvard Residential Houses": "Housing",
                "Departments, Centers,": "Departments",
                "Departments, Centers, Institutes": "Departments"
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showDetail: nextProps.showDetail
        });
    }

    _handleItemClick = () => {
        this.setState({ showDetail: !this.state.showDetail }, () => {
            this.props.clickHandler(this.state.id, this.state.showDetail);
        });
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
        return <ul>{liItems}</ul>;
    };

    render() {
        const subCategories = this._renderSubCategories();
        const { name, showDetail } = this.state;
        return (
            <ListItem
                button
                onClick={this._handleItemClick}
                style={styles.listItem}
                divider={true}
            >
                <Flexbox flexDirection="column">
                    <div>{name}</div>
                    {showDetail && subCategories}
                </Flexbox>
            </ListItem>
        );
    }
}

const styles = {
    button: {
        width: "100%"
    },
    listItem: {
        width: "100%"
    }
};

export default SearchResultItem;

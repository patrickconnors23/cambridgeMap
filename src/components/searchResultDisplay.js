import React, { Component } from "react";
import Flexbox from "flexbox-react";
import SearchResultItem from "./searchResultItem";
import { Button } from "@material-ui/core";
import elephant from "../img/elephant.json";
import robot from "../img/robot.json";
import MenuTypePrompt from "./typePrompt";

class SearchResultDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasText: this.props.hasText,
            results: this.props.results,
            showDetail: this.props.zoomedIn
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.results,
            hasText: nextProps.hasText,
            showDetail: nextProps.zoomedIn
        });
    }

    _menuItemClick = (id, expandingDetail) => {
        this.setState({ showDetail: expandingDetail }, () => {
            this.props.menuItemClickHandler(id, this.state.showDetail);
        });
    };

    _displayResultItems = () => {
        return this.state.results.map(result => {
            return (
                <SearchResultItem
                    key={result.id}
                    item={result}
                    clickHandler={this._menuItemClick}
                    showDetail={this.state.showDetail}
                />
            );
        });
    };

    _seeAllCick = () => {
        this.setState({ showDetail: false }, () => {
            this.props.menuItemClickHandler("", false);
        });
    };

    _determineRenderComponent = () => {
        const { results, hasText } = this.state;
        if (results.length > 20) {
            return (
                <MenuTypePrompt
                    text={
                        "Hiding " + results.length + " results... keep typing."
                    }
                    imgLink={elephant}
                />
            );
        } else if (results.length > 0) {
            return this._displayResultItems();
        } else if (hasText) {
            return (
                <MenuTypePrompt
                    text="Oops! Try another search."
                    imgLink={robot}
                />
            );
        } else {
            return <MenuTypePrompt text="Start typing!" imgLink={elephant} />;
        }
    };

    _showAllResultsButton = () => {
        if (this.state.showDetail) {
            return (
                <Flexbox flexDirection="row" justifyContent="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={this._seeAllCick}
                    >
                        See All
                    </Button>
                </Flexbox>
            );
        }
    };

    render() {
        return (
            <Flexbox flexDirection="column" justifyContent="space-between">
                <Flexbox
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <div style={styles.header}>Search Results</div>
                </Flexbox>
                <Flexbox
                    flexDirection="column"
                    justifyContent="center"
                    flexGrow={6}
                    alignItems="center"
                    style={styles.listContainer}
                >
                    <Flexbox
                        justifyContent="center"
                        flexDirection="column"
                        width="100%"
                    >
                        {this._determineRenderComponent()}
                    </Flexbox>
                </Flexbox>
                {this._showAllResultsButton()}
            </Flexbox>
        );
    }
}

const styles = {
    header: {
        alignContent: "center",
        fontSize: "20px",
        paddingTop: "50px",
        paddingBottom: "20px"
    },
    listContainer: {
        paddingBottom: "20px"
    }
};

export default SearchResultDisplay;

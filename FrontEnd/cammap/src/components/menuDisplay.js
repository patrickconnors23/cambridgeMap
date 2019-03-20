import React, { Component } from "react";
import Flexbox from "flexbox-react";
import SearchResultItem from "./searchResultItem";

class SearchResultDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasText: this.props.hasText,
            results: this.props.results
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.results,
            hasText: nextProps.hasText
        });
    }

    _menuItemClick = (id, expandingDetail) => {
        this.props.menuItemClickHandler(id, expandingDetail);
    };

    _displayResultItems = () => {
        return this.state.results.map(result => {
            return (
                <SearchResultItem
                    key={result.id}
                    item={result}
                    clickHandler={this._menuItemClick}
                />
            );
        });
    };

    _determineRenderComponent = () => {
        const { results, hasText } = this.state;
        if (results.length > 20) {
            return <div>Hiding {results.length} results... keep typing.</div>;
        } else if (results.length > 0) {
            return this._displayResultItems();
            // return <div>We've got som5e search Result2s</div>;
        } else if (hasText) {
            return <div>Oops! Try another search</div>;
        } else {
            return <div>Start Typing</div>;
        }
    };

    render() {
        return (
            <Flexbox flexDirection="column" justifyContent="space-between">
                <Flexbox
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="center"
                >
                    <div
                        style={{
                            alignContent: "center",
                            fontSize: "20px",
                            paddingTop: "50px"
                        }}
                    >
                        Search Results
                    </div>
                </Flexbox>
                <Flexbox
                    flexDirection="column"
                    justifyContent="center"
                    flexGrow={6}
                    alignItems="center"
                >
                    <Flexbox justifyContent="center" flexDirection="column">
                        {this._determineRenderComponent()}
                    </Flexbox>
                </Flexbox>
            </Flexbox>
        );
    }
}

export default SearchResultDisplay;

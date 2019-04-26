import React, { Component } from "react";
import ReactBodymovin from "react-bodymovin";
import Flexbox from "flexbox-react";

class MenuTypePrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgLink: this.props.imgLink,
            text: this.props.text
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                imgLink: nextProps.imgLink,
                text: nextProps.text
            });
        }
    }
    _createOptions = () => {
        return {
            loop: true,
            autoplay: true,
            prerender: true,
            animationData: this.state.imgLink
        };
    };

    render() {
        const { text } = this.state;
        const options = this._createOptions();
        return (
            <Flexbox flexDirection="column" alignItems="center">
                <h4>{text}</h4>
                <ReactBodymovin options={options} />
            </Flexbox>
        );
    }
}

export default MenuTypePrompt;

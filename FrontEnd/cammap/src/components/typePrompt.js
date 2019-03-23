import React, { Component } from "react";
import ReactBodymovin from "react-bodymovin";
import Flexbox from "flexbox-react";

class MenuTypePrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imglink: this.props.imgLink,
            text: this.props.text
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            imgLink: nextProps.imgLink,
            text: nextProps.text
        });
    }
    _createOptions = link => {
        return {
            loop: true,
            speed: this.props.speed,
            autoplay: true,
            prerender: true,
            animationData: link
        };
    };

    render() {
        const { text, imglink } = this.state;
        const options = this._createOptions(imglink);
        return (
            <Flexbox flexDirection="column" alignItems="center">
                <h4>{text}</h4>
                <ReactBodymovin options={options} />
            </Flexbox>
        );
    }
}

const styles = {
    logo: {
        heigh: "100px",
        width: "100px",
        margin: "30px"
    }
};

export default MenuTypePrompt;

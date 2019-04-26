import React, { Component } from "react";
import ReactBodymovin from "react-bodymovin";

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: this.props.link,
            isLottie: this.props.isLottie
        };
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
        const { link, isLottie } = this.state;
        if (isLottie) {
            const options = this._createOptions(link);
            return (
                <div style={styles.logo}>
                    <ReactBodymovin options={options} />
                </div>
            );
        } else {
            return (
                <div style={styles.logo}>
                    <img height="100" width="100" src={link} alt="link" />
                </div>
            );
        }
    }
}

const styles = {
    logo: {
        heigh: "100px",
        width: "100px",
        margin: "30px"
    }
};

export default Logo;

import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
// import Toolbar from '@material-ui/core/Toolbar';
// import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as  Link, Redirect } from "react-router-dom";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            toMap: false
        }
    }

    _handleQueryUpdate = event => {
        this.setState({
            query: event.target.value
        });
    }

    _handleSubmit = () => {
        this.setState({
            toMap: true
        });
    }

    _handleKeySubmit = event => {
        if (event.key === "Enter"){
            this._handleSubmit();
        }
    }

    render() {
        if (this.state.toMap === true) {
            return <Redirect to= {{
                pathname: "/map",
                state: {query: this.state.query}
            }}/>
        } else { 
            return (
                <div> 
                    <div>TITLE</div>
                    <TextField 
                        color="primary"
                        autoFocus={true}
                        fullWidth={true}
                        value={this.state.query}
                        onKeyPress={this._handleKeySubmit}
                        onChange={this._handleQueryUpdate}
                        placeholder="Search for buildings, i.e. William James"
                        inputProps={{
                            style: { textAlign: "center" }
                        }}
                    >
                    </TextField>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={this._handleSubmit}
                    >
                        Search
                    </Button>
                </div>
            )
        }
    }
}

export default Home;
import React from 'react';
import MarketWindow from '../Pages/OldPages/MarketWindow/marketwindow';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme, Typography, Grid, Container, Paper, Divider, Button } from '@material-ui/core';


type gBprops = {
    text: string;
    sessionID?: string;
    onClick: any;
}

type gBstate = {
    showMarketWindow: boolean
}

class generalButton extends React.Component<gBprops,gBstate> {
    constructor(props: any) {
        super(props);
        this.state = {
            showMarketWindow : false,
        }
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.onClick(this.props.sessionID);
        //this.setState({ showMarketWindow: !this.state.showMarketWindow });
        //console.log(this.props.sessionID);
    }
    render() {
        return (
            <Button style={{ height: "56px", width: "70%", marginBottom: 1 }} variant="contained" color="secondary" onClick={this.handleClick}>
                {this.props.text}
            </Button>
        );
    }
}
export default generalButton;
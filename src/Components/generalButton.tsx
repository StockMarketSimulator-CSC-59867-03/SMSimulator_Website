import React from 'react';
import MarketWindow from '../RouteComponents/MarketWindow/marketwindow';
import { Link } from 'react-router-dom';


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
            <div>
                <button 
                    style={{ height: "56px", width: "100%" }}
                    onClick={this.handleClick}>
                    {this.props.text}
                </button>
             </div>
               );
    }
}
export default generalButton;
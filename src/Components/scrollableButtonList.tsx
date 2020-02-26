import React from 'react';
import GeneralButton from './generalButton';

type sbProps = {};
type sbState = {
    stocks: object[]

};

class scrollableButtonList extends React.Component<sbProps,sbState> {
    constructor(props : any) {
        super(props);
        this.state = {
            stocks: this.getStocks()
            
        }

        // This binding is necessary to make `this` work in the callbac
        this.handleClick = this.handleClick.bind(this);
    }
    getStocks() {
        var stockSymbols: string[];
        var toButtons: object[];
        stockSymbols = ["tsla", "ba", "mcst", "fb","a","b","c","d","e","f","g","h","i"];
        toButtons = [];
        for (let i in stockSymbols) {
            toButtons.push(<GeneralButton/>)
        }
        return toButtons;


    }
    // Need to create usable functions to bind
    handleClick() {
        this.setState(state => ({/* bind to action*/ }));
    }

    render() {
 
        return (
            <div>
                {this.state.stocks}
             </div>
               );
    }
}
export default scrollableButtonList;
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
            stocks: [<GeneralButton />, <GeneralButton />]
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    // Need to create usable functions to bind
    handleClick() {
        this.setState(state => ({/* bind to action*/ }));
    }

    render() {
 
        return (
            <div>
                <h1> Button List </h1>
                {this.state.stocks}
             </div>
               );
    }
}
export default scrollableButtonList;
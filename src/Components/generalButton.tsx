import React from 'react';


type SGprops = {
    text: string;
}

class generalButton extends React.Component {
    constructor(props : any) {
        super(props);
        this.state = { };

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
                <button 
                    style={{ height: "56px", width: "100%" }}
                    onClick={this.handleClick}> test
                </button>
             </div>
               );
    }
}
export default generalButton;
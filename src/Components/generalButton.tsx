import React from 'react';


type SGprops = {
    onClick?: any;
}

class generalButton extends React.Component<SGprops> {
    constructor(props : any) {
        super(props);
        this.state = { };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    // Need to create usable functions to bind
    handleClick() {
        if(this.props.onClick){
            this.props.onClick();
        }
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
import React from 'react';

type OSProps = {};
type OSState = {
    stockList: [],
};

class OwnedStocks extends React.Component<OSProps, OSState>{
    constructor(props:any){
        super(props);
        this.state = {
            stockList: []
        }
    }

    render() {
        return(
            <div>
                <p>{this.state.stockList.length === 0 ? "You don't own any stocks" : ""}</p>
            </div>
        );
    }
}

export default OwnedStocks;
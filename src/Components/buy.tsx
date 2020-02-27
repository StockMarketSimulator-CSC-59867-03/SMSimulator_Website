import React from 'react';
import StockGraph from './stockGraph';

type BuyProps = {
    show: boolean,
    handleClose: any,
};
type BuyState = {
    inputNumShares : number,
    inputBid       : number,
    minimumBid     : number
};
class Buy extends React.Component<BuyProps, BuyState>{
    constructor(props : any){
        super(props);
        this.state = {
            inputNumShares: 0,
            inputBid:       0,
            minimumBid:     0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event : any) {
        let value;
        event.target.value <= 0 ? value = 0 : value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        })
    }

    handleSubmit(event : any) {
        alert("Order submitted");
        event.preventDefault();
    }

    // data = [{ name:"9:30 AM", price: 911.12},{ name:"9:35 AM", price: 899.36},{ name:"9:40 AM",price: 902.45},{ name: "9:45 AM", price: 909.07},{name:"9:45 AM", price: 906.17},{name:"9:50 AM", price: 908.23},{ name:"9:55 AM",price: 903.42}];


    render() {
        let var_total = this.state.inputNumShares * this.state.inputBid;
        const display = this.props.show ? "block" : "none";
        return (
            <div style={{display: display, border: "solid"}}>
                <h1>Buy Shares</h1>
                {/* <div>
                    <StockGraph width={500} height={300} data={this.data} />
                </div> */}
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Number of Shares: <input type="number" name="inputNumShares" onChange={this.handleChange}></input></label>
                        <br/>
                        <label>Bid (min {this.state.minimumBid}): $<input type="number" step="0.01" name="inputBid" onChange={this.handleChange}></input></label>
                        <br/>
                        <label>Total ({this.state.inputNumShares} x {this.state.inputBid}): ${var_total}</label>
                        <br />
                        <br/>
                        <input type="submit" value="Place Order"/>
                    </form>
                </div>
                <button onClick={this.props.handleClose}>Close</button>
            </div>
        );
    }
}
export default Buy;
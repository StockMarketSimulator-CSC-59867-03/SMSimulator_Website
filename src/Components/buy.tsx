import React from 'react';

type BuyProps = {};
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

    render() {
        let var_total = this.state.inputNumShares * this.state.inputBid;
        return (
            <div>
                <h1>Buy Shares</h1>
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
            </div>
        );
    }
}
export default Buy;
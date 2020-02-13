import React from 'react';

type SellProps = {};
type SellState = {
    inputNumShares : number,
    inputAsk       : number,
    minimumAsk     : number,
};
class Sell extends React.Component<SellProps, SellState>{
    constructor(props : any){
        super(props);
        this.state = {
            inputNumShares: 0,
            inputAsk:       0,
            minimumAsk:     0,
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
        let var_total = this.state.inputNumShares * this.state.inputAsk;
        return (
            <div>
                <h1>Sell Shares</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Number of Shares: <input type="number" name="inputNumShares" onChange={this.handleChange}></input></label>
                        <br/>
                        <label>Ask (min {this.state.minimumAsk}): $<input type="number" step="0.01" name="inputBid" onChange={this.handleChange}></input></label>
                        <br/>
                        <label>Total ({this.state.inputNumShares} x {this.state.inputAsk}): ${var_total}</label>
                        <br />
                        <br/>
                        <input type="submit" value="Place Order"/>
                    </form>
                </div>
            </div>
        );
    }
}
export default Sell;
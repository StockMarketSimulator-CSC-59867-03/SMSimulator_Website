import React from 'react';
import firebase from 'firebase';
import StockGraph from '../../../Components/StockGraph/stockGraph';
import BuyModal from '../../../Components/BuyModal/BuyModal';
import SellModal from '../../../Components/SellModal/SellModal';
import { Link } from 'react-router-dom';

type SDProps = {
    location: any,
    stockName: string
};
type SDState = {
    showBuyModal: boolean,
    showSellModal: boolean,
    stockName: string,
};
class StockData extends React.Component<SDProps, SDState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showBuyModal: false,
            showSellModal: false,
            stockName: "",

        }

        console.log(`${this.props.location.stockData} ?>>>>>>>>>>>>`);

        this.showBuyModal = this.showBuyModal.bind(this);
        this.hideBuyModal = this.hideBuyModal.bind(this);

        this.showSellModal = this.showSellModal.bind(this);
        this.hideSellModal = this.hideSellModal.bind(this);
    }

    showBuyModal() {
        this.setState({showBuyModal: true});
    }

    hideBuyModal() {
        this.setState({showBuyModal: false});
    }

    showSellModal() {
        this.setState({showSellModal: true});
    }

    hideSellModal() {
        this.setState({showSellModal: false});
    }

    componentDidMount() {
        this.getData("MSFT");
    }

    getData(ticker:string) {
        const db = firebase.firestore();
        let current_sessionStock = db.collection('Sessions').doc("4Spr6UEpMQsyC7FUwrlh").collection('Stocks').doc(ticker);
        let res = "";
        current_sessionStock.get().then((querySnapshot : any) => {
            if(querySnapshot.exists) {
                res = querySnapshot.data()['name'];
            }
            this.setState({stockName: res});
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    data = [{ name:"9:30 AM", price: 911.12},{ name:"9:35 AM", price: 899.36},{ name:"9:40 AM",price: 902.45},{ name: "9:45 AM", price: 909.07},{name:"9:45 AM", price: 906.17},{name:"9:50 AM", price: 908.23},{ name:"9:55 AM",price: 903.42}];

    render() {
        return(
            <div style={{
                textAlign: "center",
            }}>
                <h1>Market Data</h1>
                <h3>{this.state.stockName}</h3>
                <div><StockGraph name={this.props.location.stockData.name} domain={this.props.location.stockData.domain} width={500} height={300} data={this.props.location.stockData.data} /></div>
                <p>Stock Data Goes Here</p>
                <button onClick={this.showBuyModal}>Buy</button>
                <BuyModal show={this.state.showBuyModal} handleClose={this.hideBuyModal}/>
                <button onClick={this.showSellModal}>Sell</button>
                <SellModal show={this.state.showSellModal} handleClose={this.hideSellModal}/>
                <Link to="/"> Back to home </Link>
            </div>
        );
    }
}
export default StockData;
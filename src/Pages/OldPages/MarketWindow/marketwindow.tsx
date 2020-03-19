import React from 'react';
import MarketWindowModel from './MarketWindow.model'
import StockGraph from "../../../Components/StockGraph/stockGraph";
import { connect, useSelector } from 'react-redux';

type MWProps = {
  sessionData: any
};
type MWState = {
  sessionTitle: string;
  showModal: boolean;
  showPortfolio: boolean;
  stockData: Map<any, any>;
};
class MarketWindow extends React.Component<MWProps, MWState> {
  private marketWindowModel: MarketWindowModel;
  constructor(props: any) {
    super(props);
    this.state = {
      sessionTitle: props.sessionData.id,
      showModal: false,
      showPortfolio: false,
      stockData: new Map()
    };

    this.marketWindowModel = new MarketWindowModel(props.sessionData.id);

    this.marketWindowModel.stockDataSubject.subscribe(value => {
      console.log("From Subscription");
      console.log(value);
      this.setState({
        ...this.state,
        stockData: value
      });
    });
  }

  calculateDomain(value : Array<any>){
    let min = 1000000;
    let max = 0;
    for(let i = 0; i < value.length; i++){
        let price = value[i]["price"]
        if(price < min){
            min = price;
        }
        if(price > max){
            max = price;
        }
    }
    return [min - 20, max + 20];
  }

  render() {
    let stockGraphs = [];
    for (const [key, value] of this.state.stockData.entries()) {
      let domain = this.calculateDomain(value);
      stockGraphs.push(
        <div style={{display: 'flex', borderBottom: '1px solid black'}}>
          <div>
            <p>{key}</p>
            <p style={{backgroundColor: 'red', color: 'white', padding: '2px'}}>-6.21%</p>
          </div>
          <div style={{flexGrow: 1}}/>
          <StockGraph name={key} domain={domain} data={value} handleClick={() => {}} width={100} height={80}></StockGraph>
        </div>
      );
    }

    return (
      <div>
        {[...stockGraphs]}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sessionData: state.sessionData
});

export default connect(mapStateToProps)(MarketWindow);

import React from 'react';
import { Link } from 'react-router-dom';

import MarketWindowModel from './MarketWindow.model'
import SessionService from '../../Services/sessionService';
import EventInjectionModal from '../../Components/EventInjectionModal/EventInjectionModal';

import StockGraph from "../../Components/stockGraph";

import { Subject } from "rxjs";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

type MWProps = {
  sessionService: SessionService;
  history: any,
};
type MWState = {
  sessionTitle: string;
  showModal: boolean;
  showPortfolio: boolean;
  stockData: Map<any, any>;
};
class MarketWindow extends React.Component<MWProps, MWState> {
  private marketWindowModel: MarketWindowModel;
  private sessionService: SessionService;
  constructor(props: any) {
    super(props);
    this.state = {
      sessionTitle: "session_id",
      showModal: false,
      showPortfolio: false,
      stockData: new Map()
    };

    this.sessionService = props.sessionService;
    this.marketWindowModel = new MarketWindowModel(
      this.sessionService.getSessionID()
    );

    this.marketWindowModel.stockDataSubject.subscribe(value => {
      console.log("From Subscription");
      console.log(value);
      this.setState({
        ...this.state,
        stockData: value
      });
    });

    this.showInjectionModal = this.showInjectionModal.bind(this);
    this.hideInjectionModal = this.hideInjectionModal.bind(this);

    this.showPortfolio = this.showPortfolio.bind(this);
    this.hidePortfolio = this.hidePortfolio.bind(this);
  }

  showInjectionModal() {
    //here we want to create a pop-up window where the admin can queue a shock/event
    this.setState({ showModal: true });
  }

  hideInjectionModal() {
    this.setState({ showModal: false });
  }

  showPortfolio() {
    this.setState({
      showPortfolio: true
    });
  }

  hidePortfolio() {
    this.setState({
      showPortfolio: false
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

  handleClick = (stockData: any) => {
    console.log(stockData);
    console.log(">>>>>>>>>>>>>>>>>>>>");
    this.props.history.push({pathname:"/stockdata", stockData:stockData});
  }

  render() {
    let stockGraphs = [];
    for (const [key, value] of this.state.stockData.entries()) {

        let domain = this.calculateDomain(value);


      stockGraphs.push(
        <div >
          <StockGraph name={key} domain={domain} data={value} handleClick={this.handleClick}></StockGraph>
        </div>
      );
    }

    let current_user = "admin"; //the view should change depending on if a regular user or admin is viewing it
    const isViewingPortfolio = this.state.showPortfolio;
    let button;
    if (current_user === "admin") {
      button = <button onClick={this.showInjectionModal}>Shock Input</button>; //only admins can inject shocks
    } else {
      if (isViewingPortfolio)
        button = <button onClick={this.hidePortfolio}>View Market</button>;
      //only users can view their portfolio
      else
        button = <button onClick={this.showPortfolio}>View Portfolio</button>;
    }
    return (
      <div style={{textAlign:"center"}}>
 
        <h1>Market Window</h1>
        <Link to="/"> Back to home </Link>
        <h3>{this.state.sessionTitle}</h3>
        <EventInjectionModal
          show={this.state.showModal}
          handleClose={this.hideInjectionModal}
        />
        <div>
          {isViewingPortfolio ? (<p>Showing Portfolio Graph</p>) : (<p>Showing Market Graph</p>)}
        </div>

        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
          {[...stockGraphs]}
        </Grid>

        <div>{button}</div>
      </div>
    );
  }
}
export default MarketWindow;

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { useSelector } from 'react-redux';
import StockGraph from '../../Components/StockGraph/stockGraph';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      list: {
        flexWrap: 'nowrap',
        overflow: 'auto',
      }
  }),
);

export default function WatchedStocks(props:any) {
    const classes = useStyles();
    let stocks = useSelector((state: any) => state.stockData); //handle for global stockData
    let stockGraphs: JSX.Element[] = []; //array of stocks we want to display

    console.log("hello from watchedstocks:", props.currentUserData.watchedStocks);
    let key = "session" + props.sessionData.id + "watchedstocks";
    let stocksToList:any; //= props.currentUserData.watchedStocks;
    if(localStorage.getItem(key)?.split(",") === undefined){
      stocksToList = [];
    }
    else {
      stocksToList = localStorage.getItem(key)?.split(",")
    }

    if(!stocksToList) {
      return(<div></div>)
    }

    Object.entries(stocks).forEach((stock:any) => {
      let tickerSymbol = stock[1].data['symbol'];
      let graphDomain = stock[1].domain;
      let stockHistory = stock[1].history;
      if(stocksToList.indexOf(tickerSymbol) !== -1){
        stockGraphs.push(
          <div style={{display: 'flex', borderTop: '1px solid black', margin: '2px'}}>
              <div>
                <p>{tickerSymbol}</p>
                <p style={{backgroundColor: 'red', color: 'white', padding: '2px', borderRadius: 3}}>-6.21%</p>
              </div>
              <div style={{flexGrow: 1}}/>
              <div style={{display: 'flex'}}>
                <StockGraph name={tickerSymbol} domain={graphDomain} data={stockHistory} handleClick={() => {}} width={100} height={80}/>
              </div>
          </div>
        )
      }
    })

    return (
      <GridList className={classes.list} cols={3.5} cellHeight='auto'>
        {[...stockGraphs]}
      </GridList>
    );
}
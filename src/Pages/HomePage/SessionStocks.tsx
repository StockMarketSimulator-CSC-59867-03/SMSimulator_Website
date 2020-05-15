import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, List, ListItem, Card, GridList, GridListTile, ListItemText, GridListTileBar } from '@material-ui/core';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchList } from '../../redux/actions';
import { lightBlue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      paper: {
        display: 'flex',
        // justifyContent: 'space-between',
        margin: 50,
      },
      gridList: {
        flexWrap: 'nowrap',
      },
      titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
      title: {
        color: "white",
      },
  }),
);

function SessionStocks(props:any) {
  let stocks = useSelector((state: any) => state.stockData); //handle for global stockData
  let dispatch = useDispatch();
  let key = "session" + props.sessionData.id + "watchedstocks";
  let watchedStocks: any;
  if(localStorage.getItem(key)?.split(",") === undefined){
    watchedStocks = [];
  }
  else {
    watchedStocks = localStorage.getItem(key)?.split(",")
  }
  let stockGraphs: JSX.Element[] = []; //array of stocks we want to display

  const handleChange = (event:any) => {
    const target = event.target;
    const tickerSymbol = target.name;
    const isChecked = target.checked;
    if(isChecked)
    {
      watchedStocks.push(tickerSymbol);
    }
    else
    {
      let index = watchedStocks.indexOf(tickerSymbol);
      watchedStocks.splice(index, 1); //remove the stock from the list
    }
    console.log(watchedStocks);
    dispatch(addToWatchList(watchedStocks)); //update watchlist
    // localStorage.clear();
    localStorage.setItem(key, watchedStocks);
    console.log(localStorage.getItem(key)?.split(","));
  }

  Object.entries(stocks).forEach((stock:any) => {
    let tickerSymbol = stock[1].data['symbol'];
    let graphDomain = stock[1].domain;
    let stockHistory = stock[1].history;
    let isWatched;

    let stockData = stocks[tickerSymbol];
    var percentageChange = '0';
    var isGain = true;
    if(stockData != null && stockData.history != null){
      var lastStockPrice = (stockData.history[stockData.history.length - 1]["price"]);
      var firstStockPrice = (stockData.history[0]["price"]);
      var priceDiff = (lastStockPrice - firstStockPrice);
      percentageChange = ((priceDiff/firstStockPrice)*100).toFixed(2);
      var isGain = (priceDiff > 0);
    }

    if(watchedStocks.indexOf(tickerSymbol) !== -1)
      isWatched = true;
    else
      isWatched = false;

      stockGraphs.push(
        <Paper style={{marginTop:10}} elevation={3} variant="outlined">
    
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{ padding: 10 }}
        >
              <Typography variant="h6" component="h6">
                  {tickerSymbol}
              </Typography>
  
              <StockGraph domain={graphDomain} data={stockHistory}  width={100} height={80} animationOn={false} showToolTip={false}></StockGraph>  
              <div>
          <Typography style={{ color: "white" }} variant="h6">
            ${(lastStockPrice != null) ? lastStockPrice.toFixed(2) : lastStockPrice}
          </Typography>
          <div>
            <Typography style={{
                  color: isGain ? lightBlue[300] : "red",
                }} variant="body2" component="h6">

                {props.gain > 0 ? "+" : ""}
                {percentageChange}%
            </Typography>
          </div>
          </div>
        </Grid>
        </Paper>
      )


    
  })

  return (
      <GridList cols={1} cellHeight='auto'>
          {[...stockGraphs]}
      </GridList>
  );
}

export default SessionStocks;
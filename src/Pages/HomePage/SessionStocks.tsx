import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, List, ListItem, Card, GridList, GridListTile, ListItemText, GridListTileBar } from '@material-ui/core';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchList } from '../../redux/actions';

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

    if(watchedStocks.indexOf(tickerSymbol) !== -1)
      isWatched = true;
    else
      isWatched = false;

    stockGraphs.push(
      <div style={{display: 'flex', borderTop: '1px solid black'}}>
          <div>
            <p>{tickerSymbol}</p>
            <p style={{backgroundColor: 'red', color: 'white', padding: '2px', borderRadius: 3}}>-6.21%</p>
          </div>
          <div style={{flexGrow: 1}}/>
          <div style={{display: 'flex'}}>
            <StockGraph name={tickerSymbol} domain={graphDomain} data={stockHistory} handleClick={() => {}} width={100} height={80}/>
            <input name={tickerSymbol} type="checkbox" onChange={handleChange} checked={isWatched}/>
          </div>
      </div>
    )
  })

  return (
      <GridList cols={1} cellHeight='auto'>
          {[...stockGraphs]}
      </GridList>
  );
}

export default SessionStocks;
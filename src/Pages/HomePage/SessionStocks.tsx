import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, List, ListItem, Card, GridList, GridListTile, ListItemText, GridListTileBar } from '@material-ui/core';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { useSelector } from 'react-redux';

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
  let stockGraphs: JSX.Element[] = []; //array of stocks we want to display

  Object.entries(stocks).forEach((stock:any) => {
    let tickerSymbol = stock[1].data['symbol'];
    let graphDomain = stock[1].domain;
    let stockHistory = stock[1].history;

    stockGraphs.push(
      <div style={{display: 'flex', borderTop: '1px solid black'}}>
          <div>
            <p>{tickerSymbol}</p>
            <p style={{backgroundColor: 'red', color: 'white', padding: '2px', borderRadius: 3}}>-6.21%</p>
          </div>
          <div style={{flexGrow: 1}}/>
          <div style={{display: 'flex'}}>
            <StockGraph name={tickerSymbol} domain={graphDomain} data={stockHistory} handleClick={() => {}} width={100} height={80}/>
            <input type="checkbox"/>
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
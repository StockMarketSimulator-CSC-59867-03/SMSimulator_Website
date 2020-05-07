import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import StockGraph from '../StockGraph/stockGraph';
import { green, lightBlue } from '@material-ui/core/colors';
import { useSelector } from "react-redux";

import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';

function StockListItem(props: any) {
  console.log(props.stockData.symbol);
  const allStockData = useSelector((state: any) => state.stockData);
  let stockData = allStockData[props.stockData.symbol];

  
  let stockPrice = "0.00";
  if(stockData != null && stockData.history != null ){
    stockPrice = (stockData.history[stockData.history.length - 1]["price"]).toFixed(2);
  }
  

  

  return (
    <Paper style={{marginTop:10}} elevation={2}>
    
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ padding: 10 }}
        onClick={()=>{props.onClick(props.stockData.symbol)}}
      >
            <Typography variant="h6" component="h6">
                {props.stockData.symbol}
            </Typography>

            <StockGraph domain={stockData.domain} data={stockData.history}  width={100} height={80} animationOn={false} showToolTip={false}></StockGraph>
            <Typography style={{color: 'lightgray'}} variant="h6" component="h6">
                {stockPrice}
            </Typography>

      </Grid>
      </Paper>
  );
}

export default StockListItem;
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./StockView.scss"
import { useSelector } from "react-redux";
import { lightBlue } from '@material-ui/core/colors';

function StockViewHeader(props: any) {
  const allStockData = useSelector((state: any) => state.stockData);
  let stockData = allStockData[props.symbol];
  var lastStockPrice = (stockData.history[stockData.history.length - 1]["price"]);
  var firstStockPrice = (stockData.history[0]["price"]);
  var priceDiff = (lastStockPrice - firstStockPrice);
  var actualChange = priceDiff.toFixed(2);
  var percentageChange = ((priceDiff/firstStockPrice)*100).toFixed(2);
  var isGain = (priceDiff > 0);

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className="bottomBorder" 
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ paddingTop: 25, paddingLeft: 25, paddingRight: 25 }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h2" component="h6">
            ${props.price}
          </Typography>
          <Typography variant="h3" component="h6">
            {props.symbol}
          </Typography>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" component="h6">
            <span style={isGain ? { color: lightBlue[300] } : {color: "red"}}>{actualChange} ({percentageChange}%)</span>
            <span> TODAY</span>
          </Typography>
          <Typography variant="subtitle1" component="h6">
            <span style={{ color: lightBlue[300] }}>{props.name}</span>
            <span> | {props.sector}</span>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StockViewHeader;

import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { green } from '@material-ui/core/colors';
import { useSelector } from "react-redux";
import { lightBlue } from '@material-ui/core/colors';

import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';

function OwnedStockItem(props: any) {

  
  let stockPrice = "0.00";
  let isGain = props.gain > 0;
  

  

  return (
    <Paper elevation={2}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ padding: 10 }}
        onClick={() => {
          /*props.onClick(props.stockData.symbol)*/
        }}
      >
        <div>
          <Typography variant="h6" component="h6">
            {props.name}
          </Typography>
          <Typography style={{ color: "gray" }} variant="caption">
            {props.quantity} Shares - ${props.price}
          </Typography>
        </div>

        <StockGraph
          domain={props.graphDomain}
          data={props.stockHistory}
          width={100}
          height={80}
          animationOn={false}
          showToolTip={false}
        ></StockGraph>
        <div>
          <Typography style={{ color: "white" }} variant="h6">
            ${props.value.toLocaleString()}
          </Typography>
          <div>
            <Typography style={{
                  color: isGain ? lightBlue[300] : "red",
                }} variant="body2" component="h6">

                {props.gain > 0 ? "+" : ""}
                {props.gain.toFixed(2)}%
            </Typography>
          </div>
        </div>
      </Grid>
    </Paper>
  );
}

export default OwnedStockItem;
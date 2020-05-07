import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { green } from '@material-ui/core/colors';
import { useSelector } from "react-redux";

import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';

function OwnedStockItem(props: any) {

  
  let stockPrice = "0.00";

  

  

  return (
    <Paper style={{ marginTop: 10 }} elevation={2}>
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
            Apple Inc.
          </Typography>
          <Typography style={{ color: "gray" }} variant="caption">
            5 Shares - $400.00
          </Typography>
        </div>

        <StockGraph
          width={100}
          height={80}
          animationOn={false}
          showToolTip={false}
        ></StockGraph>
        <div>
        <Typography style={{ color: "lightblue" }} variant="h6">
            $10,000
          </Typography>
        <Typography style={{ color: "green" }} variant="subtitle1" component="h6">
         +2.31%
        </Typography>

        </div>
      </Grid>
    </Paper>
  );
}

export default OwnedStockItem;
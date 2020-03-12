import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import StockGraph from '../StockGraph/stockGraph';
import { green } from '@material-ui/core/colors';

function StockListItem(props: any) {
  return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ borderTop: "3px solid black", padding: 10 }}
        onClick={()=>{props.onClick(props.stockData)}}
      >
            <Typography variant="h6" component="h6">
                {props.stockData.symbol}
            </Typography>

            <StockGraph width={100} height={80}></StockGraph>

            <Typography style={{color: "green"}} variant="h6" component="h6">
                {props.stockData.price}
            </Typography>

      </Grid>
  );
}

export default StockListItem;
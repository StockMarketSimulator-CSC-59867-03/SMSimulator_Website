import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import StockGraph from '../StockGraph/stockGraph';
import { green } from '@material-ui/core/colors';
import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';

function StockListItem(props: any) {
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

            <StockGraph width={100} height={80}></StockGraph>

            <Typography style={{color: "green"}} variant="h6" component="h6">
                {props.stockData.price}
            </Typography>

      </Grid>
      </Paper>
  );
}

export default StockListItem;
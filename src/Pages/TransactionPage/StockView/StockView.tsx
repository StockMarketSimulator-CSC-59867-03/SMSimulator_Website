import React, { useState } from "react";
import "../TransactionPage.scss";
import { Grid, Button } from "@material-ui/core";
import StockViewHeader from "./StockViewHeader";
import StockGraph from "../../../Components/StockGraph/stockGraph";
import StockViewFooter from "./StockViewFooter";
import './StockView.scss'
import { useSelector } from "react-redux";

function StockView() {
  const stockData = useSelector((state: any) => state.selectedStockData);
  let showData = stockData.hasData;

  if (showData == false){
    return (<div></div>);
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="stretch"
    >
      <StockViewHeader price={stockData.price} sector={stockData.sector} symbol={stockData.symbol} name={stockData.name}></StockViewHeader>
      <Grid container direction="row" justify="center" alignItems="center" className="bottomBorder" >
        <StockGraph width={1000} height={500}></StockGraph>
      </Grid>

      <StockViewFooter></StockViewFooter>

      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        style={{ paddingRight: 25, paddingBottom: 25, paddingTop: 25 }}
      >
        <Button variant="contained" color="primary">
          Buy
        </Button>
        <div style={{ paddingLeft: 10 }}>
          <Button variant="contained" color="secondary">
            Sell
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default StockView;

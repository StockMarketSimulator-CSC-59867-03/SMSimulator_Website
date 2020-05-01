import React, { useState, useLayoutEffect, useRef } from "react";
import "../TransactionPage.scss";
import { Grid, Button } from "@material-ui/core";
import StockViewHeader from "./StockViewHeader";
import StockGraph from "../../../Components/StockGraph/stockGraph";
import StockViewFooter from "./StockViewFooter";
import './StockView.scss'
import BuyModalv2 from "../../../Components/BuyModalv2/BuyModalv2";
import SellModalv2 from "../../../Components/SellModalv2/SellModalv2";
import { useSelector } from "react-redux";
import { ButtonGroup } from '@material-ui/core';

function StockView() {
  const selectedStock = useSelector((state: any) => state.selectedStockData);
  const allStockData = useSelector((state: any) => state.stockData);
  
  if (selectedStock.hasData == null){
    return (<div></div>);
  }

  let stockData = allStockData[selectedStock.symbol];

  let stockPrice = (stockData.history[stockData.history.length - 1]["price"]).toFixed(2);


  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="stretch"
    >
      <StockViewHeader price={stockPrice} sector={stockData.data.sector} symbol={selectedStock.symbol} name={stockData.data.name}></StockViewHeader>
      <Grid container direction="row" justify="center" alignItems="center" className="bottomBorder" >
        <StockGraph domain={stockData.domain} data={stockData.history}  width={800} height={500}></StockGraph>
      </Grid>

      <StockViewFooter></StockViewFooter>

      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        style={{ paddingRight: 25, paddingBottom: 25, paddingTop: 25 }}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{ paddingRight: 25, paddingBottom: 25, paddingTop: 25 }}>
        <BuyModalv2/>
        <SellModalv2/>
        </Grid>
        
      </Grid>
    </Grid>
  );
}

export default StockView;

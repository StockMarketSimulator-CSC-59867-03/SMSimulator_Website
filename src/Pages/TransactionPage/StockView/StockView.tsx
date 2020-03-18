import React, { useState } from "react";
import "../TransactionPage.scss";
import { Grid, Button } from "@material-ui/core";
import StockViewHeader from "./StockViewHeader";
import StockGraph from "../../../Components/StockGraph/stockGraph";
import StockViewFooter from "./StockViewFooter";
import './StockView.scss'
import BuyModalv2 from "../../../Components/BuyModalv2/BuyModalv2";
import SellModalv2 from "../../../Components/SellModalv2/SellModalv2";

function StockView() {
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="stretch"
    >
      <StockViewHeader></StockViewHeader>
      <Grid container direction="row" justify="center" alignItems="center" className="bottomBorder" >
        <StockGraph width={1000} height={500}></StockGraph>
      </Grid>

      <StockViewFooter></StockViewFooter>

      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        style={{ paddingRight: 25, paddingBottom: 25, paddingTop: 25 }}>
        <BuyModalv2/>
        <div style={{ paddingLeft: 10 }}>
          <SellModalv2/>
        </div>
      </Grid>
    </Grid>
  );
}

export default StockView;

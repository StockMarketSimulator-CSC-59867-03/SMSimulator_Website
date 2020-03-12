import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./StockView.scss"

function StockViewHeader(props: any) {
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
            <span style={{ color: "green" }}>+10.73 (5.73%)</span>
            <span> TODAY</span>
          </Typography>
          <Typography variant="subtitle1" component="h6">
            <span style={{ color: "green" }}>{props.name}</span>
            <span>| {props.sector}</span>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StockViewHeader;

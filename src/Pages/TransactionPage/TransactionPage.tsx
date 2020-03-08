import React, { useState } from 'react';
import StockList from './StockList';
import StockView from './StockView';
import { Grid, Container } from '@material-ui/core';
import "./TransactionPage.scss";

function TransactionPage(){

    return(
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
            <div className="outlineBlack" style={{width:"15%", height:"100%"}}>

            </div>
            <div className="outlineBlack" style={{display:"inline-flex",width:"85%"}}>
                <StockList />
                <StockView />
            </div>
        </Grid>
    );
}

export default TransactionPage;
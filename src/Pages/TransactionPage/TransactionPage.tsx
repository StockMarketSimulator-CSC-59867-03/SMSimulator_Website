import React, { useState } from 'react';
import StockList from './StockList';
import StockView from './StockView/StockView';
import { Grid, Container } from '@material-ui/core';
import "./TransactionPage.scss";
import Button from '@material-ui/core/Button';

import { useHistory } from "react-router-dom";



function TransactionPage(){

    let history = useHistory();

    return(
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{height:"100%"}}
            
        >
            <div style={{width:"15%", height:"100%"}}>
                <Button variant="contained" color="primary" onClick={()=>{history.push("/")}}>
                    Home
                </Button>
            </div>
            <div  style={{display:"inline-flex",width:"85%", height:"100%"}}>
                <StockList />
                <StockView />
            </div>
        </Grid>
    );
}

export default TransactionPage;
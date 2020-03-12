import React, { useState } from 'react';
import StockList from './StockList/StockList';
import StockView from './StockView/StockView';
import { Grid, Container } from '@material-ui/core';
import "./TransactionPage.scss";
import Button from '@material-ui/core/Button';

import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { StockDataModel } from '../../DataModels/stockData.model';
import {setSelectedStockData} from '../../redux/actions';


function TransactionPage(){

    let history = useHistory();
    let dispatch = useDispatch();

    function clickedStock(symbol: string){
        let stockDataModel: StockDataModel = {
            symbol: symbol,
            name: "Tesla inc.",
            price: 405.12,
            sector: "Technlogy",
            history: ["data goes here"]

        }
        dispatch(setSelectedStockData(stockDataModel));
    }

    return(
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{height:"100%"}}
            
        >

            <div  style={{display:"inline-flex",width:"85%", height:"100%"}}>
                <StockList stockClick={clickedStock} />
                <StockView />
            </div>
        </Grid>
    );
}

export default TransactionPage;
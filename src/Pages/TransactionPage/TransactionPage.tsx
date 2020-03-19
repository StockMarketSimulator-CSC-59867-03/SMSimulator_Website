import React, { useState,useEffect } from 'react';
import StockList from './StockList/StockList';
import StockView from './StockView/StockView';
import { Grid, Container } from '@material-ui/core';
import "./TransactionPage.scss";
import Button from '@material-ui/core/Button';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { StockDataModel } from '../../DataModels/stockData.model';
import {setSelectedStockData} from '../../redux/actions';
import { TransactionPageModel } from './TransactionPage.model';
import { StockDataService } from '../../Services/StockDataService';
import StockData from '../OldPages/StockData/stockdata';



function TransactionPage(){

    let history = useHistory();
    let dispatch = useDispatch();
    let [stocks, setStocks] = useState([]);
    let stockData = useSelector((state: any) => state.stockData);

    useEffect(()=>{
        let stockListArray : any= [];
        Object.entries(stockData).forEach((data: any) => {
            stockListArray.push(data[1].data);
        });
        setStocks(stockListArray);
    },[stockData]);



    function clickedStock(symbol: string){
        let stockFromState = stockData[symbol];
        console.log(stockFromState.history);
        let stockDataModel: StockDataModel = {
            symbol: stockFromState.data.symbol,
            name: stockFromState.data.name,
            price: stockFromState.data.price,
            sector: stockFromState.data.sector,
            history: stockFromState.history,
            domain: stockFromState.domain

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
                <StockList stocks={stocks} stockClick={clickedStock} />
                <StockView />
            </div>
        </Grid>
    );
}

export default TransactionPage;
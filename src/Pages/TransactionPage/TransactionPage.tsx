import React, { useState,useEffect } from 'react';
import StockList from './StockList/StockList';
import StockView from './StockView/StockView';
import { Grid, Container } from '@material-ui/core';
import "./TransactionPage.scss";
import Button from '@material-ui/core/Button';

import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { StockDataModel } from '../../DataModels/stockData.model';
import {setSelectedStockData} from '../../redux/actions';
import { TransactionPageModel } from './TransactionPage.model';


const transactionPageModel = new TransactionPageModel();

function TransactionPage(){

    let history = useHistory();
    let dispatch = useDispatch();
    let [stocks, setStocks] = useState([]);

    useEffect(()=>{
        transactionPageModel.init("46o2WO6zHIR5OdWomsiT");
        transactionPageModel.stockListObservable.subscribe((data: any)=>{
           setStocks(data);
        });
    },[]);
    


    function clickedStock(stockData: any){
        let stockDataModel: StockDataModel = {
            symbol: stockData.symbol,
            name: stockData.name,
            price: stockData.price,
            sector: stockData.sector,
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
                <StockList stocks={stocks} stockClick={clickedStock} />
                <StockView />
            </div>
        </Grid>
    );
}

export default TransactionPage;
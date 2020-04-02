import React, { useState,useEffect } from 'react';
import StockList from './StockList/StockList';
import StockView from './StockView/StockView';
import "./TransactionPage.scss";
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { StockDataModel } from '../../DataModels/stockData.model';
import {setSelectedStockData} from '../../redux/actions';
import { TransactionPageModel } from './TransactionPage.model';
import { StockDataService } from '../../Services/StockDataService';
import StockData from '../OldPages/StockData/stockdata';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        flexGrow: 1,
      },
      container: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
      },
      paper: {
        padding: theme.spacing(2),
        height:"90vh"
      },
      stockView: {
      position:"fixed",
      right:"0px",
      width:"65%"
      },
      stockList: {
        height: '100%',
        width: '20%'
      },
      fixedHeightStocks: {
          marginTop: 15,
          height: 310,
      },
      button: {
          justifySelf: "center",
      },
      sessionStocks: {
          padding: theme.spacing(1),
          zIndex: 1,
          overflow: 'auto',
      },
      card: {
          padding: theme.spacing(2),
        //   height: 150,
          position: "absolute",
          alignSelf: "center",
          zIndex: 2,
          display: 'flex',
          flexWrap: "wrap",
          flexDirection: 'column',
          background: "lightGray",
      },
      preview: {
          paddingTop: theme.spacing(1),
          justifySelf: "left"
      },
      divider: {
          flexGrow: 1,
      }
  }),
);


function TransactionPage(){

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.stockView);
    const fixedHeightPaper2 = clsx(classes.paper, classes.stockList);

    let history = useHistory();
    let dispatch = useDispatch();
    let [stocks, setStocks] = useState([]);
    let stockData = useSelector((state: any) => state.stockData);
    let selectedStock = useSelector((state: any) => state.selectedStockData);

    useEffect(()=>{
        let stockListArray : any= [];
        Object.entries(stockData).forEach((data: any) => {
            stockListArray.push(data[1].data);
        });
        setStocks(stockListArray);
    },[stockData]);

    if(selectedStock.symbol == null && stocks.length > 0){
      let stockDataModel: StockDataModel = {
        symbol: stocks[0]["symbol"]
    }
      dispatch(setSelectedStockData(stockDataModel));
    }



    function clickedStock(symbol: string){
        let stockFromState = stockData[symbol];
        console.log(stockFromState.history);
        let stockDataModel: StockDataModel = {
            symbol: stockFromState.data.symbol
        }
        dispatch(setSelectedStockData(stockDataModel));
    }

    return (
        <Grid container  spacing={2}  >
          <Grid item xs={3}  >
          <GridList style={{height:"90vh", paddingRight:"15px"}} cols={1} >
            <StockList stocks={stocks} stockClick={clickedStock} />
          </GridList>
          </Grid>
          <Grid item xs={9}  >
          <StockView />
          </Grid>
        </Grid>
    );
}

export default TransactionPage;
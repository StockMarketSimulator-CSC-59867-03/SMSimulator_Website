import React, { useState,useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { StockDataModel } from '../../DataModels/stockData.model';
import {setSelectedStockData} from '../../redux/actions';
import { StockDataService } from '../../Services/StockDataService';
import StockData from '../OldPages/StockData/stockdata';



function ManagePage(){

    useEffect(()=>{

    },[]);

    return(
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{height:"100%"}}
            
        >
            <div>Sup</div>
        </Grid>
    );
}

export default ManagePage;
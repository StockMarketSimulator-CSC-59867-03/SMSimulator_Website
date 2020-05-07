import React from 'react';
import { useSelector } from 'react-redux';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { GridList, Grid, GridListTile } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import OwnedStockItem from './OwnedStockItem';


function OwnedStocks(props:any){
    let sessionStocks = useSelector((state: any) => state.stockData);
    let stocks = useSelector((state: any) => state.userStocks);
    let stockmap = new Map<any, any>();
    let stockGraphs: JSX.Element[] = []; //array of stocks we want to display

    let stockItems: JSX.Element[] = [];

    for(let i = 0; i < 6; i++){
        stockItems.push(( 
            <Grid item xs={4}>
                <OwnedStockItem></OwnedStockItem>
             </Grid>
        ));
    }

    return(
        <div>
            <Typography variant="h4" gutterBottom>
              Your Stocks:
            </Typography>
            <Grid container spacing={3} >
            {stockItems}
         </Grid>
        </div>

    );

}

export default OwnedStocks;
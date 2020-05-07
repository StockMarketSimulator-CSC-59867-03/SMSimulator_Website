import React from 'react';
import { useSelector } from 'react-redux';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { GridList } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

function OwnedStocks(props:any){
    let sessionStocks = useSelector((state: any) => state.stockData);
    let stocks = useSelector((state: any) => state.userStocks);
    let stockmap = new Map<any, any>();
    let stockGraphs: JSX.Element[] = []; //array of stocks we want to display
    console.log(stocks);

    //insertting userStocks into a map, Symbol => Quantity
    Object.entries(stocks).forEach((stock:any) => {
        stockmap.set(stock[0], stock[1].quantity);
    });
    console.log(stockmap);

    Object.entries(sessionStocks).forEach((stock:any) => {
        let tickerSymbol = stock[1].data['symbol'];
        let graphDomain = stock[1].domain;
        let stockHistory = stock[1].history;

        let ownedStock = stockmap.get(tickerSymbol);

        let stockData = sessionStocks[tickerSymbol];
        var percentageChange = '0';
        var isGain = false;
        if(stockData != null && stockData.history != null){
          var lastStockPrice = (stockData.history[stockData.history.length - 1]["price"]);
          var firstStockPrice = (stockData.history[0]["price"]);
          var priceDiff = (lastStockPrice - firstStockPrice);
          percentageChange = ((priceDiff/firstStockPrice)*100).toFixed(2);
          var isGain = (priceDiff > 0);
        }
  

        if(ownedStock !== undefined)
        {
            stockGraphs.push(
                <div style={{display: 'flex', borderTop: '1px solid black'}}>
                    <div>
                        <p>{tickerSymbol} ({ownedStock})</p>
                        <p style={{backgroundColor: isGain ? lightBlue[300] : 'red', color: 'white', padding: '2px', borderRadius: 3, alignSelf: 'center'}}>{percentageChange}%</p>
                    </div>
                    <div style={{flexGrow: 1}}/>
                    <div style={{display: 'flex'}}>
                        <StockGraph name={tickerSymbol} domain={graphDomain} data={stockHistory} handleClick={() => {}} width={100} height={80} animationOn={false} showToolTip={false}/>
                    </div>
                </div>
            )
        }
    })

    return(
        <div>
            {stockmap.size === 0 ? <p>You don't own any stocks. Buy some!</p> : <GridList cols={1} cellHeight='auto'>{[...stockGraphs]}</GridList>}
        </div>
    );
}

export default OwnedStocks;
import React, { useState } from 'react';
import '../TransactionPage.scss'
import StockListItem from '../../../Components/StockListItem/StockListItem';


function StockList(props: any){
    let stocksToDisplay = props.stocks;
    let stockList: any = [];
    stocksToDisplay.forEach((stock: any)=> {
        stockList.push(( <StockListItem stockData={stock} onClick={props.stockClick}></StockListItem>));
    });
   

    return(
        <div style={{width:"33%"}} className="stockList">
            <p>StockList</p>
            {stockList}
        </div>
    );
}

export default StockList;
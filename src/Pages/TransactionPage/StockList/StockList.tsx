import React, { useState } from 'react';
import '../TransactionPage.scss'
import StockListItem from '../../../Components/StockListItem/StockListItem';


function StockList(props: any){
    let stockList = [];
    for(let i = 0; i <= 20; i++){
        stockList.push(( <StockListItem onClick={props.stockClick}></StockListItem>));
    }

    return(
        <div style={{width:"33%"}} className="stockList">
            <p>StockList</p>
            {stockList}
        </div>
    );
}

export default StockList;
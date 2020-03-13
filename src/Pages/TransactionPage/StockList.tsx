import React, { useState } from 'react';
import './TransactionPage.scss'
import StockListItem from '../../Components/StockListItem/StockListItem';


function StockList(){

    return(
        <div style={{width:"33%"}}>
            <p>StockList</p>
            <StockListItem></StockListItem>
            <StockListItem></StockListItem>

        </div>
    );
}

export default StockList;
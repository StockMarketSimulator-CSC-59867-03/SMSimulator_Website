import React from 'react';
import '../TransactionPage.scss'
import StockListItem from '../../../Components/StockListItem/StockListItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stockList: {
        overflow: "scroll",
        
      },
      gridList: {
        height:"100vh"
      },
  }),
);


function StockList(props: any){
    let stocksToDisplay = props.stocks;
    let stockList: any = [];
    stocksToDisplay.forEach((stock: any)=> {
        stockList.push(( 
            <div>
        <StockListItem stockData={stock} onClick={props.stockClick}></StockListItem>
        </div>
        ));
    });
   

    return(

            <div style={{width:"100%"}}>
                <p>StockList</p>
                {stockList}
            </div>
    );
}

export default StockList;
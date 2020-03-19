import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, List, ListItem, Card, GridList, GridListTile, ListItemText, GridListTileBar } from '@material-ui/core';
import StockListItem from '../../Components/StockListItem/StockListItem';
import StockGraph from '../../Components/StockGraph/stockGraph';
import MarketWindowModel from '../OldPages/MarketWindow/MarketWindow.model';
import { connect } from 'react-redux';
// import SessionStocksModel from './SessionStocksModel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      paper: {
        display: 'flex',
        // justifyContent: 'space-between',
        margin: 50,
      },
      gridList: {
        flexWrap: 'nowrap',
      },
      titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
      title: {
        color: "white",
      },
  }),
);

function calculateDomain(value : Array<any>){
  let min = 1000000;
  let max = 0;
  for(let i = 0; i < value.length; i++){
      let price = value[i]["price"]
      if(price < min){
          min = price;
      }
      if(price > max){
          max = price;
      }
  }
  return [min - 20, max + 20];
}

function SessionStocks(props:any) {
  // const stockData = React.useRef(new Map());
  const [stockData, setstockData] = useState(new Map());
  const [currSession, setCurrSession] = useState("5BfhIdQHUYqXlmrfD1ql");
  const [rerenderFlag, setFlag] = useState(false);
  // const marketWindowModel = new MarketWindowModel(props.sessionData.id);
  const classes = useStyles();
  console.log("Hello from Session Stocks");
  // console.log(props.sessionData.id);

  let tempStockData = new Map();
  let stockHistorys: any[] = [];
  // let stockGraphs: any[] = [];
  
  const db = firebase.firestore();
  const docref = db.collection("Sessions").doc("5BfhIdQHUYqXlmrfD1ql").collection("Stocks"); //reference to the current session stocks
  //now, for each stock(document) in Stocks(collection), we need the field data, and the stock history collection.
  useEffect(() => {
    // const sessionStocksModel = new SessionStocksModel(props.sessionData.id);
    // setstockData(sessionStocksModel.stockMap);
    if(rerenderFlag)
    {
      console.log("Flag is true");
      console.log(tempStockData); //is empty after re-render
      console.log(stockData);
      console.log(stockData.size);
    }
    else {
      docref.get().then((querySnapshot:any) => {
        querySnapshot.forEach((doc:any) => {
          // console.log(doc.data()['name']);
          db.collection("Sessions").doc("5BfhIdQHUYqXlmrfD1ql").collection("Stocks").doc(doc.id).collection("Stock History").get().then((querySnapshot:any) => {
            querySnapshot.forEach((doc:any) => {
              // console.log(doc.data()['dateTime']);
              stockHistorys.push(doc.data()['price']);
            })
            // console.log("inside child then:", stockHistorys);
            tempStockData.set(doc.data()['name'], stockHistorys);
            stockHistorys = [];
          })
        })
      }).catch((error) => {
        console.log("Error getting document:", error);
      }).finally(() => {
        console.log(tempStockData);
        setstockData(tempStockData);
        // for (const [key, value] of tempStockData.entries()) {
        //   console.log("key:", key, "value:", value);
        //   let domain = calculateDomain(value);
        //   stockGraphs.push(
        //     <GridListTile>
        //       <Paper>
        //         <StockGraph name={key} domain={domain} data={value} handleClick={() => {}} width={100} height={80}></StockGraph>
        //         <GridListTileBar title={key} classes={{ root: classes.titleBar, title: classes.title, }}/>
        //       </Paper>
        //     </GridListTile>
        //   );
        // }
        setFlag(true);
      });
      console.log("done");
    }

  }, [currSession, rerenderFlag]);

  // marketWindowModel.stockDataSubject.subscribe(value => {
  //   console.log("From Subscription");
  //   console.log(value);
  //   setstockData(value);
  // });

  console.log(stockData);

  let stockGraphs = [];
  for (const [key, value] of stockData.entries()) {
    console.log("key:", key, "value:", value);
    let domain = calculateDomain(value);
    stockGraphs.push(
      <GridListTile>
        <Paper>
          <StockGraph name={key} domain={domain} data={value} handleClick={() => {}} width={100} height={80}></StockGraph>
          <GridListTileBar title={key} classes={{ root: classes.titleBar, title: classes.title, }}/>
        </Paper>
      </GridListTile>
    );
  }

  return (
      <GridList cols={1} cellHeight='auto'>
          {stockGraphs}
      </GridList>
  );
}

const mapStateToProps = (state: any) => ({
  sessionData: state.sessionData
});

export default connect(mapStateToProps)(SessionStocks);
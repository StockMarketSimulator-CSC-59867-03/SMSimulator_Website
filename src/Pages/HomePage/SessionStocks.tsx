import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, List, ListItem, Card, GridList, GridListTile, ListItemText, GridListTileBar } from '@material-ui/core';
import StockListItem from '../../Components/StockListItem/StockListItem';
import StockGraph from '../../Components/StockGraph/stockGraph';
import MarketWindowModel from '../OldPages/MarketWindow/MarketWindow.model';
import { connect } from 'react-redux';

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
  const [stockData, setstockData] = useState(new Map());
  const marketWindowModel = new MarketWindowModel(props.sessionData.id);
  const classes = useStyles();

  marketWindowModel.stockDataSubject.subscribe(value => {
    console.log("From Subscription");
    console.log(value);
    setstockData(value);
  });

  let stockGraphs = [];
  for (const [key, value] of stockData.entries()) {
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
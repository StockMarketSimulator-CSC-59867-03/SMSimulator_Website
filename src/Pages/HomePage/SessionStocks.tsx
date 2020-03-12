import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, List, ListItem, Card, GridList, GridListTile } from '@material-ui/core';
import StockListItem from '../../Components/StockListItem/StockListItem';
import StockGraph from '../../Components/StockGraph/stockGraph';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      list: {
        flexWrap: 'nowrap',
        overflow: 'auto',
      }
  }),
);

export default function SessionStocks() {
    const classes = useStyles();

    return (
        <List>
            <ListItem><StockListItem/></ListItem>
            <ListItem><StockListItem/></ListItem>
            <ListItem><StockListItem/></ListItem>
            <ListItem><StockListItem/></ListItem>
            <ListItem><StockListItem/></ListItem>
        </List>
    );
}
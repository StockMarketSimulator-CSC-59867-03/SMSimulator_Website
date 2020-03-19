import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, List, ListItem, Card, GridList, GridListTile } from '@material-ui/core';
import StockListItem from '../../Components/StockListItem/StockListItem';

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      list: {
        flexWrap: 'nowrap',
        overflow: 'auto',
      }
  }),
);

export default function WatchedStocks() {
    const classes = useStyles();

    return (
      <GridList className={classes.list} cols={3.5} cellHeight='auto'>
        <GridListTile><StockListItem/></GridListTile>
        <GridListTile><StockListItem/></GridListTile>
        <GridListTile><StockListItem/></GridListTile>
        <GridListTile><StockListItem/></GridListTile>
        <GridListTile><StockListItem/></GridListTile>
        <GridListTile><StockListItem/></GridListTile>
      </GridList>
    );
}
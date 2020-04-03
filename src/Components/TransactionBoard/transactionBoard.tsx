import firebase, { firestore } from "firebase";
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles, Theme, makeStyles } from "@material-ui/core";





const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      width: '25%'
    },
    body: {
      fontSize: 14,
      width: '25%'
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow);
const useStyles = makeStyles({
    table: {},
  });
function createData(date: any,symbol: any, cost: any,volume:number) {
    return {date,symbol, cost,volume };
  }
  

export function TransactionBoard(){
var returnArr = [{ date: 123, symbol: "ba", cost: 1, volume: 1 }];
const classes = useStyles();

return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Stock</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {returnArr.map((returnArr) => (
            <StyledTableRow key={returnArr.date}>
              <StyledTableCell component="th" scope="row">
                {returnArr.date}
              </StyledTableCell>
              <StyledTableCell align="center">{returnArr.symbol}</StyledTableCell>
              <StyledTableCell align="center">{returnArr.cost}</StyledTableCell>
              <StyledTableCell align="center">{returnArr.volume}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 
  

    
    
    
    
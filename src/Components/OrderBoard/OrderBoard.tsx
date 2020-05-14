import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase';
import { useDispatch, useSelector } from "react-redux";
import { Order } from '../../DataModels/order.model';
import { Button } from '@material-ui/core';

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

function createData(orderID:any,orderType : any,stockSymbol: any,stockPrice: any,stockQuantity: any) {
    return { orderID : orderID, orderType : orderType,stockSymbol: stockSymbol,stockPrice: stockPrice,stockQuantity: stockQuantity};
}

const useStyles = makeStyles({
    table: {
        minWidth: 200,
        minHeight: 50,
    },
});

function addDocToArray(doc : any,orderType : any,orderArray : object[]){
    const docData = doc.data();
    if(docData!= null){
        const orderID = doc.id;
        const price = docData.price;
        const quantity = docData.quantity;
        const stockSymbol = docData.stock;
        orderArray.push(createData(orderID,orderType,stockSymbol,price,quantity))
    }
}

  export function OrderBoard(){
    const classes = useStyles();
    const db = firebase.firestore();
    let orders : object[] = [];
    const currentUser = useSelector((state: any)=> state.currentUserData);
    const currentSessionID = useSelector((state: any) => state.sessionData.id);
    const currentUserID = currentUser.id;
    orders.push(createData(1,'BUY','AMZN',15.55,5));
    orders.push(createData(1,'SELL','AMZN',1000,3));

    db.collection("BuyOrders")
    .where('sessionID','==',currentSessionID)
    .where('user', '==', currentUserID)
    .get()
    .then((querySnapshot : any)=>{
        querySnapshot.forEach((doc : any) =>{
            addDocToArray(doc,'BUY',orders);
        });
        console.log(orders)
    });
    
    db.collection("SellOrders")
    .where('sessionID','==',currentSessionID)
    .where('user', '==', currentUserID)
    .get()
    .then((querySnapshot : any)=>{
        querySnapshot.forEach((doc : any) =>{
            addDocToArray(doc,'SELL',orders);
        });
        console.log(orders);
    });

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Order Type</StyledTableCell>
                <StyledTableCell align="center">Stock</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order : any) => (
                <StyledTableRow key={order.name}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {order.orderType}
                  </StyledTableCell>
                  <StyledTableCell align="center">{order.stockSymbol}</StyledTableCell>
                  <StyledTableCell align="center">{order.stockPrice}</StyledTableCell>
                  <StyledTableCell align="center">{order.stockQuantity}</StyledTableCell>
                  <StyledTableCell align="center"><Button disableElevation color="secondary" variant="contained">Cancel</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
  }

  export default OrderBoard;
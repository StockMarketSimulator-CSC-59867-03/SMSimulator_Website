import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, InputLabel, FormControl, Input, Button, Grid } from '@material-ui/core';
import firebase from 'firebase';
import { connect, useSelector, useDispatch } from 'react-redux';
import stockData from '../../redux/reducers/stockDataReducer';
import { PassThrough } from 'stream';
import currentUserData from '../../redux/reducers/userReducer';
import {addNotification} from '../../redux/actions';



function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      height: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2),
    },
    alignItemsAndJustifyContent: {
      display: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 5
    },
}));
function BuyModalv2(props:any){
    
    const [open,setOpen] = React.useState(false);
    const [quantity,setQuantity] = React.useState("0");
    const [price,setPrice] = React.useState("0");
    const [valid,setValid] = React.useState(false);
    const name = React.useState(props.sessionData.name);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const selectedStock = useSelector((state: any) => state.selectedStockData);
    const currentUser = useSelector((state: any)=> state.currentUserData);
    const userLiquid = useSelector((state: any) => state.sessionData.balance);

    const dispatch = useDispatch();


    const db1 = firebase.firestore();
    const isDisabled = Number(quantity) <= 0 ||
      Number.isNaN(Number(quantity))||
      quantity == ''||
      Number(price) <= 0 || 
      Number.isNaN(Number(price))||
      price == '';
  

    let var_total = Number(quantity)*Number(price);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleQuantityChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuantity(event.target.value);
    }
    const handlePriceChange = (event: {target: {value: React.SetStateAction<string>;};}) => {
        setPrice(event.target.value);

    }
    
    //script for test cases
    const submitBuy = () => {
      var priceFloat = parseFloat(parseFloat(price).toFixed(2));
      var quantityFloat = parseFloat(parseFloat(quantity).toFixed(0));
      var totalPurchasingAmount = priceFloat * quantityFloat;
      if (totalPurchasingAmount <= userLiquid) {
        db1
          .collection("BuyOrders")
          .add({
            price: priceFloat,
            quantity: quantityFloat,
            stock: selectedStock.symbol,
            time: new Date().getTime(),
            user: currentUser.id,
            sessionID: props.sessionData.id
          })
          .then(() => {
            handleClose();
          });
      } else {
        dispatch(addNotification({
          type:"INSTANT",
          title:"Buy Order",
          body:"Not enough liquid to purchase selected stock"
      }));
      }
    };

    return (
        <div>
          <Button variant="contained" color="primary" onClick = {handleOpen}>
          Bid
          </Button>
          <Modal
            open={open}
            onClose={handleClose}>
            <div style={modalStyle} className={classes.paper}>
            <Grid
              style ={{ height: '100%', width: '100%'}}
              container
              direction = "column"
              justify = "flex-start"
              alignItems = "center">

            <h1>{selectedStock.symbol}</h1>
            <TextField
              required
              id="outlined-required"
              label="Quantity"
              defaultValue={""}
              variant="outlined"
              autoComplete='off'
              error = {Number(quantity) < 0 || Number.isNaN(Number(quantity))}
              helperText = {"Incorrect Entry"}
              onChange= {handleQuantityChange}
            />
            <br/>
            <TextField
              required
              id="outlined-required"
              label="Desired Bid Price"
              defaultValue={""}
              variant="outlined"
              autoComplete='off'
              error = {Number(price) < 0 || Number.isNaN(Number(price))}
              helperText = {"Incorrect Entry"}
              onChange= {handlePriceChange}
            />
            <br/>
            <label>Total ({Number(quantity)} x {Number(price).toFixed(2)}): ${var_total.toFixed(2)}</label>
            <br/>
            <br/>
            <Button disabled ={isDisabled} variant="contained" color="primary" onClick = {submitBuy}>
              Complete Bid Order
            </Button>
            </Grid>
            </div>
          </Modal>
    </div>
  );
}
const mapStateToProps = (state: any) => ({
  sessionData: state.sessionData
});



export default connect(mapStateToProps)(BuyModalv2);

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import store from '../../redux/store';
import { addNotification } from '../../redux/actions';

type AddStocksProps = {
    id: any;
};

function showNotification(text: string){
  store.dispatch(addNotification({
      type:"SNACKINFO",
      title:text,
      body:""
  }));
}

function showError(errorText: string){
  store.dispatch(addNotification({
      type:"INSTANT",
      title:"Unable to Set Stocks",
      body:errorText
  }));
}

// this is "Addstock" component but its function is "Setstock"
export default function AddStocks(props: AddStocksProps) {
  const [open, setOpen] = React.useState(false);
  let db = firebase.firestore();
  const [formState, setFormState] = React.useState({
    userIDs: props.id,
    stocks:"",
    quantity:""
  });
  const sessionID = useSelector((state: any) => state.sessionData.id);
  let history = useHistory();
  let sessionStocks = useSelector((state: any) => state.stockData);


  const handleChange = (event: any) =>{
    let value;
    event.target.value <= 0 ? value = "" : value = event.target.value;
    setFormState({
        ...formState,
        [event.target.id]: value,
    })
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
    console.log(formState);
    let stocks = formState.stocks.split(" ");
    let batch = db.batch();
    let stockNameError: any = null;
    let priceError = false;
    stocks.forEach((stockSymbol: string)=>{
      if(sessionStocks.hasOwnProperty(stockSymbol)){
      let newStocks =  db.collection("Sessions").doc(sessionID).collection("Users").doc(formState.userIDs).collection("Stocks").doc(stockSymbol);
      let stockData = sessionStocks[stockSymbol];
      let stockPrice = 0;

      if(stockData.history != null && stockData.history.length > 0 ){
        stockPrice = Number(
          stockData.history[stockData.history.length - 1]["price"].toFixed(2)
        );
      }
      else{
        priceError = true;
      }

      batch.set(newStocks,{
          "initialValue":parseInt(formState.quantity) * stockPrice, 
          "quantity": parseInt(formState.quantity)
        })
      }
      else{
        stockNameError = stockSymbol;
      }
    });

    if(stockNameError == null){
      if(!priceError){
        batch.commit().then(function () {
          handleClose();
          showNotification("Sucessfully Set Stocks");
        }).catch((err: any)=>{
          showError(err);
        });
      }
      else{
        showError(`Stock price error`);
      }
    }
    else{
      showError(`${stockNameError} isn't a stock in the session`);
    }
    

}

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Set Stocks
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Stocks to Users</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Here you can sets stocks to users in the session. (Seperate IDs and stocks by spaces)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="userIDs"
            label="User IDs"
            value={props.id}
            onChange={handleChange}
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="stocks"
            label="Stocks"
            onChange={handleChange}
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
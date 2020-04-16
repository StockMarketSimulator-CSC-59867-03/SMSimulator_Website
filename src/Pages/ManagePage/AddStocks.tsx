
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



export default function AddStocks() {
  const [open, setOpen] = React.useState(false);
  let db = firebase.firestore();
  const [formState, setFormState] = React.useState({
    userIDs: "",
    stocks:"",
    quantity:""
  });
  const sessionID = useSelector((state: any) => state.sessionData.id);


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
    let users = formState.userIDs.split(" ");
    let stocks = formState.stocks.split(" ");

    users.forEach((id: string)=>{
        stocks.forEach((stockSymbol: string)=>{
            db.collection("Sessions").doc(sessionID).collection("Users").doc(id).collection("Stocks").doc(stockSymbol)
            .set({"initialValue":10000, "quantity":parseInt(formState.quantity)});
        });
        
    });

    console.log(users);
    handleClose()
}

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Stocks
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
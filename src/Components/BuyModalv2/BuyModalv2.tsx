import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField } from 'material-ui';
import { FormControlLabel, InputLabel, FormControl, Input, Button } from '@material-ui/core';
import firebase from 'firebase';
import { connect } from 'react-redux';



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
      padding: theme.spacing(2, 4, 3),
    },
}));
function BuyModalv2(props:any){
    
    const [open,setOpen] = React.useState(false);
    const [quantity,setQuantity] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [name,setName] = React.useState("");
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    

    const db1 = firebase.firestore()

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
    const handleNameChange = (event: {target: {value: React.SetStateAction<string>;};}) => {
      setName(event.target.value);
    }
    const submitBuy = () => {
        db1.collection('Sessions').doc(props.sessionData.id).collection('BuyOrder').add({
          name: name,
          price: price,
          quantity: quantity
        })
        .then(()=>{handleClose()});
    }


    return (
        <div>
          <button type="button" onClick={handleOpen}>
            Buy
          </button>
          <Modal
            open={open}
            onClose={handleClose}>
            <div style={modalStyle} className={classes.paper}>
                <InputLabel htmlFor="Name">Stock</InputLabel>
                <Input id = "Name" value={name} onChange = {handleNameChange}/>
                <InputLabel htmlFor="Quantity">Quantity</InputLabel>
                <Input id = "Quantity" value={quantity} onChange = {handleQuantityChange}/>
                <InputLabel htmlFor="Price">Price</InputLabel>
                <Input id = "Price" value={price} onChange = {handlePriceChange}/>
                <button onClick={submitBuy}>
                  Buy
                </button>
            </div>
          </Modal>
    </div>
  );
}
const mapStateToProps = (state: any) => ({
  sessionData: state.sessionData
});



export default connect(mapStateToProps)(BuyModalv2);
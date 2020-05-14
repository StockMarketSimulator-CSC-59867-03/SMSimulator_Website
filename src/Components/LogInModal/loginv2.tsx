import React, { useState, useRef } from 'react';
import firebase from 'firebase';

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import store from '../../redux/store';
import { addNotification } from '../../redux/actions';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        modal: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        modalBackground: {
            position: 'relative',
            width: '25%',
            height: '55%',
            backgroundColor: theme.palette.background.default,
        },
        grid: {
            padding: theme.spacing(2),
            justifySelf: 'center',
            alignItems: 'center',
            flexGrow: 1
        },
        submitButton: {
            marginBottom: theme.spacing(2),
            position: 'absolute',
            bottom: 0
        },
        closeIcon: {
            position: 'absolute',
            right: 0,
            color: "gray",
        }
    })
);

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
        title:"Login",
        body:errorText
    }));
  }

function LoginModalv2(props:any){
    const classes = useStyles();

    let email = useRef("");
    let password = useRef("");
    let [isModalOpen, setModalOpen] = useState(false);

    const handleOpenClose = () => {
        setModalOpen(!isModalOpen);
    }

    const handleChange = (event:any) => {
        let value = event.target.value;
        switch(event.target.name){
            case 'email':
                email.current = value; break;
            case 'password':
                password.current = value; break;
        }
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email.current, password.current)
        .then(function(user){
        showNotification("Successfully Signed In!");
          email.current = "";
          password.current = "";
          handleOpenClose();
        })
        .catch(
          function(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            showError(errorMessage);
            email.current = "";
            password.current = "";
          }
        );
    }
    
    return (
        <div>
            <Button color="secondary" variant="contained" onClick={handleOpenClose}>
                Log In
            </Button>
            <Modal className={classes.modal} open={isModalOpen} onClose={handleOpenClose}>
                <div className={classes.modalBackground}>
                    <IconButton className={classes.closeIcon} onClick={handleOpenClose}><CloseIcon/></IconButton>
                    <Grid container className={classes.grid} direction="column">
                        <br/>
                        <h1>Log In</h1>
                        <br/>
                        <TextField id="outlined-required" variant = "outlined" label="Email" name="email" onChange={handleChange} autoComplete="off"/>
                        <br/>
                        <TextField id="outlined-required" variant = "outlined" type="password" label="Password" name="password" onChange={handleChange}/>
                        <br/>                       
                        <Button className={classes.submitButton} color="primary" variant="contained" onClick={handleSubmit}>Log In</Button>
                    </Grid>
                </div>
            </Modal>
        </div>
    );
}

export default LoginModalv2;
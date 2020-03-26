import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import { changeCurrentUserID, changeCurrentUsername } from '../../redux/actions';

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
            height: '25%',
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
        }
    })
);

function LoginModalv2(props:any){
    const classes = useStyles();
    let dispatch = useDispatch();

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
          //to fetch user id:
          alert("Succesfully Signed In!");
          email.current = "";
          password.current = "";
          handleOpenClose();
        })
        .catch(
          function(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            email.current = "";
            password.current = "";
          }
        );
        console.log("it works");
    }
    
    return (
        <div>
            <Button variant="contained" onClick={handleOpenClose}>
                Log In
            </Button>
            <Modal className={classes.modal} open={isModalOpen} onClose={handleOpenClose}>
                <div className={classes.modalBackground}>
                    <Grid container className={classes.grid} direction="column">
                        <TextField id="standard-basic" label="Email" name="email" onChange={handleChange}/>
                        <TextField id="standard-basic" type="password" label="Password" name="password" onChange={handleChange}/>
                        <Button className={classes.submitButton} variant="contained" onClick={handleSubmit}>Log In</Button>
                    </Grid>
                </div>
            </Modal>
        </div>
    );
}

export default LoginModalv2;
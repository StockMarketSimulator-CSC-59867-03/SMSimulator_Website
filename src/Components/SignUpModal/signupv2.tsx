import React, { useRef, useState } from 'react';
import firebase from 'firebase';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { changeCurrentUserID, changeCurrentUsername, changeSessionID, clearSelectedStockData,clearUserStockData, addNotification } from '../../redux/actions';
import { useHistory } from 'react-router';
import store from '../../redux/store';

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
            height: '65%',
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
        },
        button: {
            color: "black",
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
        title:"Sign Up",
        body:errorText
    }));
  }

function SignUpModalv2(props:any){
    const classes = useStyles();

    //fields - these useRef so that they do not cause a rerender upon change
    let username = useRef("");
    let email    = useRef("");
    let password = useRef("");

    let [isModalOpen, setModalOpen] = useState(false);

    const handleOpenClose = () => {
        setModalOpen(!isModalOpen);
    }

    const handleChange = (event:any) => {
        let value = event.target.value;
        switch(event.target.name){
            case 'username':
                username.current = value; break;
            case 'email':
                email.current = value; break;
            case 'password':
                password.current = value; break;
        }
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(email.current, password.current)
        .then((user) => {
            showNotification("Successfully Signed Up!");
            const currentUser = firebase.auth().currentUser;
            if(user && currentUser!= null){
                currentUser.updateProfile({ displayName : username.current });

                const db = firebase.firestore();
                db.collection('User').doc(currentUser.uid).set({
                    username : username.current,
                    sessions: [""]
                });

                //close modal
                setModalOpen(false);

                //signout after sign up
                signOut();
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showError(errorMessage);
            
            //close modal
            
        });
    }

    let dispatch = useDispatch();
    let history = useHistory();

    const signOut = () => {
        // NEED TO HANDLE ERROR HERE 
        firebase.auth().signOut().then(function() {
           console.log("Signed Out");
          }).catch(function(error) {
            console.log("Signed Out Failed");
          });
        dispatch(changeSessionID(""));
        dispatch(clearSelectedStockData());
        localStorage.setItem('currentSessionID',"");
        history.push("/");
    }

    return(
        <div>
            <Button className={classes.button} variant="outlined" onClick={handleOpenClose}>Sign Up</Button>
            <Modal className={classes.modal} open={isModalOpen} onClose={handleOpenClose}>
                <div className={classes.modalBackground}>
                    <IconButton className={classes.closeIcon} onClick={handleOpenClose}><CloseIcon/></IconButton>
                    <Grid container className={classes.grid} direction="column">
                        <br/>
                        <h1>Sign Up</h1>
                        <br/>
                        <TextField id="outlined-required" variant = "outlined" label="Email" name="email" onChange={handleChange} autoComplete="off"/>
                        <br/>
                        <TextField id="outlined-required" variant = "outlined" label="Username" name="username" onChange={handleChange} autoComplete="off"/>
                        <br/>
                        <TextField id="outlined-required" variant = "outlined" type="password" label="Password" name="password" onChange={handleChange}/>
                        <br/>
                        <Button className={classes.submitButton} color="primary" variant="contained" onClick={handleSubmit}>Sign Up</Button>
                    </Grid>
                </div>
            </Modal>
        </div>
    )
}

export default SignUpModalv2;
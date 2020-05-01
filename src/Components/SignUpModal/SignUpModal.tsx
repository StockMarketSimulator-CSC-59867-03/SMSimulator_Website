import React from 'react';
import firebase from 'firebase';

import "./SignUpModal.scss";
import "../../App.scss";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid } from "@material-ui/core";
import store from '../../redux/store';
import { addNotification } from '../../redux/actions';

type SignUpProps = {
};
type SignUpState = {
  username:       string,
  email:          string,
  password:       string,
  open:           boolean,
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
      title:"Sign Up",
      body:errorText
  }));
}

class SignUpModal extends React.Component<SignUpProps, SignUpState> {
  constructor(props : any){
    super(props);
    this.state = {
      username:       "",
      email:          "",
      password:       "",
      open:           false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

handleChange(event : any) {
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    })


}

handleSubmit(event : any) {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const loginModal = this;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(function(user){
      showNotification("Successfully Signed Up!");
      const currentUser = firebase.auth().currentUser;
      if(user && currentUser!= null){
        currentUser.updateProfile({
        displayName : username
        });
        const db = firebase.firestore();
        db.collection('User').doc(currentUser.uid).set({
          username : username,
          sessions: [""]
        });
        loginModal.setState({
          username : '',
          email : '',
          password : '',
        });
      }
    }).catch(
      function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        showError(errorMessage);
        loginModal.setState({
          username : '',
          email : '',
          password : '',
        });
      }
    );
    event.preventDefault();
}

render() {

  const setOpen = (value : boolean) =>{
    this.setState({
      open : value
    })
  }

  const handleOpen = () =>{
    setOpen(true);
  }

  const handleClose = () =>{
    setOpen(false);
  }
    return (
      <div>
          <Button 
          variant = "outlined"
          color = "secondary"
          onClick={handleOpen}>
          Sign Up
          </Button>
          <Modal
              aria-labelledby = "simple-modal-title"
              aria-describeby = "simple-modal-description"
              open = {this.state.open}
              onClose = {handleClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              closeAfterTransition
              BackdropComponent = {Backdrop}
              BackdropProps={{
                timeout: 500
              }}>
                  <Fade in={this.state.open}>
                    <div className="modal_background" onClick={() => {}}>
                      <Grid
                        style ={{ height: '100%', width: '100%'}}
                        container
                        direction = "column"
                        justify = "center"
                        alignItems = "center">

                        <h2>Sign Up</h2>

                        <TextField
                        id = "standard-basic"
                        label = "Email"
                        name = "email"
                        value = {this.state.email}
                        onChange= {this.handleChange}/>
                        
                        <br/>
                        
                        <TextField
                        id = "standard-basic"
                        label= "Username"
                        name = "username"
                        value = {this.state.username}
                        onChange = {this.handleChange}/>

                        <br/>
                        
                        <TextField
                        id = "standard-password-input"
                        autoComplete = "current-password"
                        type = "password"
                        label= "Password"
                        name = "password"
                        value = {this.state.password}
                        onChange = {this.handleChange}/>
                        
                        <br/>
                        <br/>
                        
                        <div>
                          <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={this.handleSubmit}>
                          Sign Up
                          </Button>
                          &nbsp;&nbsp;&nbsp;
                          <Button
                          className = "cancle_button" 
                          variant="contained"
                          color="secondary"
                          onClick={handleClose}>
                          Cancel
                          </Button>
                        </div>
                        </Grid>
                    </div>
                  </Fade>
            </Modal>
      </div>
    );
  }

}

export default SignUpModal;
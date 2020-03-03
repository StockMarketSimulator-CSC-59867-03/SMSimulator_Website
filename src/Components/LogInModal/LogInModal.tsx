import React from 'react';
import firebase from 'firebase';

import "./LogInModal.scss";
import "../../App.scss";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid } from "@material-ui/core";

type LogInProps = {
};
type LogInState = {
  email:          string,
  password:       string,
  open:           boolean,
};

class LogInModal extends React.Component<LogInProps, LogInState> {
  constructor(props : any){
    super(props);
    this.state = {
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

    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        //signing in
        //to get token? : user.getIdToken();
      }
      else{
        //singing out
      }
    });
}

handleSubmit(event : any) {
    alert("Succesfully Signed In!");
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    .then(function(){
        
    })
    .catch(
      function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    );
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
          variant = "contained"
          color = "primary"
          onClick={handleOpen}>
          Log In
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

                        <h2>Log In</h2>

                        <TextField
                        id = "outlined-basic"
                        label = "Email"
                        name = "email"
                        onChange= {this.handleChange}/>
                        
                        <br/>
                        
                        <TextField
                        id = "outlined-basic"
                        label= "Password"
                        name = "password"
                        onChange = {this.handleChange}/>
                        
                        <br/>
                        <br/>
                        
                        <div>
                          <Button 
                          className = "sign_in_button"
                          variant="contained" 
                          color="primary" 
                          onClick={this.handleSubmit}>
                              Log In
                          </Button>
                          &nbsp;&nbsp;&nbsp;
                          <Button
                          className = "cancle_button" 
                          variant="contained"
                          color="secondary"
                          onClick={handleClose}>
                              Cancle
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

export default LogInModal;
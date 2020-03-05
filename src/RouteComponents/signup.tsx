import React from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

type SignUpProps = {};
type SignUpState = {
  email:          string,
  password:       string,
  username:       string,
};

class SignUp extends React.Component<SignUpProps, SignUpState> {
  
  constructor(props : any){
    super(props);
    this.state = {
        email:          "",
        password:       "",
        username:       "",  
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event : any) {
    let value;
    event.target.value <= 0 ? value = 0 : value = event.target.value;
    this.setState({
        ...this.state,
        [event.target.name]: value,
    })
}

handleSubmit(event : any) {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(function(user){
      alert("Successfully Signed Up!");
      const currentUser = firebase.auth().currentUser;
      if(user && currentUser!= null){
        currentUser.updateProfile({
        displayName : username
        });
      }

    }).catch(
      function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      }
    );
    const db = firebase.firestore();
    db.collection('User').add({
      id: username,
      sessions: [""]
    });
    event.preventDefault();
}



render() {
    return (
      <div> 
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <br/>
            <label>Email <input type="email" name="email" onChange={this.handleChange}/></label>
            <br/>
            <label>Username <input type="text" name = "username" onChange = {this.handleChange}/></label>
            <br/>
            <label>Password <input type="password" name="password" onChange={this.handleChange}/></label>
            <br/>
            <br/>
            <input type="submit" value="Sign Up"/>
          </form>
          <Link to="/">Back to home</Link>
      </div>
    );
}

}

export default SignUp;
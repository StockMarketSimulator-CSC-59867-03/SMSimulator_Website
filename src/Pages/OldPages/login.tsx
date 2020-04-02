import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

type LogInProps = {};
type LogInState = {
  email:          string,
  password:       string,
};

class LogIn extends React.Component<LogInProps, LogInState> {
  constructor(props : any){
    super(props);
    this.state = {
      email:          "",
      password:       "",
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
    alert("Succesfully Loggeed In!");
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch(
      function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    );
}

render() {
    return (
      <div> 
          <h1>Login Page</h1>
          <form onSubmit={this.handleSubmit}>
            <br/>
            <label>Email <input type="email" name="email" onChange={this.handleChange}/></label>
            <br/>
            <label>Password <input type="password" name="password" onChange={this.handleChange}/></label>
            <br/>
            <br/>
            <input type="submit" value="Create"/>
            <br/>
          </form>
          <Link to="/"> Back to home</Link>
      </div>

    );
}

}

export default LogIn;
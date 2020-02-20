import React from 'react';

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
    const email = event.target.elements.userEmail.current.value;
    const password = event.target.elements.userPassword.current.value;
    /*firebase.auth().signInWithEmailAndPassword(email,password).catch(
      function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    );*/
    event.preventDefault();
}

render() {
    return (
      <div> 
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Email <input type="email" name="userEmail" onChange={this.handleChange}/></label>
            <br/>
            <label>Password <input type="password" name="userPassword" onChange={this.handleChange}/></label>
            <br/>
            <br/>
            <input type="submit" value="Create"/>
            <br/>
         </form>
      </div>

    );
}

}

export default LogIn;
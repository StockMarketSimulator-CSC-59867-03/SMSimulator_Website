import React from 'react';

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
    alert("Order submitted");
    event.preventDefault();
}

render() {
    return (
      <div> 
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Email <input type="email" name="userEmail" onChange={this.handleChange}/></label>
            <br/>
            <label>Username <input type="text" name = "username" onChange = {this.handleChange}/></label>
            <br/>
            <label>Password <input type="password" name="userPassword" onChange={this.handleChange}/></label>
            <br/>
            <br/>
            <input type="submit" value="Sign Up"/>
          </form>
      </div>
    );
}

}

export default SignUp;
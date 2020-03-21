import React, { useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { changeCurrentUserID } from '../../redux/actions';

function LoginTest(props:any){
    let dispatch = useDispatch();
    let email = useRef("");
    let password = useRef("");

    const handleChange = (event:any) => {
        let value = event.target.value;
        switch(event.target.name){
            case 'email':
                email.current = value; break;
            case 'password':
                password.current = value; break;
        }
        // console.log(email, username, password);
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email.current, password.current)
        .then(function(user){
          //to fetch user id:
          const uid = firebase.auth().currentUser?.uid;
          dispatch(changeCurrentUserID(uid));
          // console.log(uid);
          alert("Succesfully Signed In!");
          email.current = "";
          password.current = "";
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
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
            <br/>
            <label>Email <input type="email" name="email" onChange={handleChange}/></label>
            <br/>
            <label>Password <input type="password" name="password" onChange={handleChange}/></label>
            <br/>
            <br/>
            <input type="submit" value="Log In"/>
            </form>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    currentUserData: state.currentUserData
});

export default connect(mapStateToProps)(LoginTest);
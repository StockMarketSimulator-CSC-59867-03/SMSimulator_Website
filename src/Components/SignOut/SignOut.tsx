import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentUserID, changeCurrentUsername } from '../../redux/actions';
import { Button } from '@material-ui/core';
import * as firebase from 'firebase';


function SignOut(){
    let dispatch = useDispatch();

    const handleClick = () => {


        // NEED TO HANDLE ERROR HERE 
        firebase.auth().signOut().then(function() {
           console.log("Signed Out");
          }).catch(function(error) {
            console.log("Signed Out Failed");
          });
    }

    return(
        <div>
            <Button variant="contained" onClick={handleClick}>Sign Out</Button>
        </div>
    )
}
export default SignOut;
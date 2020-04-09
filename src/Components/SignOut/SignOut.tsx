import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentUserID, changeCurrentUsername, changeSessionID, clearSelectedStockData,clearUserStockData } from '../../redux/actions';
import { Button } from '@material-ui/core';
import * as firebase from 'firebase';
import { useHistory } from 'react-router';


function SignOut(){
    let dispatch = useDispatch();
    let history = useHistory();

    const handleClick = () => {


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
            <Button disableElevation color="secondary" variant="contained" onClick={handleClick}>Sign Out</Button>
        </div>
    )
}
export default SignOut;
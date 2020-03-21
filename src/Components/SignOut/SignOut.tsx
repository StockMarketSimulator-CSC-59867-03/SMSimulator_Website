import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentUserID, changeCurrentUsername } from '../../redux/actions';
import { Button } from '@material-ui/core';

function SignOut(){
    let dispatch = useDispatch();

    const handleClick = () => {
        dispatch(changeCurrentUserID(undefined));
        dispatch(changeCurrentUsername(undefined));
    }

    return(
        <div>
            <Button variant="contained" onClick={handleClick}>Sign Out</Button>
        </div>
    )
}
export default SignOut;
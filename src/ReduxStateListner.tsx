import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useSelector } from "react-redux";


function ReduxStateListner(props: any){
    const sessionID = useSelector((state: any) => state.sessionData.id);

    useEffect(()=>{
        console.log(`SESSION ID HAS CHANGED TO ${sessionID}`);
        if(sessionID != ""){

        }
    },[sessionID]);
    
   return (
    <div id="hello"></div>
   );
}



export default ReduxStateListner;
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useSelector } from "react-redux";
import BotManager from './Services/BotManager';

interface ReduxStateListnerProps { 
    botManager: BotManager
}

function ReduxStateListner(props: ReduxStateListnerProps){
    const sessionID = useSelector((state: any) => state.sessionData.id);
    const stockData = useSelector((state: any) => state.stockData);

    useEffect(()=>{
        console.log(`SESSION ID HAS CHANGED TO ${sessionID}`);
        props.botManager.changeSessionID(sessionID);
        
    },[sessionID]);


    useEffect(()=>{
        
        props.botManager.getStocks(stockData);
        
    },[stockData]);
    
   return (
    <div id="ReduxStateListner"></div>
   );
}



export default ReduxStateListner;
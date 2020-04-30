import React, { useState,useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import GeneralButton from '../../Components/generalButton';
import { StockDataService } from '../../Services/StockDataService';
import { UserDataService } from '../../Services/UserDataService';
import { changeSessionID, addToWatchList,clearSelectedStockData,clearUserStockData } from '../../redux/actions';
import BotManager from '../../Services/BotManager';

type ProfilePageProps = {
    sessionData: any,
    currentUserData: any,
    stockDataService: StockDataService,
    userDataService: UserDataService,
    botManager: BotManager
};

function ProfilePage(props: ProfilePageProps){
    const db = firebase.firestore();

    let dispatch = useDispatch();
    let history = useHistory();

    let clickedSessionID: string = "";
    const [sessions, setSessions] = useState([] as any);

    let sessionIDs: object[] = [];
    let ownedSessions: object[] = [];
    let notOwnedSessions: object[] = [];
    let sessionButtons: object[] = [];

    useEffect(()=>{
      db.collection("User").doc(props.currentUserData.id).get().then(doc => {
        // retrieve sessions array from User collection
        sessionIDs = doc.data()?.sessions.slice(1);

        // next step is to search and get the sessions document from the session array
        sessionIDs.forEach(async(session: any, index) => {
          await db.collection("Sessions").doc(session).get().then(docFields => {
            if(docFields.data()?.ownerID == props.currentUserData.id){
              ownedSessions.push(<GeneralButton text={docFields.data()?.name} onClick={() => handleClick(session)} sessionID={session} />);
            } else {
              notOwnedSessions.push(<GeneralButton text={docFields.data()?.name} onClick={() => handleClick(session)} sessionID={session} />);
            }
          })

          // set state ONLY once the for loop ends  
          if(index == sessionIDs.length - 1){
            sessionButtons.push(ownedSessions);
            sessionButtons.push(notOwnedSessions);
            setSessions(sessionButtons);
          }
        })
      })
    },[]);

    const handleClick = (sessionID: any) => {
      clickedSessionID = sessionID;
      profileToMarketWindow();
    }

    const profileToMarketWindow = () => {
      dispatch(changeSessionID(clickedSessionID));
      dispatch(clearSelectedStockData());
      localStorage.setItem('currentSessionID',clickedSessionID);

      let key = "session" + clickedSessionID + "watchedstocks";
      let watchedstocks = localStorage.getItem(key);
      if(watchedstocks !== null || watchedstocks !== "") {
        dispatch(addToWatchList(watchedstocks?.split(",")));
      }
      else {
        dispatch(addToWatchList([]));
      }

      props.stockDataService.changeCurrentSession(clickedSessionID);
      props.userDataService.changeSessionID(clickedSessionID);
      history.push("/marketwindow");
    };

    return(
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{height:"100%"}}
            
        >
            <div>
              <b>You are the owner of these sessions</b>
              {sessions[0]}
            </div>
            <div>
              <b>You are participating in these sessions</b>
              {sessions[1]}
            </div>
        </Grid>
    );
}

function mapStateToProps(state: any){
    return {
      sessionData: state.sessionData,
      currentUserData: state.currentUserData
    };

}

export default connect(mapStateToProps)(ProfilePage);
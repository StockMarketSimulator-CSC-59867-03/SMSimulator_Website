import React, { useState,useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import GeneralButton from '../../Components/generalButton';

type ProfilePageProps = {
    sessionData: any,
    currentUserData: any,
};

function ProfilePage(props: ProfilePageProps){
    const db = firebase.firestore();
    let dispatch = useDispatch();

    const [sessions, setSessions] = useState([] as any);

    let sessionIDs: object[] = [];
    let sessionButtons: object[] = [];

    useEffect(()=>{
      db.collection("User").doc(props.currentUserData.id).get().then(doc => {
        // retrieve sessions array from User collection
        sessionIDs = doc.data()?.sessions.slice(1);

        // next step is to search and get the sessions document from the session array
        sessionIDs.forEach((session: any) => {
          db.collection("Sessions").doc(session).get().then(docFields => {
            sessionButtons.push(<GeneralButton text={docFields.data()?.name} onClick={testOnclick} sessionID={session} />)
          })
        })
      }).then(() => {
        setSessions(sessionButtons);
      })
    },[]);

    const testOnclick = () => {
      alert("clicked");
    }

    return(
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{height:"100%"}}
            
        >
            <div>
              You are currently parcitipating in these sessions
              {sessions}
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
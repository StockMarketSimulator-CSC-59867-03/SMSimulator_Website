import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Container } from '@material-ui/core';
import WatchedStocks from './WatchedStocks';
import Typography from '@material-ui/core/Typography';
import SessionStocks from './SessionStocks';
import MainStockGraph from './MainStockGraph';
import firebase from 'firebase';
import { TransactionBoard } from '../../Components/TransactionBoard/transactionBoard';


// type HomePageProps = {
//     history: any,
//     sessionData: any,
//     dispatch: any
// };

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          display: 'flex'
      },
      container: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        // overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
          height: 475,
      },
      fixedHeightPreview: {
          height: 150,
      },
      fixedHeightStocks: {
          marginTop: 15,
          height: 310,
      },
      button: {
          justifySelf: "center",
      },
      sessionStocks: {
          padding: theme.spacing(1),
          zIndex: 1,
          overflow: 'auto',
      },
      card: {
          padding: theme.spacing(2),
        //   height: 150,
          position: "absolute",
          alignSelf: "center",
          zIndex: 2,
          display: 'flex',
          flexWrap: "wrap",
          flexDirection: 'column',
          background: "lightGray",
      },
      preview: {
          paddingTop: theme.spacing(1),
          justifySelf: "left"
      },
      divider: {
          flexGrow: 1,
      }
  }),
);

function HomePage(props:any) {
    const db = firebase.firestore();

    const [joinKeyValue, setJoinKeyValue] = useState("");
    const [authenticationFlag, setAuthenticationFlag] = useState(false);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

//  two check to "skip" join key, either public or user already existing
//  check if public, skip join key but still log the user into the collection
    let sessionTypeRef = db.collection('Sessions').doc(props.sessionData.id).get().then(doc => {
      if(doc.exists){
        if(doc.data()?.type == "public"){
          logUser();
          setAuthenticationFlag(true);
        }
      }
    }).catch(err => {
      console.log(err);
    });

//  check if user exists
if(props.currentUserData.id != null){
    let userRef = db.collection('Sessions').doc(props.sessionData.id).collection('Users').doc(props.currentUserData.id);
    let getDoc = userRef.get().then(doc => {
      if(doc.exists){
        setAuthenticationFlag(true);
      }
    }).catch(err => {
      console.log(err);
    });
  }
    useEffect(()=>{

    },[joinKeyValue]);

    const onInputChange = (e: any) => {
      setJoinKeyValue(e.target.value);
    }

    const compareJoinKey = () => {
      let documentData;
      let joinKey = "";

      db.collection('Sessions').doc(props.sessionData.id).get().then(doc => {
        if(doc.exists){
          documentData = doc.data();
          joinKey = documentData?.joinKey;

          if(joinKeyValue == joinKey){
            logUser();
            setAuthenticationFlag(true);
          } else {
            alert("Invitation code is wrong, ask session administrator");
          }
        }
      }).catch(err => {
        console.log("Error getting join key from firebase");
      });
    }

    const logUser = () => {
      db.collection('Sessions').doc(props.sessionData.id).get().then(doc => {
        let startingBalance = doc.data()?.startingBalance;

        db.collection('Sessions').doc(props.sessionData.id).collection('Users').doc(props.currentUserData.id).get().then(function(doc) {
          if (doc.exists) {

          } else {
            db.collection('Sessions').doc(props.sessionData.id).collection('Users').doc(props.currentUserData.id).set({
              id: props.currentUserData.id,
              username: props.currentUserData.username,
              liquid: startingBalance,
              type: "player"
            })

            // Also update outside user table's session array (to track user's ownership of sessions)
            db.collection("User").doc(props.currentUserData.id).update({
              sessions: firebase.firestore.FieldValue.arrayUnion(props.sessionData.id)
            })
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      }).catch(err => {
        console.log("Error getting join key from firebase");
      });
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
              {authenticationFlag ?
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>
                      <Paper className={fixedHeightPaper}>
                        <TransactionBoard/>
                      </Paper>
                    </Grid>
                    {/* MarketGraph */}
                    <Grid item xs={10} md={6} lg={7}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="h5">MARKET GRAPH</Typography>
                            <MainStockGraph/>
                        </Paper>
                    </Grid>
                    {/* Right Side Panel */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="subtitle2">MARKET STOCKS</Typography>
                            <div className={classes.sessionStocks}>
                              <SessionStocks sessionData={props.sessionData} currentUserData={props.currentUserData}/>
                            </div>
                        </Paper>
                    </Grid>
                    {/* Watched Stocks */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="subtitle2">Watch List</Typography>
                            <WatchedStocks sessionData={props.sessionData} currentUserData={props.currentUserData}/>
                        </Paper>
                    </Grid>
                </Grid>
                :
                <div className='input-wrapper'>
                    <input
                        placeholder='Enter invitation code...'
                        value={joinKeyValue}
                        onChange={onInputChange}
                    />
                    <button onClick={compareJoinKey}>Search</button>
                </div>
              }
            </Container>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    sessionData: state.sessionData,
    currentUserData: state.currentUserData,
});

export default connect(mapStateToProps)(HomePage);
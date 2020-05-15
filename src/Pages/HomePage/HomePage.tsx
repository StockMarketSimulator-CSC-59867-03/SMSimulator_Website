import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
// import "./h.css";
import { Link } from 'react-router-dom';
import StockGraph from '../../Components/StockGraph/stockGraph';
import SessionSearch from '../../Components/sessionSearch';
import ScrollableButtonList from '../../Components/SessionList/scrollableButtonList';
import GeneralButton from '../../Components/generalButton';
import Button from '@material-ui/core/Button';
import CreateSessionModal from '../../Components/CreateSessionModal/CreateSessionModal'
import MarketWindow from '../../Pages/OldPages/MarketWindow/marketwindow';
import LogInModal from '../../Components/LogInModal/LogInModal';
import SignUpModal from '../../Components/SignUpModal/SignUpModal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Card, Container, Fab, Divider, ButtonGroup } from '@material-ui/core';
import WatchedStocks from './WatchedStocks';
import Typography from '@material-ui/core/Typography';
import SessionStocks from './SessionStocks';
import MainStockGraph from './MainStockGraph';
import firebase from 'firebase';
import { TransactionBoard } from '../../Components/TransactionBoard/transactionBoard';
import PortfolioStockGraph from '../PortfolioPage/PortfolioStockGraph';
import store from '../../redux/store';
import { addNotification } from '../../redux/actions';
import OrderBoard from '../../Components/OrderBoard/OrderBoard'


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
          height: 675,
      },
      fixedHeightGraph: {
          height: 500,
      },
      fixedHeightSectors: {
          height:160,
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

function showNotification(text: string){
  store.dispatch(addNotification({
      type:"SNACKINFO",
      title:text,
      body:""
  }));
}

function showError(errorText: string){
  store.dispatch(addNotification({
      type:"INSTANT",
      title:"Invitation Code",
      body:errorText
  }));
}

function HomePage(props:any) {
    const db = firebase.firestore();

    const [joinKeyValue, setJoinKeyValue] = useState("");
    const [authenticationFlag, setAuthenticationFlag] = useState(false);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightGraphPaper = clsx(classes.paper,classes.fixedHeightGraph);
    const fixedSectors = clsx(classes.paper,classes.fixedHeightSectors);
    

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
            showError("Invitation code is wrong, ask session administrator");
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
            <Container maxWidth="xl" className={classes.container}>
              {authenticationFlag ?
                <Grid container spacing={3}>
                    {/* MarketGraph */}
                    <Grid item xs={10} md={6} lg={6} className ={classes.container}>
                        <Paper className={fixedHeightGraphPaper}>
                            <Typography variant="h5">Market Graph</Typography>
                            <MainStockGraph/>
                        </Paper>
                        <Paper className={fixedSectors} style={{marginTop:15}}>
                          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" fullWidth>
                            <Button>All Sectors</Button>
                            <Button>Material</Button>
                            <Button>Industrial</Button>
                            <Button>Financial</Button>
                            <Button>Energy</Button>
                            <Button>Consumer</Button>
                          </ButtonGroup>
                          <ButtonGroup style={{marginTop:10}} variant="contained" color="primary" aria-label="contained primary button group" fullWidth>
                            <Button>Utilities</Button>
                            <Button>Technology</Button>
                            <Button>Comms</Button>
                            <Button>Real Estate</Button>
                            <Button>Health Care</Button>
                            <Button>Consumer Staples</Button>
                          </ButtonGroup>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                        <Typography style={{marginBottom:10}} variant="h6">Market Stocks</Typography>
                            <div className={classes.sessionStocks}>
                              <SessionStocks sessionData={props.sessionData} currentUserData={props.currentUserData}/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper className={fixedHeightPaper}>
                      <Typography style={{marginBottom:10}} variant="h6">All Completed Orders</Typography>
                        <TransactionBoard/>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper className={fixedHeightPaper}>
                      <Typography style={{marginBottom:10}} variant="h6">Your Pending Orders</Typography>
                        <OrderBoard/>
                      </Paper>
                    </Grid>
                    {/* Right Side Panel */}
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
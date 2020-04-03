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
import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';
import WatchedStocks from './WatchedStocks';
import Typography from '@material-ui/core/Typography';
import SessionStocks from './SessionStocks';
import OwnedStocks from './OwnedStocks';
import MainStockGraph from './MainStockGraph';
import firebase from 'firebase';
import PortfolioStockGraph from './PortfolioStockGraph';

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

    //homepage states to toggle between marketview/portfolioview
    const [isViewingPortfolio, togglePortfolioView] = useState(false);
    const [joinKeyValue, setJoinKeyValue] = useState("");
    const [authenticationFlag, setAuthenticationFlag] = useState(false);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperPreview = clsx(classes.paper, classes.fixedHeightPreview);
    const fixedHeightPaperStocks = clsx(classes.paper, classes.fixedHeightStocks);

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

      db.collection('Sessions').doc(props.sessionData.id).collection('Users').doc(props.currentUserData.id).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
          db.collection('Sessions').doc(props.sessionData.id).collection('Users').doc(props.currentUserData.id).set({
            id: props.currentUserData.id,
            // !! IMPORTANT this should NOT be OVERWRITTEN IN FUTURE IMPLEMENTATION, either UPDATE or PASS IN CURRENT VALUE 
            liquid: 10000,
            type: "player"
          })
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    }

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
              {authenticationFlag ?
                <Grid container spacing={3}>
                    {/* MarketGraph */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="h5">{ isViewingPortfolio ? "YOUR PORTFOLIO" : "MARKET GRAPH" }</Typography>
                            {/* <StockGraph width={500} height={400}></StockGraph> */}
                            { !isViewingPortfolio && <MainStockGraph/> }
                            { isViewingPortfolio && <PortfolioStockGraph/> }
                            {/* <MainStockGraph/> */}
                        </Paper>
                    </Grid>
                    {/* Right Side Panel */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaperPreview}>
                            <Card className={classes.card}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => togglePortfolioView(!isViewingPortfolio)}>
                                    { isViewingPortfolio ? "View Market" : "View Portfolio" }
                                </Button>
                                { !isViewingPortfolio && <div className={classes.preview}>
                                    <Typography variant="subtitle2">Buying Power: ${props.sessionData.balance}</Typography>
                                    <Typography variant="subtitle2">Total Return: $425.07</Typography>
                                </div> }
                            </Card>
                        </Paper>
                        <Paper className={fixedHeightPaperStocks}>
                            <Typography variant="subtitle2">{ isViewingPortfolio ? "STOCKS YOU OWN" : "MARKET STOCKS" }</Typography>
                            { !isViewingPortfolio && <div className={classes.sessionStocks}><SessionStocks sessionData={props.sessionData} currentUserData={props.currentUserData}/></div> }
                            { isViewingPortfolio && <div className={classes.sessionStocks}><OwnedStocks/></div> }
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
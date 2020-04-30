import React , { useState }from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import SignUpModalv2 from '../Components/SignUpModal/signupv2';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { changeSessionID,clearSelectedStockData } from '../redux/actions';
import LoginModalv2 from '../Components/LogInModal/loginv2';
import SignOut from '../Components/SignOut/SignOut';

// is it worth to do this firebase connectio separately?
import firebase from 'firebase';
import NavigationSideMenu from './navigationSideMenu';




const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height:"100%"
        },
    appBar: {
      width: `100%`,
      zIndex: 20000,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
    },
    buttons: {
        display: 'flex',
    },
    button: {
        margin: 5
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
    },
  }),
);

function NavigationDrawer(props:any) {
    const classes = useStyles();
    const [isOwner, setIsOwner] = useState(false);

    let history = useHistory();
    let dispatch = useDispatch();

    let enableSwitching = (props.sessionData.id === "");
    let isLoggedIn = (props.currentUserData.username !== undefined);

    

    if(props.sessionData.id){
      const db = firebase.firestore()
      db.collection('Sessions').doc(props.sessionData.id).get()
        .then(doc => {
          if(!doc.exists){
            console.log("No document found");
          } else {
            setIsOwner(props.currentUserData.id == doc.data()!.ownerID);
          }
        }).catch(err => {
          console.log("Error getting document", err);
        })
    }


    let sideMenu = (<div></div>);
    console.log(props.currentUserData);
    if (props.sessionData.id != null && props.sessionData.id != "") {
      sideMenu = (
        <NavigationSideMenu
          enableSwitching={enableSwitching}
          classes={classes}
          currentUserData={props.currentUserData}
          sessionData={props.sessionData}
          isOwner={isOwner}
        />
      );
    }


    return (
      <div  className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Stock Market Simulator
            </Typography>
            {!isLoggedIn && (
              <div className={classes.buttons}>
                <div className={classes.button}>
                  <LoginModalv2 />
                </div>
                <div className={classes.button}>
                  <SignUpModalv2 />
                </div>
              </div>
            )}
            {isLoggedIn && (
              <div className={classes.buttons}>
                <div className={classes.button}>
                  <p>Welcome, {props.currentUserData.username}!</p>
                </div>
                <Button
                  onClick={
                    props.enableSwitching
                      ? () => {}
                      : () => {
                          dispatch(changeSessionID(""));
                          dispatch(clearSelectedStockData());

                          localStorage.setItem('currentSessionID',"");
                          history.push("/profile");
                        }
                  }
                > Profile
                </Button>
                <div style={{ margin: 5, alignSelf: "center" }}>
                  <SignOut />
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
          {sideMenu}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    );
}

const mapStateToProps = (state: any) => ({
    sessionData: state.sessionData,
    currentUserData: state.currentUserData,
  });

export default connect(mapStateToProps)(withRouter(NavigationDrawer));
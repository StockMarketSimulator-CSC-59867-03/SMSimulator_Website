import React , { useState }from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ManageIcon from '@material-ui/icons/Build';
import App from '../App';
import LogInModal from '../Components/LogInModal/LogInModal';
import { Button, Menu, MenuItem } from '@material-ui/core';
import SignUpModalv2 from '../Components/SignUpModal/signupv2';
import { useHistory, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import StoreIcon from '@material-ui/icons/Store';
import AppsIcon from '@material-ui/icons/Apps';
import HomeIcon from '@material-ui/icons/Home';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeSessionID, addToWatchList,clearSelectedStockData,clearUserStockData } from '../redux/actions';
import LoginModalv2 from '../Components/LogInModal/loginv2';
import SignOut from '../Components/SignOut/SignOut';

// is it worth to do this firebase connectio separately?
import firebase from 'firebase';
import { collection, collectionData, collectionChanges } from 'rxfire/firestore';
import { Subject } from 'rxjs';
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
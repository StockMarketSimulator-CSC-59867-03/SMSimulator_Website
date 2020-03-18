import React, { useState } from 'react';
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
import App from '../App';
import LogInModal from '../Components/LogInModal/LogInModal';
import { Button, Menu, MenuItem } from '@material-ui/core';
import SignUpModal from '../Components/SignUpModal/SignUpModal';
import { useHistory, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import StoreIcon from '@material-ui/icons/Store';
import AppsIcon from '@material-ui/icons/Apps';
import HomeIcon from '@material-ui/icons/Home';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeSessionID } from '../redux/actions';

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
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
      padding: theme.spacing(3),
    },
  }),
);

function NavigationDrawer(props:any) {
    const classes = useStyles();
    let history = useHistory();
    let dispatch = useDispatch();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Stock Market Simulator
              </Typography>
              <div className={classes.buttons}>
                <div className={classes.button}><LogInModal/></div>
                <div className={classes.button}><SignUpModal/></div>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem>
                  {props.sessionData.id === "" ? <ListItemText primary="Not In Session"/> : <ListItemText primary={props.sessionData.id}/>}
                </ListItem>
                <ListItem button onClick={props.sessionData.id === "" ? () => {} : ()=>{ dispatch(changeSessionID("")); history.push("/") }}>
                    <ListItemIcon><AppsIcon/></ListItemIcon>
                    <ListItemText primary="Session"/>
                </ListItem>
                <ListItem button onClick={props.sessionData.id === "" ? () => {} : ()=>{history.push("/marketwindow")}}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button onClick={props.sessionData.id === "" ? () => {} : ()=>{history.push("/transactionPage")}}>
                    <ListItemIcon><StoreIcon/></ListItemIcon>
                    <ListItemText primary="Transaction"/>
                </ListItem>
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            {props.content}
          </main>
        </div>
      );
}

const mapStateToProps = (state: any) => ({
    sessionData: state.sessionData
  });

export default connect(mapStateToProps)(withRouter(NavigationDrawer));
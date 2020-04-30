import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ManageIcon from "@material-ui/icons/Build";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import StoreIcon from "@material-ui/icons/Store";
import HomeIcon from "@material-ui/icons/Home";
import { useDispatch } from "react-redux";
import { changeSessionID,clearSelectedStockData } from "../redux/actions";
import { Grid } from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShowChartIcon from '@material-ui/icons/ShowChart';

function NavigationSideMenu(props: any) {
  let history = useHistory();
  let dispatch = useDispatch();

  let leaveSession = ()=>{
    dispatch(changeSessionID(""));
    dispatch(clearSelectedStockData());

    localStorage.setItem('currentSessionID',"");
    history.push("/");
  };

  // NEED TO CONVERT TO TEXT WRAP
  let sessionID = props.sessionData.id;
  if (sessionID != null && sessionID.length > 6) {
    sessionID = sessionID.substring(0, 12) + "...";
  }


  let fundText = (props.sessionData == null || props.sessionData.balance == null) ? "" : `Funds: $${props.sessionData.balance}`;

  return (
    <Drawer
      className={props.classes.drawer}
      variant="permanent"
      classes={{
        paper: props.classes.drawerPaper
      }}
      anchor="left"
    >
      <div className={props.classes.toolbar} />
      <Grid
        style={{ height: "100%" }}
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <List>
          <ListItem>
            {props.enableSwitching ? (
              <ListItemText primary="Not In Session" />
            ) : (
              <ListItemText primary={sessionID} style={{ width: "10" }} />
            )}
          </ListItem>
          <ListItem
            button
            onClick={
              props.enableSwitching
                ? () => {}
                : () => {
                    history.push("/marketwindow");
                  }
            }
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={
              props.enableSwitching
                ? () => {}
                : () => {
                    history.push("/portfolio");
                }
            }
          >
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Portfolio" />
          </ListItem>
          <ListItem
            button
            onClick={
              props.enableSwitching
                ? () => {}
                : () => {
                    history.push("/transactionPage");
                  }
            }
          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction" />
          </ListItem>
          {props.isOwner ? (
            <div>
            <ListItem
              button
              onClick={
                props.enableSwitching
                  ? () => {}
                  : () => {
                      history.push("/eventinjection");
                  }
              }
            >
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem
              button
              onClick={
                props.enableSwitching
                  ? () => {}
                  : () => {
                      history.push("/manage");
                    }
              }
            >
              <ListItemIcon>
                <ManageIcon />
              </ListItemIcon>
              <ListItemText primary="Manage" />
            </ListItem>
            </div>

            
          ) : (
            <div></div>
          )}
          <ListItem>
              <ListItemText primary={fundText} style={{ width: "10" }} />
          </ListItem>
        </List>

        <Button variant="contained" color="secondary" style={{marginBottom:20}} onClick={leaveSession}>
          Change Session
        </Button>

      </Grid>
    </Drawer>
  );
}

export default NavigationSideMenu;
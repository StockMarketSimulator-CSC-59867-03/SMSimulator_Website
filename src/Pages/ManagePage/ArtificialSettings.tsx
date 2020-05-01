import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "firebase";
import { useSelector } from "react-redux";
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Input,
  TextField,
  Button,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import useInput from "../../hooks/useInput";
import BotManager from "../../Services/BotManager";
import { BotSettings } from "../../DataModels/botSettings";
import store from "../../redux/store";
import { addNotification } from "../../redux/actions";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      textAlign: "center",
    },
    form_control: {
      display: "flex",
      margin: theme.spacing(1),
    },
    event: {
      flexGrow: 1,
    },
    title: {
      color: theme.palette.secondary.main,
      display: "flex",
    },
    preset_title: {
      flexGrow: 1,
    },
    custom_sector: {
      flexGrow: 2,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    submit_button: {
      width: "100%",
    },
  })
);


function showError(errorText: string){
  store.dispatch(addNotification({
      type:"INSTANT",
      title:"Changed Settings",
      body:errorText
  }));
}

interface ArtificialSettingsProps {
  botManager: BotManager
}

export default function ArtificialSettings(props:ArtificialSettingsProps) {
  let db = firebase.firestore();
  const classes = useStyles();

  let savedBotSettings = localStorage.getItem('botSettings');

  let defaultSettings: BotSettings = {
    enabled: false,
    orderRate: 5000,
    successRate: 5,
    matchRate: 5
  };


  if(savedBotSettings != null && savedBotSettings != ""){
    defaultSettings = JSON.parse(savedBotSettings);
  }

  const {value: enableCheck, setValue: setEnableCheck, bind: bindEnableCheck} = useInput(defaultSettings.enabled, (event: any) => event.target.checked );
  const {value: orderRate, setValue: setOrderRate, bind: bindOrderRate} = useInput(defaultSettings.orderRate / 1000, (event: any, newValue: any) => newValue );
  const {value: successRate, setValue: setSuccessRate, bind: bindSuccessRate} = useInput(defaultSettings.successRate, (event: any, newValue: any) => newValue );
  const {value: matchRate, setValue: setMatchRate, bind: bindMatchRate} = useInput(defaultSettings.matchRate, (event: any, newValue: any) => newValue );

  const handleSuccessInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuccessRate(Number(event.target.value));
  };

  const handleMatchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatchRate(Number(event.target.value));
  };

  const handleOrderRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderRate(Number(event.target.value));
  };

  const onSubmit = ()=>{
    let newSettings: BotSettings = {
      enabled: enableCheck,
      orderRate: orderRate * 1000, 
      successRate: successRate, 
      matchRate: matchRate
    }
    props.botManager.startLoop(newSettings);
   localStorage.setItem('botSettings',JSON.stringify(newSettings));
    showError("The settings in artificial buy/sells in the current session have been saved.");
  };



  return (
    <div className={classes.root}>
      <p>
        Change the settings for artificial buy/sells in the current session. 
      </p>
      <Divider className={classes.divider} />

      <FormControlLabel
        control={<Switch checked={enableCheck} name="enableCheck" color="primary" {...bindEnableCheck}/>}
        label="Enable Artifical Buyers/Sellers"
      />

      <Divider className={classes.divider} />

      <Typography id="discrete-slider" gutterBottom>
        New Order Rate
      </Typography>
      <p>The rate in seconds that artifical orders should be created</p>
      <div>
        <Slider
          value={typeof orderRate === "number" ? orderRate : 0}
         {...bindOrderRate}
          aria-labelledby="input-slider"
          style={{ width: 300, marginRight: 10 }}
        />
        <Input
          value={orderRate}
          margin="dense"
          onChange={handleOrderRateChange}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
      <Divider className={classes.divider} />

      <Typography id="discrete-slider" gutterBottom>
        Stock Order Success Rate
      </Typography>
      <p>Percent chance that any stock has to successfully place an order during one iteration. Iterations occur based on the rate chosen.</p>
      <div>
        <Slider
          value={typeof successRate === "number" ? successRate : 0}
         {...bindSuccessRate}
          aria-labelledby="input-slider"
          style={{ width: 300, marginRight: 10 }}
        />
        <Input
          value={successRate}
          margin="dense"
          onChange={handleSuccessInputChange}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
      <Divider className={classes.divider} />

      <Typography id="discrete-slider" gutterBottom>
        Auto Match
      </Typography>
      <p>Percent chance of auto matching. When a buy order is created automatically create a sell order to match with. </p>
      <div>
        <Slider
          value={typeof matchRate === "number" ? matchRate : 0}
          {...bindMatchRate}
          aria-labelledby="input-slider"
          style={{ width: 300, marginRight: 10 }}
        />
        <Input
          value={matchRate}
          margin="dense"
          onChange={handleMatchInputChange}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>

      <Button style={{marginTop:50}}variant="contained" color="primary" onClick={onSubmit}>
        Save Changes
      </Button>
    </div>
  );
}

import React from "react";

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

export default function ArtificialSettings() {
  let db = firebase.firestore();
  const classes = useStyles();
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(50);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };



  return (
    <div className={classes.root}>
      <p>
        Change the settings for artificial buy/sells in the current session. 
      </p>
      <Divider className={classes.divider} />

      <FormControlLabel
        control={<Switch name="checkedB" color="primary" />}
        label="Enable Artifical Buyers/Sellers"
      />

      <Divider className={classes.divider} />

      <Typography id="discrete-slider" gutterBottom>
        New Order Rate
      </Typography>
      <p>The rate in seconds that artifical orders should be created</p>

      <Slider
        style={{ width: 300 }}
        defaultValue={5}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />
      <Divider className={classes.divider} />

      <Typography id="discrete-slider" gutterBottom>
        Stock Order Success Rate
      </Typography>
      <p>Percent chance that any stock has to successfully place an order during one iteration. Iterations occur based on the rate chosen.</p>
      <div>
        <Slider
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          style={{ width: 300, marginRight: 10 }}
        />
        <Input
          value={value}
          margin="dense"
          onChange={handleInputChange}
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
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          style={{ width: 300, marginRight: 10 }}
        />
        <Input
          value={value}
          margin="dense"
          onChange={handleInputChange}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>

      <Button style={{marginTop:50}}variant="contained" color="primary">
        Save Changes
      </Button>
    </div>
  );
}

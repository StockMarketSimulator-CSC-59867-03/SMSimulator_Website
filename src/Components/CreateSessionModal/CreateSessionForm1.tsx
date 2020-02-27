import React from "react";

import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { RadioGroup, FormControlLabel, Radio, Grid, FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function form1(props: any){
    return (
        <form onSubmit={props.handleSubmit}>

        <h2>Create A Session:</h2>
        <TextField
          name="sessionName"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={props.values.sessionName}
          onChange={props.handleChange}
        />
        <TextField
          name="sessionBalance"
          id="outlined-basic"
          label="Starting Balance"
          variant="outlined"
          value={props.values.sessionBalance}
          onChange={props.handleChange}
        />
        <RadioGroup
          aria-label="Session Type:"
          name="sessionType"
          value={props.values.sessionType}
          onChange={props.handleChange}
        >
          <FormControlLabel
            value="public"
            control={<Radio />}
            label="Public"
          />
          <FormControlLabel
            value="private"
            control={<Radio />}
            label="Private"
          />
        </RadioGroup>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
        </form>
    );
}
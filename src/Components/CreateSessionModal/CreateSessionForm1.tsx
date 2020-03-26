import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { RadioGroup, FormControlLabel, Radio, Grid, FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "../../App.scss";
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Form1(props: any){
    const [showLoading,setShowLoading] = useState(false);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {showLoading ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ width: "100%", height: "100%" }}
          >
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <form
            style={{ height: "100%", width: "100%" }}
            onSubmit={(event: any) => {
              props.handleSubmit(event);
              setShowLoading(true);
            }}
          >
            <Grid
              style={{ height: "100%", width: "100%" }}
              container
              direction="column"
              justify="space-around"
              alignItems="center"
              alignContent="center"
            >
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
            </Grid>
          </form>
        )}
      </div>
    );
}
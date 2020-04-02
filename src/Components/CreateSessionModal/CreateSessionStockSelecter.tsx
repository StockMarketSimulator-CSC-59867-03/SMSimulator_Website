import React from "react";
import { FormControlLabel, Button } from "@material-ui/core";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import "../../App.scss";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function StockSelecter(props: any) {
  let defaultStocks = ["AMZN", "GOOGL", "AAPL", "MSFT", "TSLA"];
  const [showLoading,setShowLoading] = React.useState(false);

  const [state, setState] = React.useState({
    check1: true,
    check2: true,
    check3: true,
    check4: true,
    check5: true
  });

  let stateArray = [state.check1,state.check2,state.check3,state.check4,state.check5];
   
  for (let i = 0; i < defaultStocks.length; i++){
    if(stateArray[i] == true){
        props.selectedStocks.add(defaultStocks[i]);
    }
  }
 


  const checkboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.checked){
        console.log(`Adding ${event.target.name} `);
        props.selectedStocks.add(event.target.name);
    }
    else{
        console.log(`Removing ${event.target.name} `);
        props.selectedStocks.delete(event.target.name);
    }
    console.log(props.selectedStocks);
  };

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.checked });
    checkboxCheck(event);
  };

  let otherStocks = [
    "FB",
    "INTC",
    "AMD",
    "NFLX",
    "NVDA",
    "CSCO",
    "GILD",
    "QCOM",
    "CMCSA"
  ];

  let stockComponents: JSX.Element[] = [
    <FormControlLabel
      control={
        <Checkbox
          checked={state.check1}
          value={defaultStocks[0]}
          color="primary"
          name={defaultStocks[0]}
          onChange={handleChange("check1")}
        />
      }
      label={defaultStocks[0]}
    />,

    <FormControlLabel
      control={
        <Checkbox
          checked={state.check2}
          value={defaultStocks[1]}
          color="primary"
          name={defaultStocks[1]}
          onChange={handleChange("check2")}
        />
      }
      label={defaultStocks[1]}
    />,
    <FormControlLabel
      control={
        <Checkbox
          checked={state.check3}
          value={defaultStocks[2]}
          name={defaultStocks[2]}
          color="primary"
          onChange={handleChange("check3")}
        />
      }
      label={defaultStocks[2]}
    />,
    <FormControlLabel
      control={
        <Checkbox
          checked={state.check4}
          value={defaultStocks[3]}
          name={defaultStocks[3]}
          color="primary"
          onChange={handleChange("check4")}
        />
      }
      label={defaultStocks[3]}
    />,
    <FormControlLabel
      control={
        <Checkbox
          checked={state.check5}
          value={defaultStocks[4]}
          name={defaultStocks[4]}
          color="primary"
          onChange={handleChange("check5")}
        />
      }
      label={defaultStocks[4]}
    />
  ];

  otherStocks.forEach(symbol => {
    stockComponents.push(
      <FormControlLabel
        control={
          <Checkbox
            value={symbol}
            color="primary"
            name={symbol}
            onChange={checkboxCheck}
          />
        }
        label={symbol}
      />
    );
  });




  return (
    <div id="StockSelecter" style={{ height: "100%" }}>
      {showLoading ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ width: "100%", height: "100%" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <Grid
          style={{ height: "100%" }}
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <h2>Add stocks to your session:</h2>
          <div style={{ width: "60%" }}>
            <Grid container direction="row" justify="center" alignItems="center">
              {[...stockComponents]}
            </Grid>
          </div>
          <Button variant="contained" color="primary" onClick={(event: any)=>{
            props.handleSubmit(event);
            setShowLoading(true);
          }}>
            Add Stocks
          </Button>
        </Grid>
        )}

    </div>
  );
}

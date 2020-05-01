import React, { useState, useRef } from 'react';
import firebase from 'firebase';
import { createStyles, makeStyles, Theme, Container, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Divider, Input, TextField, Button, Slider, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root: {
            position: "relative",
        },
        form_control: {
            display: "flex",
            margin: theme.spacing(1),
        },
        event: {
            flexGrow: 1
        },
        title: {
            color: theme.palette.secondary.main,
            display: "flex"
        },
        preset_title: {
            flexGrow: 1
        },
        custom_sector: {
            flexGrow: 2,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        divider: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
        },
        divider2: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        submit_button: {
            width: '100%'
        },
        label: {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(1),
            color: "lightgray"
        },
        slider: {
            marginTop: theme.spacing(2)
        },
        tooltip: {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(1)
        }
    })
)

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.secondary.light,
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
    },
  }))(Tooltip);

function EventInjectionForm(props:any){
    const classes = useStyles();
    const db = firebase.firestore();
    const [event, setEvent] = useState("");
    const [custom_Name, set_customName] = useState("");
    const [custom_Sector, set_customSector] = useState("");
    const [custom_Favorability, set_Favorability] = useState(5);
    let disableCustom = useRef(false);
    let disablePreset = useRef(false);

    const handleChange = (event:React.ChangeEvent<{ value: unknown }>) => {
        setEvent(event.target.value as string);
        disableCustom.current = true;
        switch(event.target.value as string)
        {
            case 'preset_tech_crash':
                set_customName("Tech Sector Crash");
                set_customSector("Tech");
                set_Favorability(2);
                break;
            case 'preset_pandemic_crash':
                set_customName("Pandemic");
                set_customSector("all");
                set_Favorability(2);
                break;
            case 'preset_trade_deal':
                set_customName("Trade Deal Passed");
                set_customSector("all");
                set_Favorability(7);
                break;
            case 'preset_bull':
                set_customName("Bull Market");
                set_customSector("all");
                set_Favorability(6)
                break;
            case 'preset_bear':
                set_customName("Bear Market");
                set_customSector("all");
                set_Favorability(4)
                break;
            default:
                //do nothing
        }
    }
    
    const handleCustomName = (event:React.ChangeEvent<{ value: unknown }>) => {
        set_customName(event.target.value as string);
        disablePreset.current = true;
    }

    const handleSector = (event:React.ChangeEvent<{ value: unknown }>) => {
        set_customSector(event.target.value as string);
        disablePreset.current = true;
    }

    const clear = () => {
        setEvent("");
        set_customName("");
        set_customSector("");
        set_Favorability(5);
        disableCustom.current = false;
        disablePreset.current = false;
    }

    const disableSubmit = () => {
        if(custom_Name === "" || custom_Name === null)
            return true;
        if(custom_Sector === "" || custom_Sector === null)
            return true;
        return false;
    }

    const handleSubmit = () => {
        //prep the data to be stored
        db.collection("Sessions").doc(props.sessionData.id).collection("Events").add({
            name: custom_Name,
            sector: custom_Sector,
            favorability: custom_Favorability
        })
        .then(() => {
            clear();
        })
        .catch((error) => {
            console.log("Writing Event to DB Failed: ", error);
        });
    }

    const valuetext = (value:number) => {
        return `${value}`;
    }

    return(
        <div>
            {/* Preset Events */}
            <div className={classes.title}>
                <Typography className={classes.preset_title} variant="h6">Preset Events</Typography>
                <Button onClick={clear}>Clear</Button>
            </div>
            <div className={classes.form_control}>
                <FormControl className={classes.event}>
                    <InputLabel id="preset-events-label">Event</InputLabel>
                    <Select disabled={disablePreset.current} labelId="preset-events-label" id="preset_events" value={event} onChange={handleChange}>
                        <MenuItem value={"preset_tech_crash"}>Tech Sector Crash</MenuItem>
                        <MenuItem value={"preset_pandemic_crash"}>Pandemic</MenuItem>
                        <MenuItem value={"preset_trade_deal"}>Trade Deal Passed</MenuItem>
                        <MenuItem value={"preset_bull"}>Bull Market</MenuItem>
                        <MenuItem value={"preset_bear"}>Bear Market</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Divider className={classes.divider}/>

            {/* Custom Events */}
            <div className={classes.title}>
                <Typography variant="h6">Custom Event</Typography>
            </div>
            <div className={classes.form_control}>
                <TextField disabled={disableCustom.current} className={classes.event} id="standard-basic" label="Event Name" value={custom_Name} onChange={handleCustomName}/>
            </div>
            <div className={classes.form_control}>
                <FormControl className={classes.event}>
                    <InputLabel id="sector">Sector</InputLabel>
                    <Select disabled={disableCustom.current} labelId="sector" id="custom-sector" value={custom_Sector} onChange={handleSector}>
                        <MenuItem value={"consumer services"}>Consumer Services</MenuItem>
                        <MenuItem value={"transportation"}>Transportation</MenuItem>
                        <MenuItem value={"finance"}>Finance</MenuItem>
                        <MenuItem value={"technology"}>Technology</MenuItem>
                        <MenuItem value={"health care"}>Health Care</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={classes.form_control}>
                <Typography id="discrete-slider" gutterBottom className={classes.label}>
                    Favorability
                </Typography>
                <Slider
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    color="secondary"
                    className={classes.slider}
                    disabled={disableCustom.current}
                    value={custom_Favorability}
                    onChange={(e, val) => {set_Favorability(val as number)}}
                />
                <HtmlTooltip
                    title={
                    <React.Fragment>
                        <Typography color="inherit">What is Favorability?</Typography>
                        {"Affects how the artificial buyers/sellers create orders."}
                        <br/>
                        {"The higher the number, the greater the increase of targeted stocks' price."}
                    </React.Fragment>
                    }>
                    <HelpOutlineIcon className={classes.tooltip}/>
                </HtmlTooltip>                
            </div>

            <Divider className={classes.divider2}/>

            <Button disabled={disableSubmit()} className={classes.submit_button} variant="contained" color="secondary" onClick={handleSubmit}>Queue Event</Button>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    sessionData: state.sessionData
});

export default connect(mapStateToProps)(EventInjectionForm);
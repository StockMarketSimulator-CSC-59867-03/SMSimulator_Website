import React, { useState, useRef } from 'react';
import firebase from 'firebase';
import { createStyles, makeStyles, Theme, Container, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Divider, Input, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';

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
        submit_button: {
            width: '100%'
        }
    })
)

function EventInjectionForm(props:any){
    const classes = useStyles();
    const db = firebase.firestore();
    const [event, setEvent] = useState("");
    const [custom_Name, set_customName] = useState("");
    const [custom_RaiseDrop, set_RaiseDrop] = useState("");
    const [custom_Sector, set_customSector] = useState("");
    const [custom_Percent, set_customPercent] = useState("");
    let disableCustom = useRef(false);
    let disablePreset = useRef(false);

    const handleChange = (event:React.ChangeEvent<{ value: unknown }>) => {
        setEvent(event.target.value as string);
        disableCustom.current = true;
        switch(event.target.value as string)
        {
            case 'preset_tech_crash':
                set_customName("Tech Sector Crash");
                set_RaiseDrop("drop");
                set_customSector("technology");
                set_customPercent("20");
                break;
            case 'preset_pandemic_crash':
                set_customName("Pandemic");
                set_RaiseDrop("drop");
                set_customSector("all");
                set_customPercent("15");
                break;
            case 'preset_trade_deal':
                set_customName("Trade Deal Passed");
                set_RaiseDrop("raise");
                set_customSector("all");
                set_customPercent("5");
                break;
            case 'preset_bull':
                set_customName("Bull Market");
                set_RaiseDrop("raise");
                set_customSector("all");
                set_customPercent("15");
                break;
            case 'preset_bear':
                set_customName("Bear Market");
                set_RaiseDrop("drop");
                set_customSector("all");
                set_customPercent("10");
                break;
            default:
                //do nothing
        }
    }
    
    const handleCustomName = (event:React.ChangeEvent<{ value: unknown }>) => {
        set_customName(event.target.value as string);
        disablePreset.current = true;
    }

    const handleRaiseDrop = (event:React.ChangeEvent<{ value: unknown }>) => {
        set_RaiseDrop(event.target.value as string);
        disablePreset.current = true;
    }

    const handleSector = (event:React.ChangeEvent<{ value: unknown }>) => {
        set_customSector(event.target.value as string);
        disablePreset.current = true;
    }

    const handlePercent = (event:React.ChangeEvent<{ value: unknown }>) => {
        set_customPercent(event.target.value as string);
        disablePreset.current = true;
    }

    const clear = () => {
        setEvent("");
        set_customName("");
        set_RaiseDrop("");
        set_customSector("");
        set_customPercent("");
        disableCustom.current = false;
        disablePreset.current = false;
    }

    const disableSubmit = () => {
        if(custom_Name === "" || custom_Name === null)
            return true;
        if(custom_RaiseDrop === "" || custom_RaiseDrop === null)
            return true;
        if(custom_Sector === "" || custom_Sector === null)
            return true;
        if(custom_Percent === "" || custom_Percent === null)
            return true;
        return false;
    }

    const handleSubmit = () => {
        //prep the data to be stored
        db.collection("Sessions").doc(props.sessionData.id).collection("Events").add({
            name: custom_Name,
            direction: custom_RaiseDrop,
            sector: custom_Sector,
            percent: parseInt(custom_Percent)
        })
        .then(() => {
            clear();
        })
        .catch((error) => {
            console.log("Writing Event to DB Failed: ", error);
        });
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
                    <InputLabel id="raise-drop">Raise/Drop</InputLabel>
                    <Select disabled={disableCustom.current} labelId="raise-drop" id="custom-raise-drop" value={custom_RaiseDrop} onChange={handleRaiseDrop}>
                        <MenuItem value={"raise"}>Raise</MenuItem>
                        <MenuItem value={"drop"}>Drop</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.custom_sector}>
                    <InputLabel id="sector">Sector</InputLabel>
                    <Select disabled={disableCustom.current} labelId="sector" id="custom-sector" value={custom_Sector} onChange={handleSector}>
                        <MenuItem value={"consumer_services"}>Consumer Services</MenuItem>
                        <MenuItem value={"transportation"}>Transportation</MenuItem>
                        <MenuItem value={"finance"}>Finance</MenuItem>
                        <MenuItem value={"technology"}>Technology</MenuItem>
                        <MenuItem value={"health_care"}>Health Care</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.event}>
                    <InputLabel id="percent">Percent</InputLabel>
                    <Select disabled={disableCustom.current} labelId="percent" id="custom-percent" value={custom_Percent} onChange={handlePercent}>
                        <MenuItem value={"5"}>5%</MenuItem>
                        <MenuItem value={"10"}>10%</MenuItem>
                        <MenuItem value={"15"}>15%</MenuItem>
                        <MenuItem value={"20"}>20%</MenuItem>
                        <MenuItem value={"50"}>50%</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Divider className={classes.divider}/>

            <Button disabled={disableSubmit()} className={classes.submit_button} variant="contained" color="secondary" onClick={handleSubmit}>Queue Event</Button>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    sessionData: state.sessionData
});

export default connect(mapStateToProps)(EventInjectionForm);
import React from 'react';
import { createStyles, makeStyles, Theme, Container, Grid, Paper, Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: 'auto',
        },
        title: {
            color: theme.palette.secondary.main,
        },
        heading: {
            fontSize: theme.typography.pxToRem(12),
            fontWeight: theme.typography.fontWeightRegular,
        },
    })
)

function QueuedEvents(props:any){
    const classes = useStyles();
    let events = useSelector((state:any) => state.queuedEvents);
    let queuedEvents: JSX.Element[] = [];

    Object.entries(events).forEach((event:any) => {
        // console.log(event[1]);
        let name = event[1].name;
        let sector = event[1].sector;
        let favorability = event[1].favorability;

        queuedEvents.push(
            <ExpansionPanel>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading}>{name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography variant="body2">
                        Targeted Sector: {(sector as string).charAt(0).toUpperCase() + (sector as string).substring(1)}
                        <br/>
                        Favorability: {favorability}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    })

    queuedEvents.reverse();
    // console.log(events);
    return(
        <div>
            <Typography className={classes.title} variant="h6">History</Typography>
            {queuedEvents}
        </div>
    )
}

export default QueuedEvents;
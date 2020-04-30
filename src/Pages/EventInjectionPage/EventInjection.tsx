import React from 'react';
import { createStyles, makeStyles, Theme, Container, Grid, Paper, Typography } from '@material-ui/core';
import EventInjectionForm from './EventInjectionForm';
import QueuedEvents from './QueuedEvents';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        container: {
            margin: theme.spacing(2),
        },
        paper: {
            minHeight: `calc(100vh - ${theme.spacing(2)}vh)`,
            padding: theme.spacing(2),
        },
        overflow: {
            overflow: 'auto'
        }
    })
)

function EventInjection(props:any){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={classes.paper}>
                            <EventInjectionForm/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper className={classes.paper}>
                            <div className={classes.overflow}><QueuedEvents/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper className={classes.paper}>
                            <Typography>Completed Goes Here</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default EventInjection;
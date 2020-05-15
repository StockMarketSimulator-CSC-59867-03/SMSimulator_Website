import React from 'react';
import { createStyles, makeStyles, Theme, Typography, Grid, Container, Paper, Divider } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root: {
            padding: theme.spacing(2),
        },
        title: {
            color: theme.palette.secondary.main,
            paddingBottom: theme.spacing(2)
        },
        text: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        },
        paper: {
            height: "100px",
           // width: "200px",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        }
    })
)

function LandingPage(props:any) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Typography variant="h2" className={classes.title}>Welcome to the Stock Market Simulator!</Typography>
            <Typography variant="body1">This is a web application designed and implemented by Nabhan Maswood, 
            Hyunsung Song, Marvin Estime, Patrick Johnson &amp; Arafat Arman for their CCNY Senior Design Project</Typography>
            <Typography variant="h6" className={classes.text}>The Stock Market is an enigma. You know it's possible to make quite a bit of profit
            from it, but you also know it's possible to lose all your hard-earned money as well!</Typography>
            <Typography variant="h6" className={classes.text}><em>Where do you start?</em></Typography>
            <Typography variant="h6" className={classes.text}>The Stock Market Simulator is a self-contained environment that lets you experiment
            with virtual money! Create or join a session with your friends or classmates, turn on artificial buyers and sellers, and inject
            events such as tech crashes or pandemics into the system and learn how to deal with them!</Typography>

            <Divider/>

            <Container>
                <Grid container spacing={6}>
                    <Grid item sm={12} md={4} lg={4}>
                        <Paper className={classes.paper}>
                            <HomeIcon fontSize="large" color="secondary"/>
                            <Typography variant="body1">Join a session to buy/sell!</Typography>
                        </Paper>
                    </Grid>

                    <Grid item sm={12} md={4} lg={4}>
                        <Paper className={classes.paper}>
                            <AttachMoneyIcon fontSize="large" color="secondary"/>
                            <Typography variant="body1">Build your portfolio!</Typography>
                        </Paper>
                    </Grid>

                    <Grid item sm={12} md={4} lg={4}>
                        <Paper className={classes.paper}>
                            <ShowChartIcon fontSize="large" color="secondary"/>
                            <Typography variant="body1">Inject events to influence the market!</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Divider/>

            <Typography variant="body1" className={classes.text}>Please login or signup to start your virtual investment game!</Typography>
        </div>
    );
}
export default LandingPage;
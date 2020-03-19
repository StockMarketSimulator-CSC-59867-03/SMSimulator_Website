import React from 'react';
import clsx from 'clsx';
// import "./h.css";
import { Link } from 'react-router-dom';
import StockGraph from '../../Components/StockGraph/stockGraph';
import SessionSearch from '../../Components/sessionSearch';
import ScrollableButtonList from '../../Components/SessionList/scrollableButtonList';
import GeneralButton from '../../Components/generalButton';
import Button from '@material-ui/core/Button';
import CreateSessionModal from '../../Components/CreateSessionModal/CreateSessionModal'
import MarketWindow from '../../Pages/OldPages/MarketWindow/marketwindow';
import LogInModal from '../../Components/LogInModal/LogInModal';
import SignUpModal from '../../Components/SignUpModal/SignUpModal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import changeSession from '../../redux/actions';
import changeSessionID from '../../redux/actions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';
import WatchedStocks from './WatchedStocks';
import Typography from '@material-ui/core/Typography';
import SessionStocks from './SessionStocks';
import { changeSessionID } from '../../redux/actions';

// type HomePageProps = {
//     history: any,
//     sessionData: any,
//     dispatch: any
// };

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          display: 'flex'
      },
      container: {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
          height: 475,
      },
      button: {
          position: "fixed",
          alignSelf: "center",
          marginBottom: 10
      },
      sessionStocks: {
          position: "relative"
      }
  }),
);

export default function HomePage(props:any) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log("Hello");
    
    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* MarketGraph */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="h5">Market Graph</Typography>
                            <StockGraph width={500} height={400}></StockGraph>
                        </Paper>
                    </Grid>
                    {/* Right Side Panel */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Button variant="contained" color="primary">View Portfolio</Button>
                            {/* <SessionStocks /> */}
                            <MarketWindow/>
                        </Paper>
                    </Grid>
                    {/* Watched Stocks */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <WatchedStocks/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
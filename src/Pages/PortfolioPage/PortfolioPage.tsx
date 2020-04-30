import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Container } from '@material-ui/core';
import WatchedStocks from '../HomePage/WatchedStocks';
import Typography from '@material-ui/core/Typography';
import OwnedStocks from './OwnedStocks';
import PortfolioStockGraph from './PortfolioStockGraph';

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
        // overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
          height: 475,
      },
      fixedHeightPreview: {
          height: 150,
      },
      fixedHeightStocks: {
          marginTop: 15,
          height: 310,
      },
      button: {
          justifySelf: "center",
      },
      sessionStocks: {
          padding: theme.spacing(1),
          zIndex: 1,
          overflow: 'auto',
      },
      card: {
          padding: theme.spacing(2),
        //   height: 150,
          position: "absolute",
          alignSelf: "center",
          zIndex: 2,
          display: 'flex',
          flexWrap: "wrap",
          flexDirection: 'column',
          background: "lightGray",
      },
      preview: {
          paddingTop: theme.spacing(1),
          justifySelf: "left"
      },
      divider: {
          flexGrow: 1,
      },
      titleDiv: {
          display: "flex",
          position: "relative",
      },
      return: {
          position: "absolute",
          right: theme.spacing(1)
      }
  }),
);

function PortfolioPage(props:any) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* MarketGraph */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <div className={classes.titleDiv}>
                                <Typography variant="h5">YOUR PORTFOLIO</Typography>
                                <Typography variant="h6" className={classes.return}>(+ XX.XX%)</Typography>
                            </div>
                            <PortfolioStockGraph/>
                        </Paper>
                    </Grid>
                    {/* Right Side Panel */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Typography variant="subtitle2">STOCKS YOU OWN</Typography>
                            <div className={classes.sessionStocks}><OwnedStocks/></div>
                        </Paper>
                    </Grid>
                    {/* Watched Stocks */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="subtitle2">Watch List</Typography>
                            <WatchedStocks sessionData={props.sessionData} currentUserData={props.currentUserData}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    sessionData: state.sessionData,
    currentUserData: state.currentUserData,
});

export default connect(mapStateToProps)(PortfolioPage);
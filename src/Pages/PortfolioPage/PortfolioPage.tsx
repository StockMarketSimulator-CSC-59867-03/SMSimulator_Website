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
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Card, Container, Fab, Divider } from '@material-ui/core';
import WatchedStocks from '../HomePage/WatchedStocks';
import Typography from '@material-ui/core/Typography';
import PortfolioStockGraph from './PortfolioStockGraph';
import OwnedStockItem from './OwnedStockItem';
import { useSelector } from 'react-redux';
import { lightBlue } from '@material-ui/core/colors';

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

function calculatePercentageGain(initialValue: number, value: number ){
    let percentageGain = 0;
    if(initialValue != null && initialValue != NaN && initialValue != 0){ // Only calculate when we can
        percentageGain = (value - initialValue) / initialValue * 100;
    }
    return percentageGain;
}

function PortfolioPage(props:any) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let sessionStocks = useSelector((state: any) => state.stockData);
    let userStocks = useSelector((state: any) => state.userStocks);
    let portfolioData = useSelector((state: any) => state.portfolioData);
    let stockItems: JSX.Element[] = [];

    // Go through the array of userStocks 
    // Calculate the value of stock they have and percentage gain and pass into OwnerStockItem
    let totalValue = 0; // While going through the array add up the value of all stocks which give total portofolio value
    let totalInitialValue = 0;
    Object.entries(userStocks).forEach((stock:any) => {
        if(sessionStocks != null || sessionStocks != {}){
            if(sessionStocks.hasOwnProperty(stock[0])){
                let stockData = sessionStocks[stock[0]];
                if(stockData.history != null && stockData.domain != null){
                    let stockQuantity = stock[1]["quantity"];
                    let initialValue = stock[1]["initialValue"];
                    let stockName = stockData["data"]["name"]
                    let price = Number(
                        stockData.history[stockData.history.length - 1]["price"].toFixed(2)
                      );

                    let value = stockQuantity * price;
                    if(initialValue != null && initialValue >= 0){
                        totalInitialValue += initialValue;
                    }
                    
                    let percentageGain = calculatePercentageGain(initialValue, value);

                    totalValue += value;
                    stockItems.push(( 
                        <Grid item xs={4}>
                            <OwnedStockItem name={stockName} quantity={stockQuantity} price={price} value={value} graphDomain={stockData.domain} stockHistory={stockData.history} gain={percentageGain}></OwnedStockItem>
                         </Grid>
                    ));
                }
            }
        }
       
    });

    let domain = [0,0];
    let data: any = [];

    if(Object.entries(portfolioData).length > 0 ){
        domain = portfolioData.domain;
        data = portfolioData.data;
    }
    console.log(domain);
    console.log(data);




    let portfolioGain = calculatePercentageGain(totalInitialValue, totalValue);
    let isGain = portfolioGain > 0;
    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h2" component="h2">
              ${totalValue.toLocaleString()}
            </Typography>
            <Typography variant="caption" display="block">
              Total Portfolio
            </Typography>
            <Typography
             style= {{
                color: isGain ? lightBlue[300]: "red",
              }}
              variant="subtitle1"
              display="block"
            >
                
              {portfolioGain > 0 ? '+' : ''}{portfolioGain.toFixed(2)}%
            </Typography>
            <div>
              <StockGraph  dataKey="value" handleClick={() => {}} domain={domain} data={data} width={800} height={500}/>
            </div>
          </Grid>
          <div>
            <Typography variant="h4" gutterBottom>
              Your Stocks:
            </Typography>
            <Grid container spacing={3}>
              {stockItems}
            </Grid>
          </div>
        </Container>
      </div>
    );
}

const mapStateToProps = (state: any) => ({
    sessionData: state.sessionData,
    currentUserData: state.currentUserData,
});

export default connect(mapStateToProps)(PortfolioPage);
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

import App from './App';
import Login from './Pages/OldPages/login';
import MarketWindow from './Pages/OldPages/MarketWindow/marketwindow';
import SignUp from './Pages/OldPages/signup'

import { Session } from 'inspector';
import StockData from './Pages/OldPages/StockData/stockdata';
import { Provider } from 'react-redux';
import store from "./redux/store";
import TransactionPage from './Pages/TransactionPage/TransactionPage';
import ManagePage from './Pages/ManagePage/ManagePage';
import NavigationDrawer from './Styling/navigation';
import HomePage from './Pages/HomePage/HomePage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import { StockDataService } from './Services/StockDataService';
import NotificationComponent from './Components/NotificationComponent/NotificationComponent';
import LoginTest from './Components/LogInModal/loginv2';
import { changeCurrentUserID, changeCurrentUsername, changeSessionID, addToWatchList, clearSelectedStockData, clearUserStockData } from './redux/actions';
import { NotificationListenerService } from './Services/NotificationListenerService';
import { UserDataService } from './Services/UserDataService';
import { Subject } from 'rxjs';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './Styling/styles';
import PortfolioPage from './Pages/PortfolioPage/PortfolioPage';
import EventInjection from './Pages/EventInjectionPage/EventInjection';
import { TransactionListenerService } from './Services/TransactionListenerService';
import transactionData from './redux/reducers/transactionDataReducer';
import { QueuedEventListenerService } from './Services/QueuedEventListenerService';
import ReduxStateListner from './ReduxStateListner';
import BotManager from './Services/BotManager';
import { BotSettings } from './DataModels/botSettings';



const firebaseConfig = {
  apiKey: "AIzaSyCWFa5caoShYrHxcLFlVeHyIzM3mXWgJo0",
  authDomain: "stock-market-sim.firebaseapp.com",
  databaseURL: "https://stock-market-sim.firebaseio.com",
  projectId: "stock-market-sim",
  storageBucket: "stock-market-sim.appspot.com",
  messagingSenderId: "6930575821",
  appId: "1:6930575821:web:ffa7c8cafc0ed7bb595484",
  measurementId: "G-6SR01THDJM"
  };

firebase.initializeApp(firebaseConfig);

const notificationListenerService = new NotificationListenerService();
const userDataService = new UserDataService();
const transactionListenerService = new TransactionListenerService();
const queuedEventListenerService = new QueuedEventListenerService();


let sessionID = localStorage.getItem('currentSessionID');
let savedBotSettings = localStorage.getItem('botSettings');

let botManager = new BotManager(firebase.firestore());

if(savedBotSettings != null && savedBotSettings != ""){
  let parsedSettings: BotSettings = JSON.parse(savedBotSettings);
  botManager.startLoop(parsedSettings);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("User is signed in:");
        const isValidUser = user;
        const uid = isValidUser?.uid;
        const username = isValidUser?.displayName;
        store.dispatch(changeCurrentUserID(uid));
        store.dispatch(changeCurrentUsername(username));
        notificationListenerService.attachUserNotificationListerner(uid);
        userDataService.changeUserID(uid);
        botManager.changeUserID(uid);
        
    } else {
        store.dispatch(changeCurrentUserID(undefined));
        store.dispatch(changeCurrentUsername(undefined));
        notificationListenerService.detachUserListner();
        queuedEventListenerService.detachQueuedEventListener();
        
    }
  });

const stockDataService = new StockDataService();





if(sessionID != null && sessionID != ""){
    store.dispatch(clearSelectedStockData());
    store.dispatch(changeSessionID(sessionID));
    stockDataService.changeCurrentSession(sessionID);
    userDataService.changeSessionID(sessionID);
    transactionListenerService.changeSessionID(sessionID);
    transactionListenerService.attachTransactionListener(sessionID);
    queuedEventListenerService.changeSessionID(sessionID);
    queuedEventListenerService.attachQueuedEventListener(sessionID);
    
}

const routing = (
  <Provider store={store}>
    <ReduxStateListner botManager={botManager}></ReduxStateListner>
    <Router>
      <NotificationComponent >
        <NavigationDrawer>
          <Route
            exact
            path="/"
            render={props => (
              <App transactionListenerService={transactionListenerService} stockDataService={stockDataService} userDataService={userDataService} queuedEventListenerService={queuedEventListenerService} botManager={botManager} {...props} />
            )}
          />
          {/* <Route path="/marketwindow" render={(props)=> <MarketWindow {...props} />} /> */}
          <Route path="/marketwindow" component={HomePage} />
          <Route path="/stockdata" component={StockData} />
          <Route path="/signup" component={SignUp} />
          <Route style={{height:"100%"}} path="/transactionPage" component={TransactionPage} />
          <Route path="/manage" render = {props => (<ManagePage botManager={botManager}></ManagePage>)} />
          <Route path="/portfolio" component={PortfolioPage} />
          <Route path="/eventinjection" 
                 render={props => (<EventInjection queuedEventListenerService={queuedEventListenerService} />)} />
          <Route 
            path="/profile"
            render={props => (
              <ProfilePage stockDataService={stockDataService} userDataService={userDataService} botManager={botManager} />
            )}
          />
        </NavigationDrawer>
      </NotificationComponent>
    </Router>
  
  </Provider>
);

ReactDOM.render(<ThemeProvider theme={theme}>{routing}</ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

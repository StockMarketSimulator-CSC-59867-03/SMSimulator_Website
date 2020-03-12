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
import NavigationDrawer from './Styling/navigation';
import HomePage from './Pages/HomePage/HomePage';

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

const routing = (
    <Provider store={store}>
        <Router>
            <NavigationDrawer content={
            <div>
                <Route exact path="/" render={(props)=> <App {...props} />}/>
                <Route path="/login" component={Login} />
                {/* <Route path="/marketwindow" render={(props)=> <MarketWindow {...props} />} /> */}
                <Route path="/marketwindow" component={HomePage} />
                <Route path="/stockdata" component={StockData} />
                <Route path="/signup" component={SignUp} />
                <Route path="/transactionPage" component={TransactionPage} />
            </div>}/>
        </Router>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

import App from './App';
import Login from './RouteComponents/login';
import MarketWindow from './RouteComponents/MarketWindow/marketwindow';

import MarketData from './RouteComponents/marketdata';

import SessionService from './Services/sessionService';
import { Session } from 'inspector';


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



const sessionService = new SessionService();


const routing = (
    <Router>
        <div>
            <Route exact path="/" render={(props)=> <App {...props} sessionService={sessionService}/>}/>
            <Route path="/login" component={Login} />
            <Route path="/marketwindow" render={(props)=> <MarketWindow {...props} sessionService={sessionService}/>} />
            <Route path="/marketdata" component={MarketData} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

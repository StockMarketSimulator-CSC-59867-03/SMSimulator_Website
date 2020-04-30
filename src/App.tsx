import React from 'react';
import './App.scss';
import SessionInitiation from './Components/sessioninitiation';
import { Link } from 'react-router-dom';
import SIState from './Components/sessioninitiation';
import {connect} from 'react-redux';
import SessionPage from './Pages/SessionPage/SessionPage';
import TransactionPage from './Pages/TransactionPage/TransactionPage';
import { StockDataService } from './Services/StockDataService';
import { UserDataService } from './Services/UserDataService';
import { TransactionListenerService } from './Services/TransactionListenerService';
import BotManager from './Services/BotManager';
import { QueuedEventListenerService } from './Services/QueuedEventListenerService';

interface IAppComponentProps { 
    history: any,
    stockDataService: StockDataService,
    transactionListenerService: TransactionListenerService,
    botManager: BotManager,
    queuedEventListenerService: QueuedEventListenerService,
    userDataService: UserDataService
}
interface IAppComponentState { }

class App extends React.Component<IAppComponentProps, IAppComponentState> {
    constructor(props: any) {
        super(props);
    }

    callTestAPI() {
        fetch("/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiTestResponse: res }))
            .catch(err => err);
    }

    createSession() {
        fetch("/createSession")
            .then(res => res.text())
            .then(res => alert(res))
            .catch(err => err);
    }

    render() {
        return (
            <div className="App">
                { /* <SessionInitiation onSubmit={(formData: SIState)=>{
           this.createSession();
         }} />*/}

            {/**  */} 
            <SessionPage history={this.props.history} stockDataService={this.props.stockDataService} transactionListenerService={this.props.transactionListenerService} userDataService={this.props.userDataService} queuedEventListenerService={this.props.queuedEventListenerService}/>
            </div>
        );
    }
}

export default App;
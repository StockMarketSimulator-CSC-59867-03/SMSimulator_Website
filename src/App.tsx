import React from 'react';
import './App.scss';
import SessionInitiation from './Components/sessioninitiation';
import { Link } from 'react-router-dom';
import SIState from './Components/sessioninitiation';
import {connect} from 'react-redux';
import LandingPage from './Pages/SessionPage/SessionPage';
import TransactionPage from './Pages/TransactionPage/TransactionPage';

interface IAppComponentProps { 
    history: any
}
interface IAppComponentState { }

class App extends React.Component<IAppComponentProps, IAppComponentState> {
    constructor(props: any) {
        super(props);
    }

    callTestAPI() {
        fetch("https://thawing-shore-19302.herokuapp.com/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiTestResponse: res }))
            .catch(err => err);
    }

    createSession() {
        fetch("https://thawing-shore-19302.herokuapp.com/createSession")
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
            <LandingPage history={this.props.history}/>
            </div>
        );
    }
}

export default App;
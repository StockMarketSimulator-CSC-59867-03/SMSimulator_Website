import React from 'react';
import './App.scss';
import SessionInitiation from './Components/sessioninitiation';
import EventInjection from './Components/eventinjection';
import { Link } from 'react-router-dom';
import Buy from './Components/buy';
import Sell from './Components/sell';
import SIState from './Components/sessioninitiation';
import MarketWindow from './Components/marketwindow';

interface IAppComponentProps { }
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
                {/*uncomment below to view pages*/}
                { /* <SessionInitiation onSubmit={(formData: SIState)=>{
           this.createSession();
         }} />*/}
                {/* <EventInjection /> */}
                {<Buy />}
                {/* <Sell /> */}
                <MarketWindow />
                <div>
                    <ul>
                        <li>
                            <Link to="/login"> Login </Link>
                        </li>
                        <li>
                            <Link to="/marketwindow"> Market Window </Link>
                        </li>
                        <li>
                            <Link to="/marketdata"> Market Data </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
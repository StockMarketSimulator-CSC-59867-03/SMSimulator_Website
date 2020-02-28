import React from 'react';
import { Link } from 'react-router-dom';

import MarketWindowModel from './MarketWindow.model'
import SessionService from '../../Services/sessionService';
import EventInjectionModal from '../../Components/EventInjectionModal/EventInjectionModal';

type MWProps = {
    sessionService: SessionService;
};
type MWState = {
    sessionTitle: string
    showModal: boolean,
    showPortfolio: boolean
};
class MarketWindow extends React.Component<MWProps, MWState> {
    private marketWindowModel: MarketWindowModel;
    private sessionService: SessionService;
    constructor(props: any) {
        super(props);
        this.state = {
            sessionTitle: "session_id",
            showModal: false,
            showPortfolio: false,
        }

        this.sessionService = props.sessionService;
        this.marketWindowModel = new MarketWindowModel(this.sessionService.getSessionID());

        this.showInjectionModal = this.showInjectionModal.bind(this);
        this.hideInjectionModal = this.hideInjectionModal.bind(this);

        this.showPortfolio = this.showPortfolio.bind(this);
        this.hidePortfolio = this.hidePortfolio.bind(this);
    }

    showInjectionModal() {
        //here we want to create a pop-up window where the admin can queue a shock/event
        this.setState({showModal: true});
    }

    hideInjectionModal() {
        this.setState({showModal: false});
    }

    showPortfolio() {
        this.setState({
            showPortfolio: true
        });
    }

    hidePortfolio() {
        this.setState({
            showPortfolio: false,
        });
    }

    render() {
        let current_user = "admin"; //the view should change depending on if a regular user or admin is viewing it
        const isViewingPortfolio = this.state.showPortfolio;
        let button;
        if(current_user === "admin") {
            button = <button onClick={this.showInjectionModal}>Shock Input</button>; //only admins can inject shocks
        }
        else {
            if(isViewingPortfolio)
                button = <button onClick={this.hidePortfolio}>View Market</button> //only users can view their portfolio
            else
                button = <button onClick={this.showPortfolio}>View Portfolio</button>
        }
        return (
            <div>
                <h1>Market Window</h1>
                <Link to="/"> Back to home </Link>
                <h3>{this.state.sessionTitle}</h3>
                <EventInjectionModal show={this.state.showModal} handleClose={this.hideInjectionModal}/>
                <div>
                    {isViewingPortfolio ? (<p>Showing Portfolio Graph</p>) : (<p>Showing Market Graph</p>)}
                </div>
                <div>
                    <p>The List of Stocks Should Go Here</p>
                </div>
                <div>
                    {button}
                </div>
            </div>
        );
    }
}
export default MarketWindow;
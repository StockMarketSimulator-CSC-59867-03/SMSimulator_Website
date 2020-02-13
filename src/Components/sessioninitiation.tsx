import React from 'react';

type SIProps = {};
type SIState = {
    inputStartingBalance: number,
    inputNumBots:         number,
    inputStockYear:       number,
};
class SIForm extends React.Component<SIProps, SIState> {
    constructor(props : any) {
        super(props);
        this.state = {
            inputStartingBalance: 0,
            inputNumBots:         0,
            inputStockYear:       0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event : any) {
        this.setState({
            //this syntax enables us to provide just one onChange handler for each of the input fields
            ...this.state,
            [event.target.name]: event.target.value, //dynamically change the state we are updating
        })
    }

    handleSubmit(event : any) {
        //function that executes when the "Create" button is pressed - ideally this will update the DB accordingly
        alert("Session created with: $" + this.state.inputStartingBalance + ", Bots: " + this.state.inputNumBots + ", Year: " + this.state.inputStockYear);
        event.preventDefault(); //prevents native submit event
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Starting Balance <input type="number" name="inputStartingBalance" onChange={this.handleChange}/></label>
                <br/>
                <label>Number of Bots <input type="number" name="inputNumBots" onChange={this.handleChange}/></label>
                <br/>
                <label>Stock Year <input type="number" name="inputStockYear" onChange={this.handleChange}/></label>
                <br/>
                <br/>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

type SessionInitiationProps = {};
type SessionInitiationState = {};
class SessionInitiation extends React.Component<SessionInitiationProps, SessionInitiationState> {
    constructor(props : any) {
        super(props);
        this.state = {
            //no states needed as of yet, placeholder
        }
    }

    render() {
        return (
            <div>
                <h1>Session Initiation</h1>
                <div>
                    <SIForm />
                </div>
            </div>
        );
    }
}

export default SessionInitiation;
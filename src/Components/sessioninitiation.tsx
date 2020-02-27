import React from 'react';

type SIProps = {
    onSubmit: any;
};
export type SIState = {
    inputStartingBalance: number,
    inputNumBots:         number,
};
class SIForm extends React.Component<SIProps, SIState> {
    constructor(props : any) {
        super(props);
        this.state = {
            inputStartingBalance: 0,
            inputNumBots:         0,
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
        this.props.onSubmit(this.state);
        event.preventDefault(); //prevents native submit event
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Starting Balance <input type="number" name="inputStartingBalance" onChange={this.handleChange}/></label>
                <br/>
                <label>Number of Bots <input type="number" name="inputNumBots" onChange={this.handleChange}/></label>
                <br/>
                <input type="submit" value="Create"/>
            </form>
        )
    }
}

type SessionInitiationProps = {
    onSubmit: any; //function
};
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
                    <SIForm onSubmit={this.props.onSubmit} />
                </div>
            </div>
        );
    }
}

export default SessionInitiation;
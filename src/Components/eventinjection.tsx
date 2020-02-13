import React from 'react';

type EIProps = {};
type EIState = {
    presetOptions:  object[],
    selectedOption: string
};
class EIForm extends React.Component<EIProps, EIState> {
    constructor(props : any) {
        super(props);

        //load the preset options from the database into an array
        let options = ["2008 Crash", "Tech Sector Crash", "Trade Deal"]; //dummy data for now

        this.state = {
            presetOptions:  this.initializeOptions(options),
            selectedOption: options[0],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    initializeOptions(arr : string[]) {
        let option_components : object[] = []; //this array will hold the option JSX components, children of the select component
        arr.forEach(option => {
            option_components.push(<option value={option.toLowerCase()}>{option}</option>)
        });
        return option_components;
    }

    handleChange(event : any) {
        this.setState({
            selectedOption: event.target.value,
        })
    }

    handleSubmit(event : any) {
        alert("\"" + this.state.selectedOption + "\" has been queued for simulation");
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Preset Options 
                    <select onChange={this.handleChange}>
                        {this.state.presetOptions}
                    </select>
                </label>
                <br/>
                <input type="submit" value="Inject"/>
            </form>
        );
    }
}

type EventInjectionProps = {};
type EventInjectionState = {};
class EventInjection extends React.Component<EventInjectionProps, EventInjectionState>{
    constructor(props : any){
        super(props);
        this.state = {
            //no states needed as of now
        }
    }

    render() {
        return (
            <div>
                <h1>Event Injection</h1>
                <div>
                    <EIForm />
                </div>
            </div>
        );
    }
}
export default EventInjection;
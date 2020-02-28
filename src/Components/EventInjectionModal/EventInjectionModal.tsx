import React from 'react';

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./EventInjectionModal.scss";
import "../../App.scss";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid, FormControl, InputLabel, Select, FormHelperText, MenuItem } from "@material-ui/core";

type EIProps = {};
type EIState = {
    presetOptions:  object[],
    selectedOption: string
};
class EIForm extends React.Component<EIProps, EIState> {
    constructor(props : any) {
        super(props);

        this.state = {
            presetOptions:  [],
            selectedOption: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        //load the preset options from the database into an array
        let options = ["2008 Crash", "Tech Sector Crash", "Trade Deal"]; //dummy data for now

        let option_components : object[] = [];
        options.forEach(option => {
            option_components.push(<MenuItem value={option.toLowerCase()}>{option}</MenuItem>)
        });

        this.setState({
            presetOptions: option_components,
            selectedOption: options[0]
        })
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
            <div>
                <Grid
                container
                direction="column"
                justify="center"
                alignItems="center">
                    <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">Preset Options</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={this.handleChange}>
                        {this.state.presetOptions}
                        </Select>
                        <FormHelperText>Choose an event to be queued</FormHelperText>
                    </FormControl>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Queue
                    </Button>
                </Grid>
            </div>
        );
    }
}

type EventInjectionProps = {
    show: boolean,
    handleClose: any
};
type EventInjectionState = {};
class EventInjectionModal extends React.Component<EventInjectionProps, EventInjectionState>{
    constructor(props : any){
        super(props);
        this.state = {
            //no states needed as of now
        }
    }

    render() {
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.show}
                    onClose={this.props.handleClose}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}>
                        <Fade in={this.props.show}>
                        <div className="modal__background " onClick={() => {}}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center">

                                <h2>Event Injection</h2>

                                <EIForm />
                            </Grid>
                        </div>
                        </Fade>
                </Modal>
            </div>
        );
    }
}
export default EventInjectionModal;
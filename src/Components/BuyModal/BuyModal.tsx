import React from 'react';

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./BuyModal.scss";
import "../../App.scss";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid } from "@material-ui/core";

type BuyProps = {
    show: boolean,
    handleClose: any,
};
type BuyState = {
    inputNumShares : number,
    inputBid       : number,
    minimumBid     : number
};
class BuyModal extends React.Component<BuyProps, BuyState>{
    constructor(props : any){
        super(props);
        this.state = {
            inputNumShares: 0,
            inputBid:       0,
            minimumBid:     0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event : any) {
        let value;
        event.target.value <= 0 ? value = 0 : value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        })
    }

    handleSubmit(event : any) {
        alert("Order submitted");
        event.preventDefault();
    }

    render() {
        let var_total = this.state.inputNumShares * this.state.inputBid;
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

                            <h2>Buy Shares</h2>

                            <TextField
                            id="standard-basic"
                            label="# of Shares"
                            name="inputNumShares"
                            onChange={this.handleChange}/>

                            <TextField
                            id="standard-basic"
                            label="Bid"
                            name="inputBid"
                            onChange={this.handleChange}/>
                            <br/>
                            <label>Total ({this.state.inputNumShares} x {this.state.inputBid}): ${var_total}</label>
                            <br/>
                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                Submit Order
                            </Button>
                        </Grid>
                    </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}
export default BuyModal;
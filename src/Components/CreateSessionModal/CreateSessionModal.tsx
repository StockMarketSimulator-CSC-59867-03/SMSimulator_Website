import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import "./CreateSessionModal.scss";
import "../../App.scss";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Grid
} from "@material-ui/core";
import Page1 from "./CreateSessionForm1";
import Page2 from "./CreateSessionStockSelecter";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme:any) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  }
});

type sessionModalProps = {
  onSessionCreate: any;
  onStocksSelected: any;
  userID: string;
  classes: any;
};

type sessionModalState = {
  open: boolean;
  sessionName: string;
  sessionBalance: number;
  sessionType: any;
  pageNumber: number;
};

class SessionModal extends React.Component<
  sessionModalProps,
  sessionModalState
> {

  selectedStocks = new Set();

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      sessionBalance: 0,
      sessionName: "",
      sessionType: "public",
      pageNumber: 1
    };
  }

  createSession() {}

  render() {
    const { classes } = this.props;

    const setOpen = (value: boolean) => {
      this.setState({
        open: value
      });
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      this.setState({
        ...this.state,
        open: false,
        pageNumber: 1
      });
    };

    const handleChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;

      this.setState({
        ...this.state,
        [name]: value
      });
    };

    const handleSubmitPage1 = (event: any) => {
      console.log("Handle Submit");
      console.log("USER ID: " + this.props.userID);
      console.log(this.state);

      this.props
        .onSessionCreate(
          this.state.sessionName,
          this.state.sessionBalance,
          this.state.sessionType,
          this.props.userID
        )
        .then(() => {
          this.setState({
            ...this.state,
            pageNumber: 2
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
      event.preventDefault();
    };

    const handleSubmitPage2 = (event: any) => {
      this.props.onStocksSelected(Array.from(this.selectedStocks)).then(()=>{
        this.setState({
          ...this.state,
          pageNumber: 3
        });
      });
    };

    let checked = false;
    return (
      <div>
            <Button color="primary"
                variant="contained"
                onClick={handleOpen}>
         New Session{" "}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.open}>
            <div className={classes.root}>
              <Grid
              style={{height:"100%"}}
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                {this.state.pageNumber == 1 ? (
                  <Fade  in={this.state.pageNumber == 1}>
                    <div style={{height:"100%", width:"100%"}}>
                      <Page1
                        handleSubmit={handleSubmitPage1}
                        handleClose={handleClose}
                        handleChange={handleChange}
                        values={this.state}
                      ></Page1>
                    </div>
                  </Fade>
                ) : (
                  <div></div>
                )}

            {this.state.pageNumber == 1 || this.state.pageNumber == 2 ? (
                <Fade in={this.state.pageNumber == 2}>
                  <div style={{height:"100%"}}>
                    <Page2 selectedStocks={this.selectedStocks} handleSubmit={handleSubmitPage2}></Page2>
                  </div>
                </Fade>
            ): (<div>
              <h2>Successfully Created Session with Stocks</h2>
            </div>)}


              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SessionModal);

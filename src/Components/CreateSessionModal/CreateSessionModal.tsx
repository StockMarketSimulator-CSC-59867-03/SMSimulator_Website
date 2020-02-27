import React from "react";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { render } from "@testing-library/react";
import { makeStyles } from "@material-ui/core/styles";
import "./CreateSessionModal.scss";
import "../../App.scss";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { RadioGroup, FormControlLabel, Radio, Grid } from "@material-ui/core";

type sessionModalProps = {};
type sessionModalState = {
  open: boolean;
  value: any;
};
export default class sessionModal extends React.Component<
  sessionModalProps,
  sessionModalState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      value: "public"
    };
  }

  render() {
    const styles = {
      modalStyle: {
        backgroundColor: "white"
      }
    };

    const setOpen = (value: boolean) => {
      this.setState({
        open: value
      });
    };

    const setvalue = (param: any) => {
      this.setState({
        open: true,
        value: param
      });
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalue((event.target as HTMLInputElement).value);
    };

    return (
      <div>
        <Button color="secondary" variant="contained" onClick={handleOpen}>
          Create Session
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
            <div className="modal__background " onClick={() => {}}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <h2>Create A Session:</h2>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Starting Balance"
                  variant="outlined"
                />
                <RadioGroup
                  aria-label="Session Type:"
                  name="sessionType"
                  value={this.state.value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="Public"
                  />
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="Private"
                  />
                </RadioGroup>
                <Button variant="contained" color="primary">
                  Next
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

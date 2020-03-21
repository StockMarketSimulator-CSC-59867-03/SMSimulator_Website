
import React, { useState } from 'react';
// import "./LandingPage.scss";
import { Link } from 'react-router-dom';
import StockGraph from '../../Components/StockGraph/stockGraph';
import SessionSearch from '../../Components/sessionSearch';
import ScrollableButtonList from '../../Components/SessionList/scrollableButtonList';
import GeneralButton from '../../Components/generalButton';
import Button from '@material-ui/core/Button';
import CreateSessionModal from '../../Components/CreateSessionModal/CreateSessionModal'
import MarketWindow from '../OldPages/MarketWindow/marketwindow';
import LogInModal from '../../Components/LogInModal/LogInModal';
import SignUpModal from '../../Components/SignUpModal/SignUpModal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeSessionID } from '../../redux/actions';
import { StockDataService } from '../../Services/StockDataService';

type SessionPageProps = {
    history: any,
    stockDataService: StockDataService
};

function SessionPage(props:SessionPageProps){

    const [openSessionDialog, setOpenSessionDialog] = useState(false);
    const [clickedSessionID, setClickedSessionID] = useState("");

    let dispatch = useDispatch();
    let sessionData = useSelector((state: any) => state.sessionData);

    console.log("Rendering SessionData");

    let createSession = (sessionName: string, startingBalance: number, type: string) : Promise<any> => {
        console.log("Creating Session");
        const data = { name: sessionName, balance: startingBalance, type: type};

        return new Promise((resolve,reject)=>{
            fetch('https://thawing-shore-19302.herokuapp.com/createSession', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if(response.status != 200){
                        throw "ERROR: Status is not 200";
                        
                    }
                    return response.text();
                })
                .then((data)=>{
                    console.log(data);
                    if(typeof data == "string"){
                        resolve(data);
                        dispatch(changeSessionID(data));
                        props.stockDataService.changeCurrentSession(data);
                    }
                    else{
                        reject("Error: Response wasn't a string for the session id");
                    }
                    
                })
                .catch((error) => {
                    reject(error);
                    console.error('Error:', error);
                });
        });

    }

    let addStocksToSession = (stocks: [string]): Promise<any> => {
        
        console.log("Creating Session");
        const data = { sessionID:sessionData.id, stocks:stocks};

        return new Promise((resolve,reject)=>{

            if(sessionData.id == ""){
                console.log("Error: No SessionID");
                reject("Error: No SessionID");
                return;
            }

            fetch('https://thawing-shore-19302.herokuapp.com/addStocks', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if(response.status != 200){
                        throw "ERROR: Status is not 200";
                        
                    }
                    resolve(response);
                    console.log("Successfully Added stocks to session");
                    props.history.push("/marketwindow");

                })
                .catch((error) => {
                    reject(error);
                    console.error('Error:', error);
                });
        });
    }

    const handleClickOpen = (sessionID: string) => {
        
        setClickedSessionID(sessionID);
        setOpenSessionDialog(true);
      };
    
      const handleClose = () => {
        setOpenSessionDialog(false);
      };

      const clickedYes = () => {
        dispatch(changeSessionID(clickedSessionID));
        props.stockDataService.changeCurrentSession(clickedSessionID);
        handleClose();
        props.history.push("/marketwindow");
      };

    return (
        <div>
          <h1 /*className="title"*/> Session Page </h1>

          <div /*className="sessions"*/>
            <h2>Session Search</h2>
            <SessionSearch />
            <Button /*className="sessionButton"*/>
              <CreateSessionModal
                onSessionCreate={createSession}
                onStocksSelected={addStocksToSession}
              ></CreateSessionModal>
            </Button>
            <h2>Session List</h2>
            <div /*className="sessionResults"*/>
              <ScrollableButtonList
                onButtonClick={(sessionID: string) => {
                  if (sessionID != null || sessionID != "") {
                      handleClickOpen(sessionID);
                  }
                }}
              />
            </div>
          </div>
          <Dialog
            open={openSessionDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Join session?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Switch session to {clickedSessionID}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={clickedYes} color="primary">
                Yes
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default SessionPage;
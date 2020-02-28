import React from 'react';
import "./h.css";
import { Link } from 'react-router-dom';
import StockGraph from '../Components/stockGraph';
import SessionSearch from '../Components/sessionSearch';
import ScrollableButtonList from '../Components/scrollableButtonList';
import GeneralButton from '../Components/generalButton';
import Button from '@material-ui/core/Button';
import CreateSessionModal from '../Components/CreateSessionModal/CreateSessionModal'
import MarketWindow from '../RouteComponents/MarketWindow/marketwindow';
import SessionService from '../Services/sessionService';

type MWProps = {
    sessionService: SessionService
};
type MWState = {

};
class Home extends React.Component<MWProps, MWState> {
    private sessionService: SessionService
    constructor(props: any) {
        super(props);
        this.state = {

        }
        this.sessionService = props.sessionService;
    }

    createSession = (sessionName: string, startingBalance: number, type: string) : Promise<any> => {
        console.log("Creating Session");
        const data = { name: sessionName, balance: startingBalance, type: type};

        return new Promise((resolve,reject)=>{
            fetch('/createSession', {
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
                        this.sessionService.setSessionID(data);
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

    addStocksToSession = (stocks: [string]): Promise<any> => {
        
        console.log("Creating Session");
        const data = { sessionID:this.sessionService.getSessionID(), stocks:stocks};

        return new Promise((resolve,reject)=>{

            if(this.sessionService.getSessionID() == ""){
                console.log("Error: No SessionID");
                reject("Error: No SessionID");
                return;
            }

            fetch('/addStocks', {
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
                })
                .catch((error) => {
                    reject(error);
                    console.error('Error:', error);
                });
        });
    }

    render() {
        return (
            <div>
                
                <h1 className="title"> Home page </h1>
                <Link className="login" to="../login"> Login</Link>
                <div className="sessions">
                    <h2>Session Search</h2>
                    <SessionSearch />
                    <h2>Session List</h2>
                    <div className="sessionResults">
                        <ScrollableButtonList />
                    </div>   
                </div>               

                <CreateSessionModal onSessionCreate={this.createSession} onStocksSelected={this.addStocksToSession}></CreateSessionModal>
               
            </div>
        );
    }
}
export default Home;
import React from 'react';
import "./h.css";
import { Link } from 'react-router-dom';
import StockGraph from '../Components/stockGraph';
import SessionSearch from '../Components/sessionSearch';
import ScrollableButtonList from '../Components/scrollableButtonList';
import GeneralButton from '../Components/generalButton';
import Button from '@material-ui/core/Button';
import CreateSessionModal from '../Components/CreateSessionModal/CreateSessionModal'

type MWProps = {};
type MWState = {

};
class Home extends React.Component<MWProps, MWState> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    createSession(sessionName: string, startingBalance: number, type: string) : Promise<any> {
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
                    resolve(response);
                    console.log(response);
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
                <Link className="login" to="../RouteComponents/login"> Login </Link>
                <div className="sessions">
                    <h2>Session Search</h2>
                    <SessionSearch />
                    <h2>Session List</h2>
                    <div className="sessionResults">
                        <ScrollableButtonList />
                    </div>
                    
                </div>

                <CreateSessionModal onSessionCreate={this.createSession}></CreateSessionModal>
               
            </div>
        );
    }
}
export default Home;
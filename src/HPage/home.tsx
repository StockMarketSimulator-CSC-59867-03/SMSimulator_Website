import React from 'react';
import "./h.css";
import { Link } from 'react-router-dom';
import StockGraph from '../Components/stockGraph';
import SessionSearch from '../Components/sessionSearch';
import ScrollableButtonList from '../Components/scrollableButtonList';


type MWProps = {};
type MWState = {

};
class Home extends React.Component<MWProps, MWState> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
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
            </div>
        );
    }
}
export default Home;
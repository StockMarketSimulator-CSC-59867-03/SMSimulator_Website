import React from 'react';
import GeneralButton from './generalButton';
import firebase from 'firebase';

type sbProps = {
    onButtonClick: any;
};
type sbState = {
    stocks: object[]

};

class scrollableButtonList extends React.Component<sbProps,sbState> {
    constructor(props : any) {
        super(props);
        this.state = {
            stocks: []
            
        }

        // This binding is necessary to make `this` work in the callbac
        this.handleClick = this.handleClick.bind(this);
    }

    // runs first every time component is called
    componentDidMount() {
        this.getSessions();
    }

    getSessions() {
        const db = firebase.firestore()
        let sessions = db.collection('Sessions');

        var sessionList: string[] = [];
        var toButtons: object[] = [];

        sessions.where("type", "==", "public").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                sessionList.push(doc.id);
            });
            for (let i in sessionList) {
                console.log(sessionList[i]);
                toButtons.push(<GeneralButton onClick={this.props.onButtonClick} sessionID={sessionList[i]} />)
            };
            this.setState({ stocks: toButtons });
        });
        }
    // Need to create usable functions to bind
    handleClick() {
        this.setState(state => ({/* bind to action*/ }));
    }

    render() {
 
        return (
            <div>
                {this.state.stocks}
             </div>
               );
    }
}
export default scrollableButtonList;
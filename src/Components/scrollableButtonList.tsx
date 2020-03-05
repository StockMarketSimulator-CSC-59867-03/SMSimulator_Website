import React , {useState, useEffect }from 'react';
import GeneralButton from './generalButton';
import firebase from 'firebase';

type sbProps = {
    onButtonClick: any;
};

function ScrollableButtonList(props: sbProps){
    const [stocks, setStocks] = useState([] as any);


    function getSessions() {
        const db = firebase.firestore()
        let sessions = db.collection('Sessions');

        var sessionList: string[] = [];
        var sessionNameList: string[] = [];
        var toButtons: object[] = [];

        sessions.where("type", "==", "public").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                sessionList.push(doc.id);
                sessionNameList.push(doc.data()["name"]);
            });
            for (let i in sessionList) {
                console.log(sessionList[i]);
                toButtons.push(<GeneralButton text={sessionNameList[i]} onClick={props.onButtonClick} sessionID={sessionList[i]} />)
            };
            setStocks(toButtons);
        });
        }

    useEffect(()=>{
        getSessions();
    },[]);

    return (
        <div>
            {stocks}
         </div>
    );
}


export default ScrollableButtonList;
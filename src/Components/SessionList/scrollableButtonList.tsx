import React , {useState, useEffect }from 'react';
import GeneralButton from '../generalButton';
import firebase from 'firebase';
import SessionListModel from './SessionList.model';

type sbProps = {
    onButtonClick: any;
};

let sessionListModel = new SessionListModel();

function ScrollableButtonList(props: sbProps){
    const [stocks, setStocks] = useState([] as any);

    let buttons: object[]  = [];


    useEffect(()=>{
        sessionListModel.init();
        sessionListModel.sessionObservable.subscribe((data: any)=>{
            buttons = [];
            data.forEach((element: any) => {
                buttons.push(<GeneralButton text={element.name} onClick={props.onButtonClick} sessionID={element.id} />)
            });
            setStocks(buttons);
        });
    },[]);

    useEffect(()=>{});

    return (
        <div>
            {stocks}
         </div>
    );
}


export default ScrollableButtonList;
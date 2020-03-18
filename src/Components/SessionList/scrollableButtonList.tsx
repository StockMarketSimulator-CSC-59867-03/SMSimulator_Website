import React , {useState, useEffect }from 'react';
import GeneralButton from '../generalButton';
import firebase from 'firebase';
import SessionListModel from './SessionList.model';
import store from '../../redux/store';
import { connect } from 'react-redux';

type sbProps = {
    onButtonClick: any,
    searchInput: any
};

let sessionListModel = new SessionListModel();
let previousSearchInput = "";
let initialSessionList: object[] = [];

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

            initialSessionList = buttons;
            setStocks(buttons);

            console.log("initial session data stored into stocks state");
        });
    },[]);


    function filterStocksBySearchInput(){
        let currentSearchInput = props.searchInput;

        buttons = [];

        if(!currentSearchInput){
            initialSessionList.forEach((element: any) => {
                buttons.push(<GeneralButton text={element.props.text} onClick={props.onButtonClick} sessionID={element.props.sessionID} />)
            })
        } else {
            initialSessionList.forEach((element: any) => {
                if(element.props.text.includes(currentSearchInput)){
                    buttons.push(<GeneralButton text={element.props.text} onClick={props.onButtonClick} sessionID={element.props.sessionID} />)
                }
            })
        }

        previousSearchInput = currentSearchInput;
    }

    // if search input is not empty, re render after filtering
    if(props.searchInput !== previousSearchInput){
        filterStocksBySearchInput();
        setStocks(buttons);
    }

    return (
        <div>
            {stocks}
         </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        searchInput: state.searchInput.searchInput
    }
}

export default connect(mapStateToProps)(ScrollableButtonList);
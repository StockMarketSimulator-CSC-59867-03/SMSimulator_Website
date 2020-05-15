import firebase from 'firebase';
import { Subject } from 'rxjs';

import store from '../redux/store';
import { addNotification, setTransactionData } from "../redux/actions";
import transactionData from '../redux/reducers/transactionDataReducer';
import { useDispatch } from 'react-redux';


let TransactionInstances = 0;



function showError(errorText: string){
    console.log("error");
}

export class TransactionListenerService{
    
    private db : any;
    private transListener: any;
    private sessionID: any;
    private transactionArray: any = [];
    constructor(){
        if(TransactionInstances > 0){
            showError("BUG: Mutliple StockDataServices are being initialized. Only one should exist");
        }
        TransactionInstances++;

        this.db = firebase.firestore();
        

    }

    detachTransactionListener = ()=>{
        if(this.transListener != null){
            this.transListener();
        }
    }
    changeSessionID = (sessionID: any) =>{
        if(sessionID == null ){
            return;
        }
        
        this.sessionID = sessionID; 
        console.log('changed session');
        console.log(sessionID);
    }

    attachTransactionListener = (sessionId: string)=>{

        this.detachTransactionListener();
        console.log("transAttached");
        console.log(sessionId);
        this.transactionArray = [];
        this.transListener = this.db.collection("Sessions").doc(sessionId).collection("CompletedOrders").orderBy("time").limitToLast(30)
        .onSnapshot((snapshot:any) => {
            snapshot.docChanges().forEach((change: any) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    let transaction = {
                        date: data.time,
                        symbol: data.stock,
                        cost: data.price,
                        volume: data.quantity
                    };
                console.log("addedTrans");
                console.log(transaction);

                this.transactionArray.push(transaction);

                if(this.transactionArray != null){
                    if(this.transactionArray.length > 30){
                        store.dispatch(setTransactionData(this.transactionArray.splice(0,29)));
                    }
                    else {
                        store.dispatch(setTransactionData(this.transactionArray));
                    }
                }
                
                }
            });
        });
    }
}
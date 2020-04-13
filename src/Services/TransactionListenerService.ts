import firebase from 'firebase';
import { Subject } from 'rxjs';

import store from '../redux/store';
import { addNotification, addTransaction } from "../redux/actions";
import transactionData from '../redux/reducers/transactionDataReducer';


let TransactionInstances = 0;


function showError(errorText: string){
    console.log("error");
}

export class TransactionListenerService{
    
    private db : any;
    private transListener: any;
    private sessionID: any;
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
    }

    attachTransactionListener = (sessionId: string)=>{

        this.detachTransactionListener();
        console.log("transAttached");
        console.log(sessionId);
        
        this.transListener = this.db.collection("Sessions").doc(sessionId).collection("CompletedOrders")
        .onSnapshot((snapshot:any) => {
            snapshot.docChanges().forEach((change: any) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    let transaction = {
                        time: data.time,
                        symbol: data.stock,
                        cost: data.price,
                        volume: data.quantity
                    };

                console.log(transaction);
                store.dispatch(addTransaction(transaction));
                }
            });
        });
    }
}
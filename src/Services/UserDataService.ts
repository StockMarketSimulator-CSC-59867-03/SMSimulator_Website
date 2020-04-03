import firebase from 'firebase';
import { Subject } from 'rxjs';

import store from '../redux/store';
import { addNotification,changeSessionBalance,setUserStockData,clearUserStockData } from "../redux/actions";


let notificationListenInstances = 0;


function showError(errorText: string){
    store.dispatch(addNotification({
        type:"INSTANT",
        title:"Error",
        body:errorText
    }));
}

interface UserStockData { 
    initialValue: number,
    quantity: number
} 

export class UserDataService{
    private db : any;
    private userNotifListener: any;
    private userStockListener: any;
    private sessionID: any;
    private userID: any;
    private stockDataMap: Map<string,UserStockData>;
    constructor(){
        if(notificationListenInstances > 0){
            showError("BUG: Mutliple StockDataServices are being initialized. Only one should exist");
        }
        notificationListenInstances++;

        this.stockDataMap = new Map();
        this.db = firebase.firestore();
        

    }

    detachUserListner = ()=>{
        if(this.userNotifListener != null){
            this.userNotifListener();

        }
    }

    detachUserStockListner = ()=>{
        if(this.userStockListener != null){
            this.userStockListener();
            this.stockDataMap = new Map();
            store.dispatch(clearUserStockData());
        }
    }

    changeSessionID = (sessionID: any) =>{
        if(sessionID == null ){
            return;
        }
        this.sessionID = sessionID;
        this.attachUserLiquidListener(this.sessionID,this.userID);
        this.attachUserStocksListener(this.sessionID,this.userID);  
    }

    changeUserID = (userID: any) => {
        if(userID == null ){
            return;
        }
        this.userID = userID;
        this.attachUserLiquidListener(this.sessionID,this.userID);  
        this.attachUserStocksListener(this.sessionID,this.userID);  

    }

    attachUserStocksListener = (sessionID: any, userId: any) => {

        if(sessionID == null || userId == null){
            return;
        }

        this.detachUserStockListner();

        this.userStockListener = this.db.collection("Sessions").doc(sessionID).collection("Users").doc(userId).collection("Stocks")
            .onSnapshot((snapshot: any) => {
                snapshot.docChanges().forEach((change: any) => {
                    if (change.type === "added") {
                        this.stockDataMap.set(change.doc.id,change.doc.data());
                    }
                    if (change.type === "modified") {
                        this.stockDataMap.set(change.doc.id,change.doc.data());
                    }
                    if (change.type === "removed") {
                        this.stockDataMap.delete(change.doc.id);
                    }
                });
                 let mapToObject = Array.from(this.stockDataMap).reduce((obj: any, [key, value]) => {
                    obj[key] = value;
                    return obj;
                  }, {});
                store.dispatch(setUserStockData(mapToObject));
            });
    }

    attachUserLiquidListener = (sessionID: any, userId: any)=>{
        if(sessionID == null || userId == null){
            return;
        }

        this.detachUserListner();

        this.sessionID = sessionID;
        this.userNotifListener = userId;
        
        let date = new Date();
        this.userNotifListener = this.db.collection("Sessions").doc(sessionID).collection("Users").doc(userId)
        .onSnapshot(function(doc: any) {
                    let data = doc.data();
                    if(data != null){
                        store.dispatch(changeSessionBalance(data.liquid));
                    }
                
        });
    }
}
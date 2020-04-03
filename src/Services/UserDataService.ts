import firebase from 'firebase';
import { Subject } from 'rxjs';

import store from '../redux/store';
import { addNotification,changeSessionBalance } from "../redux/actions";


let notificationListenInstances = 0;


function showError(errorText: string){
    store.dispatch(addNotification({
        type:"INSTANT",
        title:"Error",
        body:errorText
    }));
}

export class UserDataService{
    private db : any;
    private userNotifListener: any;
    private sessionID: any;
    private userID: any;
    constructor(){
        if(notificationListenInstances > 0){
            showError("BUG: Mutliple StockDataServices are being initialized. Only one should exist");
        }
        notificationListenInstances++;

        this.db = firebase.firestore();
        

    }

    detachUserListner = ()=>{
        if(this.userNotifListener != null){
            this.userNotifListener();
        }
    }

    changeSessionID = (sessionID: any) =>{
        if(sessionID == null ){
            return;
        }
        this.sessionID = sessionID;
        this.attachUserLiquidListener(this.sessionID,this.userID);
    }

    changeUserID = (userID: any) => {
        if(userID == null ){
            return;
        }
        this.userID = userID;
        this.attachUserLiquidListener(this.sessionID,this.userID);  
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
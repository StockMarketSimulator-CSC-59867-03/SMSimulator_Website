import firebase from 'firebase';
import { Subject } from 'rxjs';

import store from '../redux/store';
import { addNotification } from "../redux/actions";


let notificationListenInstances = 0;


function showError(errorText: string){
    store.dispatch(addNotification({
        type:"INSTANT",
        title:"Error",
        body:errorText
    }));
}

export class NotificationListenerService{
    private db : any;
    private userNotifListener: any;
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

    attachUserNotificationListerner = (userId: string)=>{

        this.detachUserListner();
        
        let date = new Date();
        this.userNotifListener = this.db.collection("User").doc(userId).collection("Notifications").where("time",">",date.getTime())
        .onSnapshot((snapshot:any) => {
            snapshot.docChanges().forEach((change: any) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    let notification = {
                        type: data.type,
                        title: data.title,
                        body: data.body
                    };
                    console.log(notification);
                    store.dispatch(addNotification(notification));
                }
            });
        });
    }
}
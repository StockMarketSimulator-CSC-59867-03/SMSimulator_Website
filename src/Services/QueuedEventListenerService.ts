import firebase from 'firebase';
import store from '../redux/store';
import { addToQueuedEvents } from '../redux/actions';

export class QueuedEventListenerService {
    private db:any;
    private sessionID:any;
    private queuedEventListener:any;

    constructor(){
        this.db = firebase.firestore();
    }

    detachQueuedEventListener = () => {
        if(this.queuedEventListener != null){
            this.queuedEventListener();
        }
    }

    changeSessionID = (sid: any) =>{
        if(sid == null ){
            return;
        }
        
        this.sessionID = sid;
    }

    attachQueuedEventListener = (sessionID:string) => {
        this.detachQueuedEventListener();
        this.queuedEventListener = this.db.collection("Sessions").doc(sessionID).collection("Events")
        .onSnapshot((snapshot:any) => {
            snapshot.docChanges().forEach((change: any) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    let event = {
                        name: data.name,
                        direction: data.direction,
                        sector: data.sector,
                        percent: data.percent,
                    };
                    // console.log(event);
                    store.dispatch(addToQueuedEvents(event));
                }
            });
        })
    }
}
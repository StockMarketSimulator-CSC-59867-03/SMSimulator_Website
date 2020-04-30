import firebase from 'firebase';
import store from '../redux/store';
import { addToQueuedEvents, clearQueuedEvents } from '../redux/actions';

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
        store.dispatch(clearQueuedEvents());
        this.sessionID = sid;
    }

    attachQueuedEventListener = (sessionID:string) => {
        this.detachQueuedEventListener();
        this.queuedEventListener = this.db.collection("Sessions").doc(sessionID).collection("Events")
        .onSnapshot((snapshot:any) => {
            snapshot.docChanges().forEach((change: any) => {
                let data = change.doc.data();
                if (change.type === "added") {
                    let event = {
                        name: data.name,
                        sector: data.sector,
                        favorability: data.favorability
                    };
                    // console.log(event);
                    store.dispatch(addToQueuedEvents(event));
                    //then update the stock favorability
                    let collectionRef;
                    if(data.sector === "all")
                        collectionRef = this.db.collection("Sessions").doc(sessionID).collection("Stocks");
                    else
                        collectionRef = this.db.collection("Sessions").doc(sessionID).collection("Stocks").where("sector", "==", data.sector);
                    
                    collectionRef.get().then((querySnapshot:any) => {
                        querySnapshot.forEach((doc:any) => {
                            doc.ref.set({
                                favorability: data.favorability
                            }, { merge: true });
                        })
                    })
                    .catch((error:any) => {
                        console.log("Event Listener Favorability Error: ", error);
                    })
                }
            });
        })
    }
}
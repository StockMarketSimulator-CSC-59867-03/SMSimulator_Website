import firebase from 'firebase';

export default class MarketWindowModel{
    private sessionID: string = "";
    private db : any;
    constructor(sessionID: string){
        console.log(sessionID);
        //this.changeCurrentSession(sessionID);
        this.db = firebase.firestore();
    }

    public changeCurrentSession = (sessionID: string) => {
        this.sessionID = sessionID;
        if(this.sessionID == ""){
            return;
        }
        this.db.collection("Sessions").doc(this.sessionID).collection("Stocks").get().then(function(querySnapshot: any) {
            querySnapshot.forEach(function(doc : any) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });


    }

}

import firebase from 'firebase';
import { Subject } from 'rxjs';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';


export default class MarketWindowModel{
    private sessionID: string = "";
    private db : any;
    public sessionStocks: Array<string> = [];
    public sessionStockData: Map<any,any>;

    public stockDataSubject = new Subject<any>();

    constructor(sessionID: string){
        console.log("CREATING NEW MARKETWINDOWMODLE");
        this.sessionStockData = new Map();
        this.db = firebase.firestore();
        this.changeCurrentSession(sessionID);
        
    }

    public changeCurrentSession = (sessionID: string) => {
        this.sessionID = sessionID;
        if(this.sessionID == ""){
            return;
        }
        console.log("HELLO");
        this.db.collection("Sessions").doc(this.sessionID).collection("Stocks").get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc : any) =>{
                // doc.data() is never undefined for query doc snapshots
                this.sessionStocks.push(doc.id);
            });
            console.log(this.sessionStocks);
            let mainQuery: Array<string> = []
            let nextQuery: Array<string> = [];


            if(this.sessionStocks.length >= 10){ //These quries don't support more than 10 in the dictionary
                let halfOfArray = Math.floor(this.sessionStocks.length/2);
                mainQuery = this.sessionStocks.slice(0, halfOfArray);
                nextQuery = this.sessionStocks.slice(halfOfArray, this.sessionStocks.length);
            }
            else{
                mainQuery = this.sessionStocks;
            }
            if(mainQuery.length > 0){

            
            this.db.collection("StockHistory").where(firebase.firestore.FieldPath.documentId(), "in", mainQuery).get()
            .then((querySnapshot : any)=>{
                querySnapshot.forEach((doc : any) =>{
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data()["history"]);
                    if(doc.data()["history"] != null){
                        this.sessionStockData.set(doc.id,doc.data()["history"].reverse());
                    }
                    
                });
                

                if(nextQuery.length > 0){
                    this.db.collection("StockHistory").where(firebase.firestore.FieldPath.documentId(), "in", nextQuery).get()
                    .then((querySnapshot : any)=>{
                        querySnapshot.forEach((doc : any) =>{
                            console.log(doc.id, " => ", doc.data()["history"]);
                            if(doc.data()["history"] != null){
                                this.sessionStockData.set(doc.id,doc.data()["history"].reverse());
                            }
                        });
                        this.stockDataSubject.next(this.sessionStockData);
                    });
                }else{
                    this.stockDataSubject.next(this.sessionStockData);
                }

                console.log(this.sessionStockData);
            })
            .catch((err: any)=>{
                console.log(err);
            });
        }

        });




    }

    addStockGraphListner(docID: string){
    }

}

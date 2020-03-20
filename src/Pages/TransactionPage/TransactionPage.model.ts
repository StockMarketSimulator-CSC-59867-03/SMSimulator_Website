import firebase from 'firebase';
import { collection, collectionData, collectionChanges } from 'rxfire/firestore';
import { map, flatMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Session } from 'inspector';

export class TransactionPageModel {
    public stockList: any = []
    public stockListObservable = new Subject<any>();
    private loaded: boolean = false;
    public currentSessionID: string = ""
    private collectionObservable: any = null;

    init(sessionID: string){
        if(sessionID == "" || (this.currentSessionID == sessionID) ){return;}
        if (this.collectionObservable != null){
            this.collectionObservable.remove();
        }
        this.currentSessionID = sessionID;
        const db = firebase.firestore()
        let stockListPath = db.collection('Sessions').doc(this.currentSessionID).collection('Stocks');
        this.collectionObservable =  collectionChanges(stockListPath).subscribe((data)=>{
            data.forEach((docData : any) =>{
                if(docData.type == "added"){
                    let stockData = docData.doc.data();
                    console.log(stockData);
                    this.stockList.push(stockData);
                }
            });
            this.stockListObservable.next(this.stockList);
        });

        
    }

    constructor(){
        
    }
}
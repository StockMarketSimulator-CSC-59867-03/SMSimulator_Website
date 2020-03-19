import firebase from 'firebase';
import { Subject } from 'rxjs';
import { collection, collectionData, collectionChanges } from 'rxfire/firestore';

import store from '../redux/store';

import { setStockData } from '../redux/actions';


function calculateDomain(value : Array<any>){
    let min = 1000000;
    let max = 0;
    for(let i = 0; i < value.length; i++){
        let price = value[i]["price"]
        if(price < min){
            min = price;
        }
        if(price > max){
            max = price;
        }
    }
    return [min - 20, max + 20];
  }

export interface StockDataFormat{ 
    data: any,
    history: any,
    domain: any
}

export class StockDataService{
    private sessionID: string = "";
    private db : any;
    public sessionStocks: Array<string> = [];
    public stockDataSubject = new Subject<any>();

    public stockDataMap: Map<string, StockDataFormat>;

    constructor(){
        this.stockDataMap = new Map();
        this.db = firebase.firestore();
        this.stockDataSubject.subscribe((value: Map<any,any>)=>{
            let mapToObject = Array.from(value).reduce((obj: any, [key, value]) => {
                obj[key] = value;
                return obj;
              }, {});
            store.dispatch(setStockData(mapToObject));
        });
    }

    public changeCurrentSession = (sessionID: string) => {
        this.sessionID = sessionID;
        if(this.sessionID == ""){
            return;
        }
        console.log("HELLO");
        this.stockDataMap = new Map();
        this.db.collection("Sessions").doc(this.sessionID).collection("Stocks").get().then((querySnapshot: any) => {
            querySnapshot.forEach((doc : any) =>{
                this.stockDataMap.set(doc.id,{data:doc.data(), history: null, domain: null});
                this.sessionStocks.push(doc.id);
            });
            console.log(this.stockDataMap);
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
                    if(doc.data()["history"] != null){
                        let oldData = this.stockDataMap.get(doc.id);
                        if (oldData != null){
                            let domain = calculateDomain(doc.data()["history"]);
                            this.stockDataMap.set(doc.id, {data:oldData.data, history:doc.data()["history"].reverse(), domain: domain});
                        }
                    }
                    
                });
                

                if(nextQuery.length > 0){
                    this.db.collection("StockHistory").where(firebase.firestore.FieldPath.documentId(), "in", nextQuery).get()
                    .then((querySnapshot : any)=>{
                        querySnapshot.forEach((doc : any) =>{
                            if(doc.data()["history"] != null){
                                let oldData = this.stockDataMap.get(doc.id);
                                if (oldData != null){
                                    let domain = calculateDomain(doc.data()["history"]);
                                    this.stockDataMap.set(doc.id, {data:oldData.data, history:doc.data()["history"].reverse(), domain: domain});
                                }                         }
                        });
                        this.stockDataSubject.next(this.stockDataMap);
                    });
                }else{
                    this.stockDataSubject.next(this.stockDataMap);
                }

            })
            .catch((err: any)=>{
                console.log(err);
            });
        }

        });




    }
}
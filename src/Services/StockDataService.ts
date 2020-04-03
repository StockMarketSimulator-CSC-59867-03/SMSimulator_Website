import firebase from 'firebase';
import { Subject } from 'rxjs';
import { collection, collectionData, collectionChanges } from 'rxfire/firestore';

import store from '../redux/store';
import { addNotification } from "../redux/actions";

import { setStockData,clearStockData } from '../redux/actions';

function showError(errorText: string){
    store.dispatch(addNotification({
        type:"INSTANT",
        title:"Error",
        body:errorText
    }));
}

let calls = 0;

function msToDateString(ms: number){
    let date = new Date(ms);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let formatted_date = year + "-" + month + "-" + day;
    return formatted_date;
}

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
    public stockDataSubject = new Subject<any>();
    public stockDataMap: Map<string, StockDataFormat>;
    private stockListners: any = [];
    private stockDocumentMap: Map<string,Map<string,Array<any>>> = new Map();
    private stockDocumentMapSubject = new Subject<any>();
    private newStockListner: any;

    constructor(){
        if(calls > 0){
            showError("BUG: Mutliple StockDataServices are being initialized. Only one should exist");
        }
        calls++;

        this.stockDataMap = new Map();
        this.db = firebase.firestore();
        this.stockDataSubject.subscribe((value: Map<any,any>)=>{
            let mapToObject = Array.from(value).reduce((obj: any, [key, value]) => {
                obj[key] = value;
                return obj;
              }, {});
            store.dispatch(setStockData(mapToObject));
        });


        // NEED: Algorithm probably could be more efficient 
        // Gets out of hand with a lot of data here 
        this.stockDocumentMapSubject.subscribe((stockSymbol:string )=>{
            
                let stockData: any[] = [];
                let stockDataMap = this.stockDocumentMap.get(stockSymbol);

                if(stockDataMap != null){
                    for(const [dataID, dataSet] of stockDataMap.entries()){
                        stockData = [...stockData,...dataSet];
                    }
                    stockData.sort((a,b)=> (a.dateTime > b.dateTime) ? 1 : -1);

                    stockData = stockData.map((x: any)=>{
                        x.dateTime = msToDateString(x.dateTime);
                        return x;
                    });

                    let limitedStockData = stockData.slice(stockData.length - 30, stockData.length);
                    console.log(stockData);
                    let oldData = this.stockDataMap.get(stockSymbol);
                    if (oldData != null){
                        let domain = calculateDomain(limitedStockData);
                        this.stockDataMap.set(stockSymbol, {data:oldData.data, history:limitedStockData, domain: domain});
                        this.stockDataSubject.next(this.stockDataMap);
                    }
                    
                }
                else{
                    showError("Error: StockDataMap is null for somereason in the StockDataService");
                }

        });

    }

    private createStockListner = (sessionID: string, stockName: string) => {
        this.stockDocumentMap.set(stockName, new Map());
        let newListner = this.db.collection("Sessions").doc(sessionID).collection("Stocks").doc(stockName).collection("Stock History")
        .onSnapshot((snapshot: any) => {
            snapshot.docChanges().forEach((change: any) => {
                if (change.type === "added" || change.type === "modified") {
                    let dataPoints = change.doc.data()["data"];
                    if(dataPoints != null){
                        this.stockDocumentMap.get(stockName)?.set(change.doc.id,dataPoints);
                    }
                    else{
                        showError("StockDataService: dataPoints from firebase is null");
                    }
                    this.stockDocumentMapSubject.next(stockName);
                }

                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                    this.stockDocumentMap.get(stockName)?.delete(change.doc.id);
                    this.stockDocumentMapSubject.next(stockName);
                }
            });
        });
        this.stockListners.push(newListner);
    }

    // Set up the listneres for a session for each stock 
    public changeCurrentSession = (sessionID: string) => {

        if(sessionID == this.sessionID){
            console.log("Called From the same session");
            return;
        }

        if (this.stockListners.length > 0){ // If there exists listeners already then we need to remove all of them
            this.stockListners.forEach((listener: any) => {
                listener();
            });
        }

        this.stockDataMap = new Map();
        this.stockListners = [];
        this.stockDocumentMap = new Map();
        store.dispatch(clearStockData());


        this.sessionID = sessionID;
        if(this.sessionID == ""){
            return;
        }

        if(this.newStockListner != null){
            this.newStockListner();
        }

        this.newStockListner = this.db.collection("Sessions").doc(sessionID).collection("Stocks")
        .onSnapshot((snapshot: any) => {
            snapshot.docChanges().forEach((change: any) => {
                if (change.type === "added") {
                    this.stockDataMap.set(change.doc.id,{data:change.doc.data(), history: null, domain: null});
                    console.log(`Creating stock listener for :${change.doc.id}`);
                    this.createStockListner(sessionID, change.doc.id);
                }
                if (change.type === "modified") {
                    
                }
                if (change.type === "removed") {
                    showError("STOCKS REMOVED. STOCKS SHOULDN'T BE REMOVED");
                }
            });
        });

    }

}
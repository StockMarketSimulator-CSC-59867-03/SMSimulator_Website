import {BotSettings} from '../DataModels/botSettings';
import * as favorabilityConfigJSON from '../botConfiguration.json';
import { Order } from '../DataModels/order.model';

// Returns a number within the range (starting - range) and (starting + range)
function randomizeInteger(max: number, min: number){
    return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min);
}

function randomizeFloat(max: number, min: number){ //Need to add random decimal
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const  favorabilityConfig = Object(favorabilityConfigJSON).default;

let createdBotManager = false;
export default class BotManager {
                 private static instance: BotManager;
                 stockMap: Map<string, any>; // favoribility settings
                 stockDataMap: Map<string, any>; // favoribility settings
                 db: any;
                 stockDataListner: any;
                 isOwner: boolean = false;

                 loopInterval: any;
                 botSettings: BotSettings = {
                   enabled: false,
                   orderRate: 5000,
                   successRate: 5,
                   matchRate: 5,
                 };
                 sessionID: string;
                 userID: any;

                 constructor(db: any) {
                   if (createdBotManager == true) {
                     throw "Two Bot Managers Created At once"; // Only done so the website crashes because two bot managers would cause A LOT of reads/writes
                   }

                   this.sessionID = "";
                   this.db = db;
                   console.log("BotManager Created");
                   this.stockMap = new Map();
                   this.stockDataMap = new Map();
                 }

                 getOwnerID(sessionID: string): Promise<string> {
                   return new Promise((resolve, reject) => {
                     var docRef = this.db.collection("Sessions").doc(sessionID);

                     docRef
                       .get()
                       .then((doc: any) => {
                         if (doc.exists) {
                           resolve(doc.data().ownerID);
                         } else {
                           // doc.data() will be undefined in this case
                           reject("No such document!");
                         }
                       })
                       .catch((error: any) => {
                         reject(error);
                       });
                   });
                 }

                 changeSessionID = (sessionID: any) => {
                   this.sessionID = sessionID;
                   this.isOwner = false;
                   this.verifyUser(this.sessionID, this.userID);
                   this.createFavorabilityListner();
                 };

                 changeUserID = (userID: any) => {
                   this.userID = userID;
                   this.isOwner = false;
                   this.verifyUser(this.sessionID, this.userID);
                 };

                 async verifyUser(sessionID: string, userID: string) {
                   if (this.loopInterval != "" && this.loopInterval != null) {
                     // Stop the loop
                     clearInterval(this.loopInterval);
                   }

                   if (
                     this.userID == "" ||
                     this.userID == null ||
                     this.sessionID == "" ||
                     this.sessionID == null
                   ) {
                     // Verify the sessionID and userID
                     console.log("RETURING");
                     return;
                   }

                   let ownerID = await this.getOwnerID(sessionID); // Get current ownerID of the current session
                   this.isOwner = ownerID == userID;
                   if (this.isOwner) {
                     this.startLoop(this.botSettings);
                   }
                 }

                 // Starts the Bot Manager loop based on the given settings. Or changes the settings
                 startLoop(newSettings: BotSettings) {
                   if (this.loopInterval != "" && this.loopInterval != null) {
                     // Stop the loop
                     clearInterval(this.loopInterval);
                   }

                   this.botSettings = newSettings;
                   if (this.isOwner) {
                     if (this.botSettings.enabled) {
                       this.loopInterval = setInterval(
                         this.loop.bind(this),
                         this.botSettings.orderRate
                       );
                     }
                   }
                 }

                 getStocks(stockData: any) {
                   // Might need to change to listners // COULD BE A BOTTLENECK
                   console.log(stockData);
                   this.stockMap = new Map();
                   const keys = Object.keys(stockData);
                   for (const key of keys) {
                     this.stockMap.set(key, {
                       data: stockData[key].data,
                       history: stockData[key].history,
                     });
                   }
                 }

                 createFavorabilityListner() {
                   this.stockDataMap = new Map();

                   if (this.stockDataListner != null) {
                     this.stockDataListner();
                   }

                   if (this.sessionID != null && this.sessionID != "") {
                     let stockDoc = this.db
                       .collection("Sessions")
                       .doc(this.sessionID)
                       .collection("Stocks");

                     this.stockDataListner = stockDoc.onSnapshot(
                       (snapshot: any) => {
                         snapshot.docChanges().forEach((change: any) => {
                           if (
                             change.type === "added" ||
                             change.type === "modified"
                           ) {
                             this.stockDataMap.set(
                               change.doc.id,
                               change.doc.data()
                             );
                           }
                           if (change.type === "removed") {
                             console.log("Removed city: ", change.doc.data());
                           }
                         });
                       }
                     );
                   }
                 }

                 //Computes a range with based on precentage increase from the parameters percentMax and percentMin
                 computePercentRange(
                   percentMax: number,
                   percentMin: number,
                   initialValue: number
                 ): { max: any; min: any } {
                   return {
                     max: (percentMax / 100) * initialValue + initialValue,
                     min: initialValue + (percentMin / 100) * initialValue,
                   };
                 }

                 async loop() {
                   console.log("BOT LOOP");
                   let batch = this.db.batch();
                   let date = new Date();
                   for (let [symbol, data] of this.stockMap) {
                     // Random check to perform the orders
                     if (
                       !(
                         randomizeInteger(100, 0) < this.botSettings.successRate
                       )
                     ) {
                       // performs random check on order skips loop if not met
                       continue;
                     }
                     console.log(`Creatings Buys/Sells for ${symbol} `);

                     let price = Number(
                       data.history[data.history.length - 1]["price"].toFixed(2)
                     );
                     let buyOrderDoc = this.db.collection("BuyOrders").doc();
                     let sellOrderDoc = this.db.collection("SellOrders").doc();
                     let favorability = this.stockDataMap.get(symbol)
                       .favorability;
                     console.log(favorability);
                     let buyConfig = favorabilityConfig[favorability].Buys;
                     let sellConfig = favorabilityConfig[favorability].Sells;
                     let qunatityConfig =
                       favorabilityConfig[favorability].Quantity;

                     // BUY ORDER
                     const {
                       max: buyPriceMax,
                       min: buyPriceMin,
                     } = this.computePercentRange(
                       buyConfig.priceMax,
                       buyConfig.priceMin,
                       price
                     );
                     let buyPrice = randomizeFloat(buyPriceMax, buyPriceMin);
                     let buyQuantity = randomizeInteger(
                       qunatityConfig.max,
                       qunatityConfig.min
                     );
                     let newBuyOrder: Order = {
                       price: buyPrice,
                       quantity: 1,
                       sessionID: this.sessionID,
                       stock: symbol,
                       time: date.getTime(),
                       user: "bot",
                     };
                     batch.set(buyOrderDoc, newBuyOrder);
                     if (
                       randomizeInteger(100, 0) < this.botSettings.matchRate
                     ) {
                       // Chance of a perfect match.
                       let matchedSellOrderDoc = this.db
                         .collection("SellOrders")
                         .doc();
                       let matchedBuyOrder: Order = {
                         price: buyPrice,
                         quantity: 1,
                         sessionID: this.sessionID,
                         stock: symbol,
                         time: date.getTime(),
                         user: "bot",
                       };
                       batch.set(matchedSellOrderDoc, matchedBuyOrder);
                     } else {
                       // SELL ORDER
                       const {
                         max: sellPriceMax,
                         min: sellPriceMin,
                       } = this.computePercentRange(
                         sellConfig.priceMax,
                         sellConfig.priceMin,
                         price
                       );

                       let newSellOrder: Order = {
                         price: randomizeFloat(sellPriceMax, sellPriceMin),
                         quantity: 1,
                         sessionID: this.sessionID,
                         stock: symbol,
                         time: date.getTime(),
                         user: "bot",
                       };

                       batch.set(sellOrderDoc, newSellOrder);
                     }
                   }
                   batch.commit().then(function () {
                     console.log("Completed Batch Loop");
                   });
                 }
               }

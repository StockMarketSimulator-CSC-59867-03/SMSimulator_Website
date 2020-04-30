import {BotSettings} from '../DataModels/botSettings';

// Returns a number within the range (starting - range) and (starting + range)
function randomizeInteger(max: number, min: number){
    return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min);
}

function randomizeFloat(max: number, min: number){ //Need to add random decimal
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export default class BotManager {
    
    stockMap: Map<string,any>; // favoribility settings
    db: any;
    stockDataListner: any;
    isOwner: boolean = false;

    loopInterval: any;
    botSettings: BotSettings = {
        enabled: false,
        orderRate: 100,
        successRate: 5,
        matchRate: 5

    };
    sessionID: string;
    userID: any;

    constructor(db: any) {
        this.sessionID = "";
        this.db = db;
        console.log("BotManager Created");
        this.stockMap = new Map();
        this.getStocks();
    }

    getOwnerID(sessionID: string): Promise<string>{
        return new Promise((resolve,reject)=>{
            var docRef = this.db.collection("Sessions").doc(sessionID);

            docRef.get().then((doc: any) => {
                if (doc.exists) {
                    resolve(doc.data().ownerID);
                } else {
                    // doc.data() will be undefined in this case
                    reject("No such document!");
                }
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    changeSessionID = (sessionID: any) =>{
        this.sessionID = sessionID;
        this.verifyUser(this.sessionID,this.userID);  
    }

    changeUserID = (userID: any) => {
        this.userID = userID;
        this.verifyUser(this.sessionID,this.userID);  

    }

    async verifyUser(sessionID: string, userID: string){
        if (this.loopInterval != "" && this.loopInterval != null){ // Stop the loop
            clearInterval(this.loopInterval);
        }

        if(this.userID == "" || this.userID == null || this.sessionID == "" || this.sessionID == null){ // Verify the sessionID and userID
            console.log("RETURING");
            return;
        }

        let ownerID = await this.getOwnerID(sessionID); // Get current ownerID of the current session
        this.isOwner = (ownerID == userID);
        if(this.isOwner){
            this.startLoop(this.botSettings);
        }
    }

    // Starts the Bot Manager loop based on the given settings. Or changes the settings 
    startLoop(newSettings: BotSettings){
        if (this.loopInterval != "" && this.loopInterval != null){ // Stop the loop
            clearInterval(this.loopInterval);
        }
        
        this.botSettings = newSettings;
        if(this.isOwner){
            if(this.botSettings.enabled){
                this.loopInterval = setInterval(this.loop.bind(this),this.botSettings.orderRate);
            }
        }
    }

    getStocks(){
 

    }

    //Computes a range with based on precentage increase from the parameters percentMax and percentMin
    computePercentRange(percentMax: number, percentMin: number, initialValue: number) : {max: any,min: any}{
        return {
            max: ((percentMax/100) * initialValue) + initialValue ,
            min: initialValue - ((percentMin/100) * initialValue)
        }
    }

   async loop(){
    console.log("HI");
    console.log(this.botSettings);
    }

}
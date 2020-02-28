export default class SessionService{
    private sessionID: string = "";
    constructor(){

    }

    getSessionID(){
        return this.sessionID;
    }

    setSessionID(sessionID: string){
        this.sessionID = sessionID;
    }

    sayHell(){
        console.log("EHHEHEH");
    }
}
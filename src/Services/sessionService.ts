import React from 'react';


export default class SessionService{
    private sessionID: string = "";
    constructor(){
        if(this.sessionID == ""){
            let storedSessionID = localStorage.getItem("sessionID");
            if(storedSessionID != null && storedSessionID != "" && typeof storedSessionID == "string"){
                this.sessionID = storedSessionID;
            }
        }
    }

    getSessionID(){
        return this.sessionID;
    }

    setSessionID(sessionID: string){
        localStorage.setItem("sessionID",sessionID);
        this.sessionID = sessionID;
    }

  
}
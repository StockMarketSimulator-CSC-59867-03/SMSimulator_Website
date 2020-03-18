import firebase from 'firebase';
import { collection, collectionData, collectionChanges } from 'rxfire/firestore';
import { map, flatMap } from 'rxjs/operators';
import { Subject } from 'rxjs';


class SessionListModel{
    public sessionList: any = []
    public sessionObservable = new Subject<any>();
    private loaded: boolean = false;

    constructor(){}
    init(){
        if(this.loaded != false){return;}

        const db = firebase.firestore()
        collectionChanges(db.collection('Sessions')).subscribe((data)=>{
            data.forEach((docData : any) =>{
                if(docData.type == "added"){
                    let sessionData = docData.doc.data();
                    this.sessionList.push({id:docData.doc.id, name: sessionData.name});
                }
            });
            this.sessionObservable.next(this.sessionList);
        });
    }
}

export default SessionListModel;

/*
            for (let i in sessionList) {
                console.log(sessionList[i]);
                toButtons.push(<GeneralButton text={sessionNameList[i]} onClick={props.onButtonClick} sessionID={sessionList[i]} />)
            };
            setStocks(toButtons);
            */
import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeSessionID,clearSelectedStockData,clearUserStockData } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { StockDataModel } from '../../DataModels/stockData.model';
import { setSelectedStockData } from '../../redux/actions';
import { StockDataService } from '../../Services/StockDataService';
import StockData from '../OldPages/StockData/stockdata';
import firebase from 'firebase';
import { collection, collectionData, collectionChanges } from 'rxfire/firestore';
import './ManagePage.scss';
import AddStocks from './AddStocks';
import { createStyles, makeStyles, Theme, Container, Grid, Paper, Typography } from '@material-ui/core';
import ArtificialSettings from './ArtificialSettings';
import BotManager from '../../Services/BotManager';

type ManagePageProps = {
    sessionData: any,
    botManager: BotManager
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        container: {
            margin: theme.spacing(2),
        },
        paper: {
            minHeight: `calc(100vh - ${theme.spacing(2)}vh)`,
            padding: theme.spacing(2),
        }
    })
)


function ManagePage(props: ManagePageProps){
    const db = firebase.firestore();
    const [joinKey, setJoinKey] = useState("");
    const classes = useStyles();
    const [playerData, setPlayerData] = useState([] as any);

    let history = useHistory();
    let dispatch = useDispatch();
    let playerDataArray = [] as any;
    let playerStockArray = [] as any;

//  join key logic
    db.collection('Sessions').doc(props.sessionData.id).get().then(doc => {
      if(doc.exists){
        setJoinKey(doc.data()?.joinKey);
      }
    }).catch(err => {
      console.log("Error getting join key from firebase");
    });

//  component initializes and renders, after render useEffect is ran
//  so, in useEffect, a listener is subscribed and is waiting for signal from database
//  say data changed, so onSnapshot function is called, array is populated and state is set
//  after state set, clean up function is ran so it is unsubscribed.
//  after clean up, re-render happens, useEffect is ran, and listener waits until further call from database
    useEffect(()=>{
//    player list logic
      let userRef = db.collection('Sessions').doc(props.sessionData.id).collection('Users');
//    set listener for the "user" subcollection
      let unsubscribe = userRef.onSnapshot(querySnapshot => {
        let index = 0;
        playerDataArray = [];
        playerStockArray = [];

        function seedQuerySnapshot(doc: any){
          return new Promise((resolve, reject) => {
            if(doc.data()){
              doc.ref.collection('Stocks').get().then((stockDoc: any) => {
                playerStockArray.push([]);
                stockDoc.forEach((stocks: any) => {
                  if(playerStockArray != null){
                    playerStockArray[index].push(
                      <div>
                        {stocks.id}: {stocks.data()?.quantity}
                      </div>
                    )
                  }
                })
                let userName = (doc.data()?.username != null) ? doc.data()?.username : "Admin";
                playerDataArray.push(
                  <Grid item xs={12} md={3} lg={3}>
                    <p>{userName} currently has <span className="liquid"><b>${doc.data()?.liquid}</b></span></p>
                    {playerStockArray[index]}
                    <p><AddStocks id={doc.data()?.id} /></p>
                  </Grid>
                )

                index++;

                resolve();
              })
            } else {
              resolve();
            }
          })
        }

        Promise.all(querySnapshot.docs.map(seedQuerySnapshot)).then(() => {
          console.log("Setting state now");
          setPlayerData(playerDataArray);
        })
      })
    },[]);

    let leaveSession = ()=>{
        dispatch(changeSessionID(""));
        dispatch(clearSelectedStockData());
        localStorage.setItem('currentSessionID',"");
        history.push("/");
        window.location.reload();
    };

    async function handleDeleteSession(){
        let result = await deleteSessionDocument(props.sessionData.id, 10);

        if(result === 1){ 
            leaveSession();
        } else {
            alert("Error deleting session " + props.sessionData.id);
        }
    }

    async function deleteSessionDocument(documentPath: any, batchSize: any){
        // since firebase do not delete subcollections inside document, manually delete them
        // First, delete the stock history collection
        db.collection('Sessions').doc(documentPath).collection('Stocks').get().then(querySnapshot => {
            querySnapshot.forEach(async doc => {
                let subCollectionStockHistory = doc.ref.collection('Stock History');
                await deleteCollection(db, subCollectionStockHistory, 2);
            })
        })
        
        // delete users collection
        let collectionRefUsers = db.collection('Sessions').doc(documentPath).collection('Users');
        await deleteCollection(db, collectionRefUsers, 10);

        // delete stocks collection
        let collectionRefStocks = db.collection('Sessions').doc(documentPath).collection('Stocks');
        await deleteCollection(db,  collectionRefStocks, 10);

        // delete the document now
        db.collection('Sessions').doc(documentPath).delete();

        // return promise to be resolved above
        return 1;
    }

    function deleteCollection(db: any, collectionRef: any, batchSize: any){
      // let collectionRef = db.collection('Sessions').doc(documentPath).collection(collectionPath);
      let query = collectionRef.orderBy('__name__').limit(batchSize);

      return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve, reject);
      });
    }

    function deleteQueryBatch(db: any, query: any, resolve: any, reject: any){
      query.get()
        .then((snapshot: any) => {
          // When there are no documents left, we are done
          if (snapshot.size === 0) {
            return 0;
          }

          // Delete documents in a batch
          let batch = db.batch();
          snapshot.docs.forEach((doc: any) => {
            batch.delete(doc.ref);
          });

          return batch.commit().then(() => {
            return snapshot.size;
          });
        }).then((numDeleted: any) => {
          if (numDeleted === 0) {
            resolve();
            return;
          }

          // Recurse on the next process tick, to avoid
          // exploding the stack.
          process.nextTick(() => {
            deleteQueryBatch(db, query, resolve, reject);
          });
        })
        .catch(reject);
    }

    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={classes.paper}>
                <div>
                  <p>
                    Your invitation code is: <b>{joinKey}</b>
                  </p>
                  <Button
                    id="deleteButton"
                    onClick={handleDeleteSession}
                    variant="contained"
                    color="secondary"
                  >
                    Completely delete this session
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <Paper className={classes.paper}>
                <Typography>Artifical Buyers/Sellers</Typography>
                <ArtificialSettings botManager={props.botManager} />
              </Paper>
            </Grid>
          </Grid>
          <Paper className={classes.paper} style={{marginTop:20}}>
              <h1 className="centerHeading">Player List</h1>
              <Grid container spacing={2} className="listPadding">
                {playerData}
              </Grid>
            </Paper>
        </Container>
      </div>
    );
}

function mapStateToProps(state: any){
  console.log("getting user id: ", state.currentUserData.id);

    return {
        sessionData: state.sessionData,
    };

}

export default connect(mapStateToProps)(ManagePage);
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

type ManagePageProps = {
    sessionData: any
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
    const [playerLiquidData, setPlayerLiquidData] = useState([] as any);

    let history = useHistory();
    let dispatch = useDispatch();
    let playerLiquidDataArray = [] as any;

    useEffect(()=>{
//    join key logic
      db.collection('Sessions').doc(props.sessionData.id).get().then(doc => {
        if(doc.exists){
          setJoinKey(doc.data()?.joinKey);
        }
      }).catch(err => {
        console.log("Error getting join key from firebase");
      });

//    player list logic
      db.collection('Sessions').doc(props.sessionData.id).collection('Users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // get players only
          if(doc.data()?.type == "player"){
            playerLiquidDataArray.push(
              <div>
                <p>{doc.data()?.username} currently has {doc.data()?.liquid}</p>
              </div>
            )
          }
        })

        setPlayerLiquidData(playerLiquidDataArray);
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

    
    return(
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={classes.paper}>
                <div>
                  <p>Your invitation code is: <b>{joinKey}</b></p>
                  <AddStocks />
                  <Button id="deleteButton" onClick={handleDeleteSession} variant="contained" color="secondary">
                    Completely delete this session
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
                <Paper className={classes.paper}>
                    <Typography>Artifical Buyers/Sellers</Typography>
                    <ArtificialSettings />
                </Paper>
            </Grid>
          </Grid>
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
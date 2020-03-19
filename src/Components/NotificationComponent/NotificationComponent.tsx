import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Notification } from '../../DataModels/notification';


function NotificationComponent(props: any){

    let defaultInstant: Notification = {
        type:"INSTANT",
        title:"",
        body:""
    };

    const [notifications , setNotifications] = React.useState([]);

    const [instant, setInstant] = React.useState({open: false, notification: defaultInstant});

  
    const handleClose = () => {
        setInstant({
            open: false,
            notification: defaultInstant
        });
    };

    if(notifications.length > 0 && instant.open == false){
        let instantNotification = notifications[0];
        let filteredArray = notifications.filter(item => item !== instantNotification);

        setInstant({
            open: true,
            notification: instantNotification
        });

        setNotifications(filteredArray);
    } 

    console.log("Rendering Notification");

   return  (
        <div >

      <Dialog
        open={instant.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{instant.notification.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {instant.notification.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <div>

            {props.children}
            </div>
         </div>
     );
}



export default NotificationComponent;
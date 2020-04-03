import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Notification } from '../../DataModels/notification';
import { useSelector, useDispatch } from 'react-redux';
import { replaceNotifications } from '../../redux/actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


function NotificationComponent(props: any){


    let defaultInstant: Notification = {
        type:"INSTANT",
        title:"",
        body:""
    };

    let defaultSnackBar: Notification = {
        type:"SNACKINFO",
        title:"",
        body:""
    };

    let dispatch = useDispatch();
    let notifications = useSelector((state: any) => state.notifications);


    const [instant, setInstant] = React.useState({open: false, notification: defaultInstant});
    const [snackBar, setSnackBar] = React.useState({open: false, notification: defaultSnackBar});
  
    const handleInstantClose = () => {
        setInstant({
            open: false,
            notification: defaultInstant
        });
    };

    const handleSnackClose = () => {
        setSnackBar({
            open: false,
            notification: defaultSnackBar
        });
    };

    if(notifications.length > 0 && instant.open == false && snackBar.open == false){
        let notif = notifications[0];
        let filteredArray = notifications.filter((item: any) => item !== notif);

        switch(notif.type) {
            case "INSTANT":
                setInstant({
                    open: true,
                    notification: notif
                });
              break;
            case "SNACKINFO":
                setSnackBar({
                    open: true,
                    notification: notif
                });
              break;
            case "SaleConfirmation":
              setInstant({
                open: true,
                notification: notif
            });
              break;
            case "PurchaseConfirmation":
                setInstant({
                  open: true,
                  notification: notif
              });
                break;
            default:
              // code block
          }

        dispatch(replaceNotifications(filteredArray));
    } 

    console.log("Rendering Notification");

   return (
     <div className="root">
       <Dialog
         open={instant.open}
         onClose={handleInstantClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">
           {instant.notification.title}
         </DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             {instant.notification.body}
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleInstantClose} color="primary" autoFocus>
             Ok
           </Button>
         </DialogActions>
       </Dialog>

       <Snackbar open={snackBar.open} autoHideDuration={6000} onClose={handleSnackClose}>
         <Alert onClose={handleSnackClose} severity="info">
           {snackBar.notification.title}
         </Alert>
       </Snackbar>
       {props.children}
     </div>
   );
}



export default NotificationComponent;
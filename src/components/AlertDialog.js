import React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const AlertDialog = (props) => (
    <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogActions>
            <Button onClick={props.onClose} color="primary">
                {props.no}
            </Button>
            <Button onClick={props.onAction} color="primary" autoFocus>
                {props.yes}
            </Button>
        </DialogActions>
    </Dialog>
)
  
export default AlertDialog;
import React from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';

const SystemNotification = ({
    openDeleteSnackBar,
    openUpdateSnackBar,
    openCreateSnackBar,
    openSendSnackBar,
    openRegisterParticipantSnackBar
}) => {
    const css = useStyles();
    return (
        <div>
            {/* Snackbar Delete Success */}
            <Snackbar TransitionComponent={Slide} open={openDeleteSnackBar}>
                <Alert severity="success">Delete Sucessfull</Alert>
            </Snackbar>
            {/* Snackbar Update Success */}
            <Snackbar TransitionComponent={Slide} open={openUpdateSnackBar}>
                <Alert severity="success">Update Sucessfull</Alert>
            </Snackbar>
            {/* Snackbar Create Success */}
            <Snackbar TransitionComponent={Slide} open={openCreateSnackBar}>
                <Alert severity="success">Create Sucessfull</Alert>
            </Snackbar>
            {/* Snackbar Send Success */}
            <Snackbar TransitionComponent={Slide} open={openSendSnackBar}>
                <Alert severity="success">Send Notification Successful</Alert>
            </Snackbar>
             {/* Snackbar Register Participant Success */}
             <Snackbar TransitionComponent={Slide} open={openRegisterParticipantSnackBar}>
                <Alert severity="success">Register Event Successful</Alert>
            </Snackbar>
        </div>
    );
};

export default SystemNotification;
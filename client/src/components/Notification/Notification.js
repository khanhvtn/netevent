import React from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const message = {
    DELETE: 'Deleted successfully',
    UPDATE: 'Updated successfully',
    CREATE: 'Created successfully',
    SEND_EMAIL: 'Sent Notification successfully',
    REGISTER: 'Registered Event successfully',
    RECOVER: 'Recovered successfully'
};

const SystemNotification = ({
    openDeleteSnackBar,
    openUpdateSnackBar,
    openCreateSnackBar,
    openRecoverySnackBar,
    openSendSnackBar,
    openRegisterParticipantSnackBar
}) => {
    return (
        <div>
            {/* Snackbar Delete Success */}
            <Snackbar TransitionComponent={Slide} open={openDeleteSnackBar}>
                <Alert severity="success">{message.DELETE}</Alert>
            </Snackbar>
            {/* Snackbar Update Success */}
            <Snackbar TransitionComponent={Slide} open={openUpdateSnackBar}>
                <Alert severity="success">{message.UPDATE}</Alert>
            </Snackbar>
            {/* Snackbar Create Success */}
            <Snackbar TransitionComponent={Slide} open={openCreateSnackBar}>
                <Alert severity="success">{message.CREATE}</Alert>
            </Snackbar>
            {/* Snackbar Send Success */}
            <Snackbar TransitionComponent={Slide} open={openSendSnackBar}>
                <Alert severity="success">{message.SEND_EMAIL}</Alert>
            </Snackbar>
            {/* Snackbar Register Participant Success */}
            <Snackbar
                TransitionComponent={Slide}
                open={openRegisterParticipantSnackBar}>
                <Alert severity="success">{message.REGISTER}</Alert>
            </Snackbar>
            {/* Snackbar Recover Success */}
            <Snackbar TransitionComponent={Slide} open={openRecoverySnackBar}>
                <Alert severity="success">{message.RECOVER}</Alert>
            </Snackbar>
        </div>
    );
};

export default SystemNotification;

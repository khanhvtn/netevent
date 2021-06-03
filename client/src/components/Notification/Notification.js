import React from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';

const SystemNotification = ({
    openDeleteSnackBar,
    openUpdateSnackBar,
    openCreateSnackBar,
    openRecoverySnackBar,
}) => {
    const css = useStyles();
    return (
        <div>
            {/* Snackbar Delete Success */}
            <Snackbar TransitionComponent={Slide} open={openDeleteSnackBar}>
                <Alert severity="success">Delete Success</Alert>
            </Snackbar>
            {/* Snackbar Update Success */}
            <Snackbar TransitionComponent={Slide} open={openUpdateSnackBar}>
                <Alert severity="success">Update Success</Alert>
            </Snackbar>
            {/* Snackbar Create Success */}
            <Snackbar TransitionComponent={Slide} open={openCreateSnackBar}>
                <Alert severity="success">Create Success</Alert>
            </Snackbar>
            {/* Snackbar Create Success */}
            <Snackbar TransitionComponent={Slide} open={openRecoverySnackBar}>
                <Alert severity="success">Recover Success</Alert>
            </Snackbar>
        </div>
    );
};

export default SystemNotification;

import React from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const FacilityNotification = ({
    openDeleteSnackBar,
    openUpdateSnackBar,
    openCreateSnackBar
}) => {
    return (
        <div>
            {/* Snackbar Delete Success */}
            <Snackbar TransitionComponent={Slide} open={openDeleteSnackBar}>
                <Alert severity="success">Delete Sucess</Alert>
            </Snackbar>
            {/* Snackbar Update Success */}
            <Snackbar TransitionComponent={Slide} open={openUpdateSnackBar}>
                <Alert severity="success">Update Sucess</Alert>
            </Snackbar>
            {/* Snackbar UpdCreateate Success */}
            <Snackbar TransitionComponent={Slide} open={openCreateSnackBar}>
                <Alert severity="success">Create Sucess</Alert>
            </Snackbar>
        </div>
    );
};

export default FacilityNotification;

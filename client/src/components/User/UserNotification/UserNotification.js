import React from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';

const UserNotification = ({
    openDeleteSnackBar,
    openUpdateSnackBar,
    openCreateSnackBar,
}) => {
    const css = useStyles();
    return (
        <div>
            {/* Snackbar Delete Success */}
            <Snackbar TransitionComponent={Slide} open={openDeleteSnackBar}>
                <Alert severity="success">Delete User Sucess</Alert>
            </Snackbar>
            {/* Snackbar Update Success */}
            <Snackbar TransitionComponent={Slide} open={openUpdateSnackBar}>
                <Alert severity="success">Update User Sucess</Alert>
            </Snackbar>
            {/* Snackbar UpdCreateate Success */}
            <Snackbar TransitionComponent={Slide} open={openCreateSnackBar}>
                <Alert severity="success">Create User Sucess</Alert>
            </Snackbar>
        </div>
    );
};

export default UserNotification;
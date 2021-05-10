import React, { useState } from 'react';
import useStyles from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import { TextField } from '@material-ui/core';

const facilityInitialState = {
    name: '',
    code: '',
    type: ''
}

const UpdateFacilityDialog = (props) => {
    const {
        openUpdateFacilityDialog,
        closeUpdateFacilityDialog,
        updateFacilityDialog
    } = props;
    const css = useStyles();
    const [newFacilityUpdate, setNewFacilityUpdate] = useState(facilityInitialState);

    const handleOnSubmit = () => {
        updateFacilityDialog(newFacilityUpdate);
        handleCloseUpdate();
    }

    const handleOnChangeText = (event) => {
        setNewFacilityUpdate({ ...newFacilityUpdate, [event.target.name]: event.target.value })
    }

    const handleCloseUpdate = () => {
        setNewFacilityUpdate(facilityInitialState);
        closeUpdateFacilityDialog();
    }

    return (
        <>
            <Dialog open={openUpdateFacilityDialog} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title" className={css.dialogCreate} fullWidth>
                <DialogTitle id="form-dialog-title">Facility Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill form to update a facility.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={newFacilityUpdate.name}
                        onChange={handleOnChangeText}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="code"
                        name="code"
                        label="Code"
                        type="text"
                        value={newFacilityUpdate.code}
                        onChange={handleOnChangeText}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="type"
                        name="type"
                        label="Type"
                        type="text"
                        value={newFacilityUpdate.type}
                        onChange={handleOnChangeText}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions className={css.m2}>
                    <Button onClick={handleCloseUpdate} color="default">
                        Cancel
                    </Button>
                    <Button onClick={handleOnSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateFacilityDialog;
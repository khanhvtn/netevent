import React, { useState } from 'react';
import useStyles from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import { TextField } from '@material-ui/core';
import { FACILITY_NAME_ERROR, FACILITY_CODE_ERROR, FACILITY_TYPE_ERROR } from '../../../../constants'
import Typography from "@material-ui/core/Typography";

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
    const [errorName, setErrorName] = useState(false);
    const [errorType, setErrorType] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const handleOnSubmit = () => {
        if(newFacilityUpdate.name !== '' && newFacilityUpdate.type !== '' && newFacilityUpdate.code !== ''){
        updateFacilityDialog(newFacilityUpdate);
        handleCloseUpdate();
        setErrorName(false)
        setErrorType(false)
        setErrorCode(false)
        }
    }

    const handleOnChangeText = (event) => {
        setNewFacilityUpdate({ ...newFacilityUpdate, [event.target.name]: event.target.value })
    }

    const handleCloseUpdate = () => {
        setNewFacilityUpdate(facilityInitialState);
        closeUpdateFacilityDialog();
        setErrorName(false)
        setErrorType(false)
        setErrorCode(false)
    }

    const handleOnBlueName = () => {
        if (newFacilityUpdate.name === '') {
            setErrorName(true);
        } else {
            setErrorName(false);

        }
    }

    const handleOnBlueCode = () => {
        if (newFacilityUpdate.code === '') {
            setErrorCode(true);
        } else {
            setErrorCode(false);

        }
    }

    const handleOnBlueType = () => {
        if (newFacilityUpdate.type === '') {
            setErrorType(true);
        } else {
            setErrorType(false);

        }
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
                        onBlur={handleOnBlueName}
                        value={newFacilityUpdate.name}
                        onChange={handleOnChangeText}
                        fullWidth
                    />
                    {errorName ? <Typography className={css.errorMessage}>{FACILITY_NAME_ERROR}</Typography> : <></>}

                    <TextField
                        margin="dense"
                        id="code"
                        name="code"
                        label="Code"
                        type="text"
                        onBlur={handleOnBlueCode}
                        value={newFacilityUpdate.code}
                        onChange={handleOnChangeText}
                        fullWidth
                    />
                    {errorCode ? <Typography className={css.errorMessage}>{FACILITY_CODE_ERROR}</Typography> : <></>}

                    <TextField
                        margin="dense"
                        id="type"
                        name="type"
                        label="Type"
                        type="text"
                        onBlur={handleOnBlueType}
                        value={newFacilityUpdate.type}
                        onChange={handleOnChangeText}
                        fullWidth
                    />
                    {errorType ? <Typography className={css.errorMessage}>{FACILITY_TYPE_ERROR}</Typography> : <></>}

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
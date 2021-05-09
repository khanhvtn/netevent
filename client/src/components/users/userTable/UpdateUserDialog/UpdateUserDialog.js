import React, { useState } from 'react';
import useStyles from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from "@material-ui/core/Button";
import { ROLE_ERROR } from '../../../../constants';
import { Typography } from '@material-ui/core';

const UpdateUserDialog = (props) => {
    const {
        roles,
        MenuProps,
        openUpdateUserDialog,
        closeUpdateUserDialog,
        updateUserDialog
    } = props;
    const css = useStyles();
    const [errorRole, setErrorRole] = useState(false);
    const [roleData, setRoleData] = useState([]);

    const handleOnSubmit = () => {
        updateUserDialog(roleData);
        handleCloseUpdate();
    }

    const handleOnChange = (e) => {
        setRoleData(e.target.value);
    }

    const handleCloseUpdate = () => {
        setRoleData([]);
        setErrorRole(false);
        closeUpdateUserDialog();
    }

    const handleOnBlueRole = () => {
        if (roleData.length === 0) {
            setErrorRole(true);
        } else {
            setErrorRole(false);
        }
    }

    return (
        <>
            <Dialog open={openUpdateUserDialog} onClose={handleCloseUpdate} aria-labelledby="form-dialog-title" className={css.dialogCreate} fullWidth>
                <DialogTitle id="form-dialog-title">User Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter roles to update an account.
                    </DialogContentText>
                    {/* <TextField
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onBlur={handleOnBlurEmailField}
                        value={userData.email}
                        onChange={(e) => handleChangeEmail(e)}
                    />

                    {errorEmail ? <Typography className={css.errorMessage}>{EMAIL_ERROR}</Typography> : <></>} */}

                    <FormControl fullWidth>
                        <InputLabel id="demo-mutiple-chip-label">Role</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            variant='outlined'
                            value={roleData}
                            onChange={handleOnChange}
                            onBlur={handleOnBlueRole}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={css.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value == "1" ? "Admin" : value == "2" ? "Reviewer" : value == "3" ? "Creator" : "Team Member"} className={css.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role == "1" ? "Admin" : role == "2" ? "Reviewer" : role == "3" ? "Creator" : "Team Member"}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errorRole ? <Typography className={css.errorMessage}>{ROLE_ERROR}</Typography> : <></>}

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

export default UpdateUserDialog;
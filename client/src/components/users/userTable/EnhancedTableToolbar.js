import React, { useState } from 'react';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { deleteUser, userCreate } from '../../../actions/userActions';
import { EMAIL_ERROR, ROLE_ERROR } from '../../../constants'
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
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

const initialState = {
    email: '',
    password: '',
    role: []
}

const roles = [
    '1',
    '2',
    '3',
    '4'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const EnhancedTableToolbar = (props) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { numSelected, selected, users } = props;
    const [openCreaterUserDialog, setOpenCreaterUserDialog] = useState(false);
    const [userData, setUserData] = useState(initialState);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorRole, setErrorRole] = useState(false);

    //Handle the Delete button
    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };

    const handleDeleteButton = () => {
        users.forEach((user) => {
            if (selected.indexOf(user.email) !== -1) handleDeleteUser(user._id);
        });
    };

    const handleChange = (event) => {
        setUserData({ ...userData, role: event.target.value });
    };

    const handleOpenCreateUserDialog = () => {
        setOpenCreaterUserDialog(true)
    }

    const handleCloseCreateUserDialog = () => {
        clearField(initialState)
        setErrorEmail(false)
        setErrorRole(false)
        setOpenCreaterUserDialog(false);
    }

    const handleOnBlurEmailField = () => {
        if (userData.email === '') {
            setErrorEmail(true)
        }

        else if (validateEmail(userData.email) == false) {
            setErrorEmail(true)

        } else {
            setErrorEmail(false)

        }
    }

    const handleOnBlueRole = () => {
        if (userData.role.length === 0) {
            setErrorRole(true)
        } else {
            setErrorRole(false)

        }
    }

    const handleChangeEmail = (e) => {
        setUserData({ ...userData, email: e.target.value })
    }


    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (userData.email !== '' && validateEmail(userData.email) == true && userData.role.length > 0) {
            setErrorEmail(false)
            setErrorRole(false)
            dispatch(userCreate(userData))
            clearField();
            handleCloseCreateUserDialog();
        }
    }

    const clearField = () => {
        setUserData(initialState)
    }

    return (
        <>

            <Toolbar
                className={clsx(css.rootEnhanceTableToolbar, {
                    [css.highlight]: numSelected > 0,
                })}
            >

                {numSelected > 0 ? (
                    <Typography
                        className={css.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                        <Typography
                            className={css.title}
                            variant="h4"
                            id="tableTitle"
                            component="div"
                        >
                            User List
                        </Typography>
                    )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={css.button}
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteButton}
                        >
                            Delete
                        </Button>
                    </Tooltip>
                ) : (
                        <>
                            {/* <IconButton aria-label="filter list">
                            <FilterListIcon />
                            </IconButton> */}
                            <Button
                                variant="contained"
                                color="primary"
                                className={css.addUser}
                                onClick={handleOpenCreateUserDialog}
                            >
                                Add user
                            </Button>

                            <Dialog open={openCreaterUserDialog} onClose={handleCloseCreateUserDialog} aria-labelledby="form-dialog-title" className={css.dialogCreate} fullWidth>
                                <DialogTitle id="form-dialog-title">User Register</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter User Email and Roles to create an account.
                                    </DialogContentText>
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        onBlur={handleOnBlurEmailField}
                                        value={userData.email}
                                        onChange={(e) => handleChangeEmail(e)}
                                    />

                                    {errorEmail ? <Typography className={css.errorMessage}>{EMAIL_ERROR}</Typography> : <></>}


                                    <FormControl fullWidth>
                                        <InputLabel id="demo-mutiple-chip-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={userData.role}
                                            onChange={handleChange}
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
                                    <Button onClick={handleCloseCreateUserDialog} variant="default" color="default">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleOnSubmit} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Tooltip title="Filter list">
                                <IconButton aria-label="filter list">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
            </Toolbar>
        </>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;

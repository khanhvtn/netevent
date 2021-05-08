import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
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
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, searchUsers, userCreate } from '../../actions/userActions';
import { EMAIL_ERROR, ROLE_ERROR } from '../../constants';
import useStyles from './styles';

import UserTable from '../../components/users/userTable/UserTable';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import {USER_CREATE_SUCCESSFUL} from '../../constants';

const initialState = {
    email: '',
    password: '',
    role: [],
};

const roles = ['1', '2', '3', '4'];

const userCreateState = {
    isAlertSuccess: false
}

const Dashboard = () => {
    const css = useStyles();
    const [openCreaterUserDialog, setOpenCreaterUserDialog] = useState(false);
    const [userData, setUserData] = useState(initialState);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorRole, setErrorRole] = useState(false);
    const dispatch = useDispatch();
    const [state, setState] = useState(userCreateState);

    const handleChange = (event) => {
        setUserData({ ...userData, role: event.target.value });
    };

    const handleOpenCreateUserDialog = () => {
        setOpenCreaterUserDialog(true);
    };

    const handleCloseCreateUserDialog = () => {
        clearField(initialState);
        setErrorEmail(false);
        setErrorRole(false);
        setOpenCreaterUserDialog(false);
    };

    const handleOnBlurEmailField = () => {
        if (userData.email === '') {
            setErrorEmail(true);
        } else if (validateEmail(userData.email) === false) {
            setErrorEmail(true);
        } else {
            setErrorEmail(false);
        }
    };

    const handleOnBlueRole = () => {
        if (userData.role.length === 0) {
            setErrorRole(true);
        } else {
            setErrorRole(false);
        }
    };

    const handleChangeEmail = (e) => {
        setUserData({ ...userData, email: e.target.value });
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (
            userData.email !== '' &&
            validateEmail(userData.email) === true &&
            userData.role.length > 0
        ) {
            setErrorEmail(false);
            setErrorRole(false);
            dispatch(userCreate(userData));
            clearField();
            handleCloseCreateUserDialog();
        }
    };

    const clearField = () => {
        setUserData(initialState);
    };

    const handleSearchUser = (e) => {
        if (e.key === 'Enter') {
            if (searchTerm) {
                dispatch(searchUsers(searchTerm));
            } else {
                setTableRefresh(!tableRefresh);
            }
            e.preventDefault();
        }
    };

    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useSelector((state) => state);
    const [userTableData, setUserTableData] = useState([]);
    const [tableRefresh, setTableRefresh] = useState(false);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, tableRefresh]);

    // useEffect(() => {
    //     setState((prevState) => ({ ...prevState, isCreateUserSuccess: user.isCreated }))
    // }, [user.isCreated])

    useEffect(() => {
        if (user.users) {
            setUserTableData(user.users?.data);
        }
    }, [handleSearchUser, user.users]);

    useEffect(() => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: user.isCreated }))
    }, [user.isCreated])

    const handleClose = () => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: false }))
        //set isSuccessPurchase == false
        dispatch({ type: USER_CREATE_SUCCESSFUL, payload: false })
    }


    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "center", horizontal: "bottom" }}
                open={user.isCreated}
                autoHideDuration={5000}
                color="primary"
                className={css.snackBar}
                onClose={handleClose}
                >
                    <Alert severity="success">Create User Successful</Alert>
            </Snackbar>
            
            <div className={css.main}>
                <Paper className={css.paper}>
                    <AppBar
                        className={css.searchBar}
                        position="static"
                        color="default"
                        elevation={0}
                    >
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <SearchIcon
                                        className={css.block}
                                        color="inherit"
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        value={searchTerm}
                                        onChange={handleChangeSearch}
                                        onKeyPress={(e) => handleSearchUser(e)}
                                        placeholder="Search by email address, phone number, or user UID"
                                        InputProps={{
                                            disableUnderline: true,
                                            className: css.searchInput,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={css.addUser}
                                        onClick={handleOpenCreateUserDialog}
                                    >
                                        Add user
                                    </Button>

                                    <Dialog
                                        open={openCreaterUserDialog}
                                        onClose={handleCloseCreateUserDialog}
                                        aria-labelledby="form-dialog-title"
                                    >
                                        <DialogTitle id="form-dialog-title">
                                            User Register
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Enter User Email and Roles to
                                                create an account.
                                            </DialogContentText>
                                            <TextField
                                                margin="dense"
                                                id="email"
                                                label="Email Address"
                                                type="email"
                                                fullWidth
                                                onBlur={handleOnBlurEmailField}
                                                value={userData.email}
                                                onChange={(e) =>
                                                    handleChangeEmail(e)
                                                }
                                            />

                                            {errorEmail ? (
                                                <Typography
                                                    className={css.errorMessage}
                                                >
                                                    {EMAIL_ERROR}
                                                </Typography>
                                            ) : (
                                                <></>
                                            )}

                                            <FormControl fullWidth>
                                                <InputLabel id="demo-mutiple-chip-label">
                                                    Role
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-mutiple-chip-label"
                                                    id="demo-mutiple-chip"
                                                    multiple
                                                    value={userData.role}
                                                    onChange={handleChange}
                                                    onBlur={handleOnBlueRole}
                                                    input={
                                                        <Input id="select-multiple-chip" />
                                                    }
                                                    renderValue={(selected) => (
                                                        <div
                                                            className={
                                                                css.chips
                                                            }
                                                        >
                                                            {selected.map(
                                                                (value) => (
                                                                    <Chip
                                                                        key={
                                                                            value
                                                                        }
                                                                        label={
                                                                            value ===
                                                                            '1'
                                                                                ? 'Admin'
                                                                                : value ===
                                                                                  '2'
                                                                                ? 'Reviewer'
                                                                                : value ===
                                                                                  '3'
                                                                                ? 'Creator'
                                                                                : 'Team Member'
                                                                        }
                                                                        className={
                                                                            css.chip
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {roles.map((role) => (
                                                        <MenuItem
                                                            key={role}
                                                            value={role}
                                                        >
                                                            {role === '1'
                                                                ? 'Admin'
                                                                : role === '2'
                                                                ? 'Reviewer'
                                                                : role === '3'
                                                                ? 'Creator'
                                                                : 'Team Member'}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {errorRole ? (
                                                <Typography
                                                    className={css.errorMessage}
                                                >
                                                    {ROLE_ERROR}
                                                </Typography>
                                            ) : (
                                                <></>
                                            )}
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={
                                                    handleCloseCreateUserDialog
                                                }
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleOnSubmit}
                                                color="primary"
                                            >
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Tooltip title="Reload">
                                        <IconButton
                                            onClick={() =>
                                                setTableRefresh(!tableRefresh)
                                            }
                                        >
                                            <RefreshIcon
                                                className={css.block}
                                                color="inherit"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Paper elevation={0} className={css.root}>
                        <UserTable
                            userData={userTableData}
                            loading={user.isLoading}
                        />
                    </Paper>
                </Paper>
            </div>
        </>
    );
};

export default Dashboard;

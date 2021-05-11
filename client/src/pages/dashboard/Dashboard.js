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
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, searchUsers } from '../../actions/userActions';
import useStyles from './styles';

import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import {USER_CREATE_SUCCESSFUL, USER_UPDATE_SUCCESSFUL} from '../../constants';
import UserTable from '../../components/Users/UserTable/UserTable';

const userCreateState = {
    isAlertSuccess: false,
};

const Dashboard = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useSelector((state) => state);
    const [userTableData, setUserTableData] = useState([]);
    const [tableRefresh, setTableRefresh] = useState(false);
    const [state, setState] = useState(userCreateState);

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

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, tableRefresh]);

    useEffect(() => {
        if (user.users) {
            setUserTableData(user.users);
        }
    }, [user.users]);

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            isAlertSuccess: user.isCreated,
        }));
    }, [user.isCreated]);

    const handleCreateSnackbarClose = () => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: false }));
        //set isSuccessPurchase == false
        dispatch({ type: USER_CREATE_SUCCESSFUL, payload: false });
    };

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            isAlertSuccess: user.isUpdated,
        }));
    }, [user.isUpdated]);

    const handleUpdateSnackbarClose = () => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: false }));
        //set isSuccessPurchase == false
        dispatch({ type: USER_UPDATE_SUCCESSFUL, payload: false });
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={user.isCreated}
                autoHideDuration={3000}
                color="primary"
                className={css.snackBar}
                onClose={handleCreateSnackbarClose}
            >
                <Alert severity="success">Create User Successful</Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={user.isUpdated}
                autoHideDuration={3000}
                color="primary"
                className={css.snackBar}
                onClose={handleUpdateSnackbarClose}
            >
                <Alert severity="success">Update User Successful</Alert>
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

import React, { useEffect, useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import TagFacesIcon from '@material-ui/icons/TagFaces';

import { useDispatch, useSelector } from 'react-redux';
import { filterUsers, getUsers, searchUsers, userCreate } from '../../actions/userActions';
import useStyles from './styles';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { USER_CREATE_SUCCESSFUL, USER_UPDATE_SUCCESSFUL } from '../../constants';
import { Button, Checkbox, ClickAwayListener, CssBaseline, DialogActions, Divider, Fade, Chip, FormControlLabel, FormGroup, Popper, Typography } from '@material-ui/core';
import UserTable from "../../components/users/userTable/UserTable"

const initialState = {
    email: '',
    password: '',
    role: [],
};

const roles = ['1', '2', '3', '4'];

const userCreateState = {
    isAlertSuccess: false
}

const filterState = [
    { key: 1, checked: false, label: 'Admin', role: '1' },
    { key: 2, checked: false, label: 'Reviewer', role: '2' },
    { key: 3, checked: false, label: 'Creator', role: '3' },
    { key: 4, checked: false, label: 'Team Member', role: '4' }
]


const chipFilterData = [
    { key: 1, label: 'Admin' },
    { key: 2, label: 'Creator' },
    { key: 3, label: 'Reviewer' },
    { key: 4, label: 'Team Member' },
]

const Dashboard = () => {
    const css = useStyles();
    const dispatch = useDispatch();
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

    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useSelector((state) => state);
    const [userTableData, setUserTableData] = useState([]);
    const [tableRefresh, setTableRefresh] = useState(false);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, tableRefresh]);

    useEffect(() => {
        if (user.users) {
            setUserTableData(user.users);
        }
    }, [handleSearchUser, user.users]);

    useEffect(() => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: user.isCreated }))
    }, [user.isCreated])

    const handleCreateSnackbarClose = () => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: false }))
        //set isSuccessPurchase == false
        dispatch({ type: USER_CREATE_SUCCESSFUL, payload: false })
    }

    useEffect(() => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: user.isUpdated }))
    }, [user.isUpdated])

    const handleUpdateSnackbarClose = () => {
        setState((prevState) => ({ ...prevState, isAlertSuccess: false }))
        //set isSuccessPurchase == false
        dispatch({ type: USER_UPDATE_SUCCESSFUL, payload: false })
    }

    const [openFilter, setOpenFilter] = useState(false);
    const anchorRef = useRef(null);

    const handleToggleFilter = () => {
        setOpenFilter((prevOpen) => !prevOpen);
    };

    const handleCloseFilter = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setFilterData(filterState)
        setOpenFilter(false);
    };

    const handleClearFilter = () => {
        setFilterData(filterState)
    }

    const handleFilter = () => {
        console.log("Filter")
        const filterRole = filterData.filter((data) => true === data.checked).map((data) => data.role);
        dispatch(filterUsers(filterRole))
        setOpenFilter(false)
    }

    const [filterData, setFilterData] = useState(filterState);

    const handleFilterChange = (event) => {
        setFilterData((datas) => datas.map((data) => data.label === event.target.name ? { ...data, checked: event.target.checked } : data));
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={user.isCreated}
                autoHideDuration={3000}
                color="primary"
                className={css.snackBar}
                onClose={handleCreateSnackbarClose}
            >
                <Alert severity="success">Create User Successful</Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
                                        placeholder="Search by email"
                                        InputProps={{
                                            disableUnderline: true,
                                            className: css.searchInput,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Filter">
                                        <IconButton
                                            ref={anchorRef}
                                            onClick={handleToggleFilter}

                                        >
                                            <FilterListIcon
                                                className={css.block}
                                                color="inherit"
                                            />
                                        </IconButton>
                                    </Tooltip>
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
                    <ClickAwayListener onClickAway={handleCloseFilter}>
                        <Popper open={openFilter} anchorEl={anchorRef.current} placement={'bottom-end'} role={undefined} transition>
                            {({ TransitionProps }) => (
                                <Fade
                                    {...TransitionProps} timeout={350}>
                                    <Paper className={css.filterPaper} square>
                                        <FormGroup>
                                            <Typography className={css.typography}>Filter by roles.</Typography>
                                            {filterData.map((data, index) => {
                                                return (
                                                    <>
                                                        <FormControlLabel
                                                            key={index}
                                                            className={css.typography}
                                                            control={
                                                                <Checkbox
                                                                    checked={data.checked}
                                                                    onChange={handleFilterChange}
                                                                    name={data.label}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={data.label}
                                                        />
                                                    </>
                                                )
                                            })}
                                            <Divider />
                                            <DialogActions>
                                                <Button className={css.filterAction} onClick={handleClearFilter} color="default">
                                                    Clear
                                                </Button>
                                                <Button className={css.filterAction} onClick={handleFilter} variant="contained" color="primary">
                                                    Filter
                                                </Button>
                                            </DialogActions>
                                        </FormGroup>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </ClickAwayListener>
                </Paper>
            </div>
        </>
    );
};

export default Dashboard;

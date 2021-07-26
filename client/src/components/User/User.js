import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
    Paper,
    AppBar,
    Toolbar,
    InputBase,
    IconButton,
    Grid,
    Tooltip
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import {
    getUsers,
    createUser,
    deleteUsers,
    updateUser
} from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR, USER_LOADING } from '../../constants';
import UserTable from './UserTable/UserTable';
import UserFilter from './UserFilter/UserFilter';
import UserNotification from './UserNotification/UserNotification';
import UserDialog from './UserDialog/UserDialog';
import UserPagination from './UserPagination/UserPagination';
import { useHistory } from 'react-router-dom';

const initialState = {
    search: '',
    take: 10,
    page: 1,
    openCreateAndUpdateDialog: false,
    email: '',
    role: [],
    openAlert: false,
    openDeleteDialog: false,
    openDeleteSnackBar: false,
    openUpdateSnackBar: false,
    openCreateSnackBar: false,
    isCreateMode: true,
    openFilter: false,
    rolesFilter: '',
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null
};

const filterState = {
    rolesFilter: '',
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null
};

const User = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, users, isCreated, isDeleted, isUpdated } = useSelector(
        (state) => ({
            user: state.user.user,
            users: state.user.users,
            isLoading: state.user.isLoading,
            totalPages: state.user.totalPages,
            errors: state.error.errors,
            isCreated: state.user.isCreated,
            isDeleted: state.user.isDeleted,
            isUpdated: state.user.isUpdated
        })
    );

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);

    const [selected, setSelected] = useState([]);

    const [timeOutForSearch, setTimeOutForSearch] = useState({
        key: '',
        timeoutFunc: null
    });

    //useEffect
    useEffect(() => {
        const filterDate = {
            createdFrom: state.createdFrom
                ? format(Date.parse(state.createdFrom), 'yyyy-MM-dd')
                : '',
            createdTo: state.createdTo
                ? format(Date.parse(state.createdTo), 'yyyy-MM-dd')
                : '',
            updatedFrom: state.updatedFrom
                ? format(Date.parse(state.updatedFrom), 'yyyy-MM-dd')
                : '',
            updatedTo: state.updatedTo
                ? format(Date.parse(state.updatedTo), 'yyyy-MM-dd')
                : ''
        };
        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: isUpdated,
            openCreateAndUpdateDialog: false,
            isCreateMode: true,
            email: '',
            role: [],
            openAlert: isCreated,
            openDeleteSnackBar: isDeleted,
            openCreateSnackBar: isCreated,
            openDeleteDialog: false
        }));
        //clear selected item
        setSelected(() => []);

        dispatch(
            getUsers(
                state.search,
                state.take,
                state.page,
                state.rolesFilter,
                filterDate.createdFrom,
                filterDate.createdTo,
                filterDate.updatedFrom,
                filterDate.updatedTo
            )
        );
        return () => {
            dispatch({
                type: ERROR_CLEAR,
                payload: null
            });
        };
    }, [
        dispatch,
        state.search,
        state.take,
        state.page,
        state.rolesFilter,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        isUpdated,
        isCreated,
        isDeleted
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'take') {
            return setState((prevState) => ({
                ...prevState,
                [name]: value,
                page: 1
            }));
        }
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSearch = (e) => {
        const { name, value } = e.target;
        setTimeOutForSearch((prevState) => {
            dispatch({
                type: USER_LOADING,
                payload: true
            });
            if (prevState.timeoutFunc) {
                clearTimeout(timeOutForSearch.timeoutFunc);
            }
            const newTimeoutFunc = setTimeout(() => {
                setState((prevState) => ({
                    ...prevState,
                    search: value,
                    page: 1
                }));
            }, 2000);
            return {
                ...prevState,
                [name]: value,
                timeoutFunc: newTimeoutFunc
            };
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangePage = (event, newPage) => {
        setState((prevState) => ({ ...prevState, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        setState((prevState) => ({
            ...prevState,
            take: parseInt(event.target.value),
            page: 1
        }));
    };

    const handleCreateAndUpdate = () => {
        const { email, role } = state;
        //Sort role
        role.sort(function (a, b) {
            return a - b;
        });
        //create
        if (state.isCreateMode) {
            const userReq = {
                email,
                role
            };

            dispatch(createUser(userReq));
            return;
        }
        //edit
        dispatch(
            updateUser(
                {
                    filter: selected[0],
                    update: { email, role }
                },
                user.email,
                history
            )
        );
    };

    const handleDelete = () => {
        dispatch(
            deleteUsers(
                {
                    deleteList: selected
                },
                user.email,
                history
            )
        );
    };

    const handleToggleDialogCreateAndUpdate = (event, mode) => {
        let targetEdit;
        if (mode) {
            targetEdit = users.find((user) => user.email === selected[0]);
        }
        setState((prevState) => ({
            ...prevState,
            email: mode ? targetEdit.email : '',
            role: mode ? targetEdit.role : [],
            openCreateAndUpdateDialog: !prevState.openCreateAndUpdateDialog,
            isCreateMode: mode ? false : true
        }));
    };

    const handleToggleDialogDelete = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteDialog: !prevState.openDeleteDialog
        }));
    };

    //handle ToggleFilter
    const handleToggleFilter = () => {
        setState((prevState) => ({
            ...prevState,
            openFilter: !prevState.openFilter
        }));
    };

    //handle Apply Filter
    const handleApplyFilter = () => {
        setState((prevState) => ({
            ...prevState,
            ...filters,
            openFilter: !prevState.openFilter
        }));
    };

    //handle Clear Filter
    const handleClearFilter = () => {
        setFilters((prevState) => ({
            ...prevState,
            ...filterState
        }));
        setState((prevState) => ({
            ...prevState,
            ...filterState,
            openFilter: !prevState.openFilter
        }));
    };

    return (
        <div className={css.grow}>
            <Paper className={css.paper} color="inherit">
                <div className={css.grow}>
                    <AppBar position="static" color="default">
                        <Grid container direction="column">
                            <Toolbar>
                                <div className={css.search}>
                                    <div className={css.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        onChange={handleChangeSearch}
                                        className={css.inputInput}
                                        placeholder="Search by email"
                                        name="key"
                                        value={timeOutForSearch.key}
                                        inputProps={{
                                            'aria-label': 'search'
                                        }}
                                    />
                                </div>
                                <div className={css.grow} />
                                <Tooltip title="Filter">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleToggleFilter}>
                                        <FilterList />
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                            {/* User Table */}
                            <UserTable
                                handleToggleDialogCreateAndUpdate={
                                    handleToggleDialogCreateAndUpdate
                                }
                                handleToggleDialogDelete={
                                    handleToggleDialogDelete
                                }
                                take={state.take}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            {/* User Pagination */}
                            <UserPagination
                                page={state.page}
                                take={state.take}
                                handleChangeRowsPerPage={
                                    handleChangeRowsPerPage
                                }
                                handleChangePage={handleChangePage}
                            />
                        </Grid>
                    </AppBar>
                </div>
            </Paper>

            {/* User Dialog */}
            <UserDialog
                openCreateAndUpdateDialog={state.openCreateAndUpdateDialog}
                handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdate
                }
                isCreateMode={state.isCreateMode}
                openAlert={state.openAlert}
                handleChange={handleChange}
                email={state.email}
                role={state.role}
                openDeleteDialog={state.openDeleteDialog}
                handleCreateAndUpdate={handleCreateAndUpdate}
                handleToggleDialogDelete={handleToggleDialogDelete}
                handleDelete={handleDelete}
            />
            {/* Notification */}
            <UserNotification
                openDeleteSnackBar={state.openDeleteSnackBar}
                openCreateSnackBar={state.openCreateSnackBar}
                openUpdateSnackBar={state.openUpdateSnackBar}
            />

            {/* Filter Sidebar */}
            <UserFilter
                openFilter={state.openFilter}
                handleToggleFilter={handleToggleFilter}
                rolesFilter={filters.rolesFilter}
                handleFilterChange={handleFilterChange}
                createdFrom={filters.createdFrom}
                createdTo={filters.createdTo}
                setFilters={setFilters}
                updatedFrom={filters.updatedFrom}
                updatedTo={filters.updatedTo}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter}
            />
        </div>
    );
};

export default User;

import React, { useEffect, useState } from 'react';
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
    getEventTypes,
    createEventType,
    deleteEventTypes,
    updateEventType,
    recoveryEventTypes,
    deletePermanentEventTypes
} from '../../actions/eventTypeActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR, EVENT_TYPE_LOADING } from '../../constants';
import DataTable from '../MainTable/DataTable/DataTable';
import EventFilter from './EventFilter/EventFilter';
import EventDialog from './EventDialog/EventDialog';
import PaginationTable from '../MainTable/PaginationTable/PaginationTable';
import SystemNotification from '../Notification/Notification';

const initialState = {
    search: '',
    take: 5,
    page: 1,
    openCreateAndUpdateDialog: false,
    name: '',
    openAlert: false,
    openDeleteDialog: false,
    openDeleteSnackBar: false,
    openUpdateSnackBar: false,
    openCreateSnackBar: false,
    openRecoverySnackBar: false,
    isCreateMode: true,
    openFilter: false,
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null
};

const filterState = {
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null
};

const headCells = [
    {
        id: 'name',
        type: 'string',
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'createdAt',
        type: 'date',
        disablePadding: false,
        label: 'Created At'
    },
    {
        id: 'updatedAt',
        type: 'date',
        disablePadding: false,
        label: 'Updated At'
    }
];

const EventType = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const {
        eventTypes,
        createSuccess,
        deleteSuccess,
        updateSuccess,
        isLoading,
        totalPages,
        errors,
        recoverySuccess
    } = useSelector((state) => ({
        eventTypes: state.eventType.eventTypes,
        isLoading: state.eventType.isLoading,
        totalPages: state.eventType.totalPages,
        errors: state.error.errors,
        createSuccess: state.eventType.createSuccess,
        deleteSuccess: state.eventType.deleteSuccess,
        updateSuccess: state.eventType.updateSuccess,
        recoverySuccess: state.eventType.recoverySuccess
    }));

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);
    const [selected, setSelected] = useState([]);
    const [timeOutForSearch, setTimeOutForSearch] = useState({
        key: '',
        timeoutFunc: null
    });

    //userEffect to toggle notification for recovery success
    useEffect(() => {
        if (recoverySuccess) {
            dispatch(
                getEventTypes({
                    search: state.search,
                    take: state.take,
                    page: state.page,
                    createdFrom: state.createdFrom,
                    createdTo: state.createdTo,
                    updatedFrom: state.updatedFrom,
                    updatedTo: state.updatedTo,
                    isDeleted: isRecoveryMode
                })
            );
            //clear selected item
            setSelected(() => []);
        }
        setState((prevState) => ({
            ...prevState,
            openRecoverySnackBar: recoverySuccess
        }));
    }, [
        dispatch,
        recoverySuccess,
        state.search,
        state.take,
        state.page,
        state.statusFilter,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        isRecoveryMode
    ]);

    //useEffect to toggle notification for create success
    useEffect(() => {
        let defaultAction = {
            openCreateAndUpdateDialog: createSuccess,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
            openCreateSnackBar: createSuccess
        };
        if (createSuccess) {
            dispatch(
                getEventTypes({
                    search: state.search,
                    take: state.take,
                    page: state.page,
                    createdFrom: state.createdFrom,
                    createdTo: state.createdTo,
                    updatedFrom: state.updatedFrom,
                    updatedTo: state.updatedTo,
                    isDeleted: isRecoveryMode
                })
            );
            defaultAction = {
                ...defaultAction,
                openCreateAndUpdateDialog: false
            };
        }
        setState((prevState) => ({
            ...prevState,
            ...defaultAction
        }));
        //clear selected item
        setSelected(() => []);
    }, [
        dispatch,
        createSuccess,
        state.search,
        state.take,
        state.page,
        state.statusFilter,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        isRecoveryMode
    ]);
    //useEffect to toggle notification for update success
    useEffect(() => {
        let defaultAction = {
            openCreateAndUpdateDialog: updateSuccess,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
            openUpdateSnackBar: updateSuccess
        };
        if (updateSuccess) {
            dispatch(
                getEventTypes({
                    search: state.search,
                    take: state.take,
                    page: state.page,
                    createdFrom: state.createdFrom,
                    createdTo: state.createdTo,
                    updatedFrom: state.updatedFrom,
                    updatedTo: state.updatedTo,
                    isDeleted: isRecoveryMode
                })
            );
            defaultAction = {
                ...defaultAction,
                openCreateAndUpdateDialog: false
            };
        }
        setState((prevState) => ({
            ...prevState,
            ...defaultAction
        }));
        //clear selected item
        setSelected(() => []);
    }, [
        dispatch,
        updateSuccess,
        state.search,
        state.take,
        state.page,
        state.statusFilter,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        isRecoveryMode
    ]);
    //useEffect to toggle notification for delete success
    useEffect(() => {
        let defaultAction = {
            openDeleteDialog: deleteSuccess,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
            openDeleteSnackBar: deleteSuccess
        };
        if (deleteSuccess) {
            dispatch(
                getEventTypes({
                    search: state.search,
                    take: state.take,
                    page: state.page,
                    createdFrom: state.createdFrom,
                    createdTo: state.createdTo,
                    updatedFrom: state.updatedFrom,
                    updatedTo: state.updatedTo,
                    isDeleted: isRecoveryMode
                })
            );
            defaultAction = { ...defaultAction, openDeleteDialog: false };
        }
        setState((prevState) => ({
            ...prevState,
            ...defaultAction
        }));
        //clear selected item
        setSelected(() => []);
    }, [
        dispatch,
        deleteSuccess,
        state.search,
        state.take,
        state.page,
        state.statusFilter,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        isRecoveryMode
    ]);

    //useEffect
    useEffect(() => {
        //clear selected item
        setSelected(() => []);
        dispatch(
            getEventTypes({
                search: state.search,
                take: state.take,
                page: state.page,
                createdFrom: state.createdFrom,
                createdTo: state.createdTo,
                updatedFrom: state.updatedFrom,
                updatedTo: state.updatedTo,
                isDeleted: isRecoveryMode
            })
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
        state.statusFilter,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        isRecoveryMode
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
                type: EVENT_TYPE_LOADING,
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
        const { name } = state;
        //create
        if (state.isCreateMode) {
            const userReq = {
                name
            };
            dispatch(createEventType(userReq));
            return;
        }
        //edit
        dispatch(
            updateEventType({
                filter: selected[0],
                update: { name }
            })
        );
    };

    const handleDelete = () => {
        if (isRecoveryMode) {
            dispatch(
                deletePermanentEventTypes({
                    deleteList: selected
                })
            );
        } else {
            dispatch(
                deleteEventTypes({
                    deleteList: selected
                })
            );
        }
    };

    const handleToggleDialogCreateAndUpdate = (event, mode) => {
        let targetEdit;
        if (mode) {
            targetEdit = eventTypes.find(
                (facility) => facility.name === selected[0]
            );
        }
        setState((prevState) => ({
            ...prevState,
            name: mode ? targetEdit.name : '',
            openCreateAndUpdateDialog: !prevState.openCreateAndUpdateDialog,
            isCreateMode: mode ? false : true
        }));
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
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

    const handleRecovery = () => {
        dispatch(
            recoveryEventTypes({
                recoveryList: selected
            })
        );
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
                                        placeholder="Search by name"
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
                            {/* Facility Table */}
                            <DataTable
                                selectedName="name"
                                isRecoveryMode={isRecoveryMode}
                                setIsRecoveryMode={setIsRecoveryMode}
                                handleRecovery={handleRecovery}
                                recoveryMode={true}
                                handleToggleDialogCreateAndUpdate={
                                    handleToggleDialogCreateAndUpdate
                                }
                                handleToggleDialogDelete={
                                    handleToggleDialogDelete
                                }
                                take={state.take}
                                selected={selected}
                                setSelected={setSelected}
                                data={eventTypes}
                                isLoading={isLoading}
                                createSuccess={createSuccess}
                                deleteSuccess={deleteSuccess}
                                updateSuccess={updateSuccess}
                                tableName="List of Event Types"
                                headCells={headCells}
                            />
                            {/* Facility Pagination */}
                            <PaginationTable
                                isLoading={isLoading}
                                page={state.page}
                                take={state.take}
                                handleChangeRowsPerPage={
                                    handleChangeRowsPerPage
                                }
                                handleChangePage={handleChangePage}
                                totalPages={totalPages}
                            />
                        </Grid>
                    </AppBar>
                </div>
            </Paper>

            {/* Facility Dialog */}
            <EventDialog
                openCreateAndUpdateDialog={state.openCreateAndUpdateDialog}
                handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdate
                }
                isCreateMode={state.isCreateMode}
                handleChange={handleChange}
                name={state.name}
                openDeleteDialog={state.openDeleteDialog}
                handleCreateAndUpdate={handleCreateAndUpdate}
                handleToggleDialogDelete={handleToggleDialogDelete}
                handleDelete={handleDelete}
                isLoading={isLoading}
                errors={errors}
                createSuccess={createSuccess}
                isRecoveryMode={isRecoveryMode}
            />
            {/* Notification */}
            <SystemNotification
                openDeleteSnackBar={state.openDeleteSnackBar}
                openCreateSnackBar={state.openCreateSnackBar}
                openUpdateSnackBar={state.openUpdateSnackBar}
            />

            {/* Filter Sidebar */}
            <EventFilter
                openFilter={state.openFilter}
                handleToggleFilter={handleToggleFilter}
                handleFilterChange={handleFilterChange}
                createdFrom={filters.createdFrom}
                createdTo={filters.createdTo}
                updatedFrom={filters.updatedFrom}
                updatedTo={filters.updatedTo}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter}
                setFilters={setFilters}
            />
        </div>
    );
};

export default EventType;

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
    Paper,
    AppBar,
    Toolbar,
    InputBase,
    IconButton,
    Grid,
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import {
    getEventTypes,
    createEventType,
    deleteEventTypes,
    updateEventType,
} from '../../actions/eventTypeActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR } from '../../constants';
import DataTable from '../DataTable/DataTable';
import EventFilter from './EventFilter/EventFilter';
import Notification from '../Notification/Notification';
import EventDialog from './EventDialog/EventDialog';
import PaginationTable from '../PaginationTable/PaginationTable';

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
    isCreateMode: true,
    openFilter: false,
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
};

const filterState = {
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
};

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
    } = useSelector((state) => ({
        eventTypes: state.eventType.eventTypes,
        isLoading: state.eventType.isLoading,
        totalPages: state.eventType.totalPages,
        errors: state.error.errors,
        createSuccess: state.eventType.createSuccess,
        deleteSuccess: state.eventType.deleteSuccess,
        updateSuccess: state.eventType.updateSuccess,
    }));

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);

    const [selected, setSelected] = useState([]);

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
                : '',
        };
        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: updateSuccess,
            openCreateAndUpdateDialog: false,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
            openAlert: createSuccess,
            openDeleteSnackBar: deleteSuccess,
            openCreateSnackBar: createSuccess,
            openDeleteDialog: false,
        }));
        //clear selected item
        setSelected(() => []);

        dispatch(
            getEventTypes(
                state.search,
                state.take,
                state.page,
                filterDate.createdFrom,
                filterDate.createdTo,
                filterDate.updatedFrom,
                filterDate.updatedTo
            )
        );
        return () => {
            dispatch({
                type: ERROR_CLEAR,
                payload: null,
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
        updateSuccess,
        createSuccess,
        deleteSuccess,
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'search' || name === 'take') {
            return setState((prevState) => ({
                ...prevState,
                [name]: value,
                page: 1,
            }));
        }
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangePage = (event, newPage) => {
        setState((prevState) => ({ ...prevState, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        setState((prevState) => ({
            ...prevState,
            take: parseInt(event.target.value),
            page: 1,
        }));
    };

    const handleCreateAndUpdate = () => {
        const { name } = state;
        //create
        if (state.isCreateMode) {
            const userReq = {
                name,
            };
            dispatch(createEventType(userReq));
            return;
        }
        //edit
        dispatch(
            updateEventType({
                filter: selected[0],
                update: { name },
            })
        );
    };

    const handleDelete = () => {
        dispatch(
            deleteEventTypes({
                deleteList: selected,
            })
        );
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
            isCreateMode: mode ? false : true,
        }));
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });
    };

    const handleToggleDialogDelete = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteDialog: !prevState.openDeleteDialog,
        }));
    };

    //handle ToggleFilter
    const handleToggleFilter = () => {
        setState((prevState) => ({
            ...prevState,
            openFilter: !prevState.openFilter,
        }));
    };

    //handle Apply Filter
    const handleApplyFilter = () => {
        setState((prevState) => ({
            ...prevState,
            ...filters,
            openFilter: !prevState.openFilter,
        }));
    };

    //handle Clear Filter
    const handleClearFilter = () => {
        setFilters((prevState) => ({
            ...prevState,
            ...filterState,
        }));
        setState((prevState) => ({
            ...prevState,
            ...filterState,
            openFilter: !prevState.openFilter,
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
                                        onChange={handleChange}
                                        className={css.inputInput}
                                        placeholder="Search by name, code, type"
                                        name="search"
                                        value={state.search}
                                        inputProps={{
                                            'aria-label': 'search',
                                        }}
                                    />
                                </div>
                                <div className={css.grow} />
                                <IconButton
                                    color="inherit"
                                    onClick={handleToggleFilter}
                                >
                                    <FilterList />
                                </IconButton>
                            </Toolbar>
                            {/* Facility Table */}
                            <DataTable
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
                                tableName="Event Type List"
                                headCells={[
                                    {
                                        id: 'name',
                                        numeric: false,
                                        disablePadding: false,
                                        label: 'Name',
                                    },
                                    {
                                        id: 'createdAt',
                                        numeric: false,
                                        disablePadding: false,
                                        label: 'Created At',
                                    },
                                    {
                                        id: 'updatedAt',
                                        numeric: false,
                                        disablePadding: false,
                                        label: 'Updated At',
                                    },
                                ]}
                            />
                            {/* Facility Pagination */}
                            <PaginationTable
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
            />
            {/* Notification */}
            <Notification
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

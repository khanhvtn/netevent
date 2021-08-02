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
    getFacilities,
    createFacility,
    deleteFacilities,
    updateFacility,
    recoveryFacilities,
    deletePermanentFacilities
} from '../../actions/facilityActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR, FACILITY_LOADING } from '../../constants';
import FacilityFilter from './FacilityFilter/FacilityFilter';
import FacilityDialog from './FacilityDialog/FacilityDialog';
import PaginationTable from '../MainTable/PaginationTable/PaginationTable';
import DataTable from '../MainTable/DataTable/DataTable';
import SystemNotification from '../Notification/Notification';

const headCells = [
    {
        id: 'name',
        type: 'string',
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'code',
        type: 'string',
        disablePadding: false,
        label: 'Code'
    },
    {
        id: 'type',
        type: 'string',
        disablePadding: false,
        label: 'Type'
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

const initialState = {
    search: '',
    take: 10,
    page: 1,
    openCreateAndUpdateDialog: false,
    name: '',
    code: '',
    type: '',
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

const Facility = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const {
        facilities,
        createSuccess,
        deleteSuccess,
        updateSuccess,
        totalPages,
        isLoading,
        recoverySuccess
    } = useSelector((state) => ({
        facilities: state.facility.facilities,
        isLoading: state.facility.isLoading,
        totalPages: state.facility.totalPages,
        errors: state.error.errors,
        createSuccess: state.facility.createSuccess,
        deleteSuccess: state.facility.deleteSuccess,
        updateSuccess: state.facility.updateSuccess,
        recoverySuccess: state.facility.recoverySuccess
    }));

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);
    const [selected, setSelected] = useState([]);
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);

    /* state for searching */
    const [timeOutForSearch, setTimeOutForSearch] = useState({
        key: '',
        timeoutFunc: null
    });

    //userEffect to toggle notification for recovery success
    useEffect(() => {
        if (recoverySuccess) {
            dispatch(
                getFacilities({
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
                getFacilities({
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
                getFacilities({
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
                getFacilities({
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
                openDeleteDialog: false
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
        deleteSuccess,
        state.search,
        state.take,
        state.page,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        isRecoveryMode
    ]);

    //useEffect
    useEffect(() => {
        dispatch(
            getFacilities({
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
                type: FACILITY_LOADING,
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
        const { name, code, type } = state;
        //create
        if (state.isCreateMode) {
            const userReq = {
                name,
                code,
                type
            };
            dispatch(createFacility(userReq));
            return;
        }
        //edit
        dispatch(
            updateFacility({
                filter: selected[0],
                update: { name, code, type }
            })
        );
    };

    const handleDelete = () => {
        if (isRecoveryMode) {
            dispatch(
                deletePermanentFacilities({
                    deleteList: selected
                })
            );
        } else {
            dispatch(
                deleteFacilities({
                    deleteList: selected
                })
            );
        }
    };
    const handleRecovery = () => {
        dispatch(
            recoveryFacilities({
                recoveryList: selected
            })
        );
    };

    const handleToggleDialogCreateAndUpdate = (event, mode) => {
        let targetEdit;
        if (mode) {
            targetEdit = facilities.find(
                (facility) => facility.name === selected[0]
            );
        }
        setState((prevState) => ({
            ...prevState,
            name: mode ? targetEdit.name : '',
            code: mode ? targetEdit.code : '',
            type: mode ? targetEdit.type : '',
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
                                        placeholder="Search by name, code, type"
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
                                data={facilities}
                                isLoading={isLoading}
                                createSuccess={createSuccess}
                                deleteSuccess={deleteSuccess}
                                updateSuccess={updateSuccess}
                                tableName="List of Facilities"
                                headCells={headCells}
                                page={state.page}
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
            <FacilityDialog
                isRecoveryMode={isRecoveryMode}
                openCreateAndUpdateDialog={state.openCreateAndUpdateDialog}
                handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdate
                }
                isCreateMode={state.isCreateMode}
                openAlert={state.openAlert}
                handleChange={handleChange}
                name={state.name}
                code={state.code}
                type={state.type}
                openDeleteDialog={state.openDeleteDialog}
                handleCreateAndUpdate={handleCreateAndUpdate}
                handleToggleDialogDelete={handleToggleDialogDelete}
                handleDelete={handleDelete}
            />
            {/* Notification */}
            <SystemNotification
                openDeleteSnackBar={state.openDeleteSnackBar}
                openCreateSnackBar={state.openCreateSnackBar}
                openUpdateSnackBar={state.openUpdateSnackBar}
                openRecoverySnackBar={state.openRecoverySnackBar}
            />

            {/* Filter Sidebar */}
            <FacilityFilter
                openFilter={state.openFilter}
                handleToggleFilter={handleToggleFilter}
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

export default Facility;

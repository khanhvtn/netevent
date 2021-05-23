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
    getFacilities,
    createFacility,
    deleteFacilities,
    updateFacility,
} from '../../actions/facilityActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR } from '../../constants';
import FacilityTable from './FacilityTable/FacilityTable';
import FacilityFilter from './FacilityFilter/FacilityFilter';
import FacilityNotification from './FacilityNotification/FacilityNotification';
import FacilityDialog from './FacilityDialog/FacilityDialog';
import FacilityPagination from './FacilityPagination/FacilityPagination';

const initialState = {
    search: '',
    take: 5,
    page: 1,
    openCreateAndUpdateDialog: false,
    name: '',
    code: '',
    type: '',
    status: '',
    openAlert: false,
    openDeleteDialog: false,
    openDeleteSnackBar: false,
    openUpdateSnackBar: false,
    openCreateSnackBar: false,
    isCreateMode: true,
    openFilter: false,
    statusFilter: '',
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
};

const filterState = {
    statusFilter: '',
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
};

const Facility = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const {
        facilities,
        createSuccess,
        deleteSuccess,
        updateSuccess,
    } = useSelector((state) => ({
        facilities: state.facility.facilities,
        isLoading: state.facility.isLoading,
        totalPages: state.facility.totalPages,
        errors: state.error.errors,
        createSuccess: state.facility.createSuccess,
        deleteSuccess: state.facility.deleteSuccess,
        updateSuccess: state.facility.updateSuccess,
    }));

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);

    const [selected, setSelected] = useState([]);

    //useEffect to toggle notification for create success
    useEffect(() => {
        let defaultAction = {
            openCreateAndUpdateDialog: createSuccess,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
            openCreateSnackBar: createSuccess,
        };
        if (createSuccess) {
            dispatch(getFacilities());
            defaultAction = {
                ...defaultAction,
                openCreateAndUpdateDialog: false,
            };
        }
        setState((prevState) => ({
            ...prevState,
            ...defaultAction,
        }));
        //clear selected item
        setSelected(() => []);
    }, [dispatch, createSuccess]);
    //useEffect to toggle notification for update success
    useEffect(() => {
        let defaultAction = {
            openCreateAndUpdateDialog: updateSuccess,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
            openUpdateSnackBar: updateSuccess,
        };
        if (updateSuccess) {
            dispatch(getFacilities());
            defaultAction = {
                ...defaultAction,
                openCreateAndUpdateDialog: false,
            };
        }
        setState((prevState) => ({
            ...prevState,
            ...defaultAction,
        }));
        //clear selected item
        setSelected(() => []);
    }, [dispatch, updateSuccess]);
    //useEffect to toggle notification for delete success
    useEffect(() => {
        let defaultAction = {
            openDeleteDialog: deleteSuccess,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
            openDeleteSnackBar: deleteSuccess,
        };
        if (deleteSuccess) {
            dispatch(getFacilities());
            defaultAction = {
                ...defaultAction,
                openDeleteDialog: false,
            };
        }
        setState((prevState) => ({
            ...prevState,
            ...defaultAction,
        }));
        //clear selected item
        setSelected(() => []);
    }, [dispatch, deleteSuccess]);

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

        dispatch(
            getFacilities(
                state.search,
                state.take,
                state.page,
                state.statusFilter,
                filterDate.createdFrom,
                filterDate.createdTo,
                filterDate.updatedFrom,
                filterDate.updatedTo
            )
        );
        //clear selected item
        setSelected(() => []);
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
        const { name, code, type, status } = state;
        //create
        if (state.isCreateMode) {
            const userReq = {
                name,
                code,
                type,
            };
            dispatch(createFacility(userReq));
            return;
        }
        //edit
        dispatch(
            updateFacility({
                filter: selected[0],
                update: { name, code, type, status },
            })
        );
    };

    const handleDelete = () => {
        dispatch(
            deleteFacilities({
                deleteList: selected,
            })
        );
    };

    const handleToggleDialogCreateAndUpdate = (event, mode) => {
        let targetEdit;
        if (mode) {
            targetEdit = facilities.find(
                (facility) => facility.name === selected[0]
            );
            setState((prevState) => ({
                ...prevState,
                name: mode ? targetEdit.name : prevState.name,
                code: mode ? targetEdit.code : prevState.code,
                type: mode ? targetEdit.type : prevState.type,
                status: mode ? targetEdit.status : prevState.status,
                isCreateMode: mode ? false : true,
            }));
        }
        setState((prevState) => ({
            ...prevState,
            name: mode ? targetEdit.name : prevState.name,
            code: mode ? targetEdit.code : prevState.code,
            type: mode ? targetEdit.type : prevState.type,
            status: mode ? targetEdit.status : prevState.status,
            openCreateAndUpdateDialog: !prevState.openCreateAndUpdateDialog,
            isCreateMode: mode ? false : true,
        }));
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
                            <FacilityTable
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
                            {/* Facility Pagination */}
                            <FacilityPagination
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

            {/* Facility Dialog */}
            <FacilityDialog
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
                status={state.status}
                openDeleteDialog={state.openDeleteDialog}
                handleCreateAndUpdate={handleCreateAndUpdate}
                handleToggleDialogDelete={handleToggleDialogDelete}
                handleDelete={handleDelete}
            />
            {/* Notification */}
            <FacilityNotification
                openDeleteSnackBar={state.openDeleteSnackBar}
                openCreateSnackBar={state.openCreateSnackBar}
                openUpdateSnackBar={state.openUpdateSnackBar}
            />

            {/* Filter Sidebar */}
            <FacilityFilter
                openFilter={state.openFilter}
                handleToggleFilter={handleToggleFilter}
                statusFilter={filters.statusFilter}
                handleFilterChange={handleFilterChange}
                createdFrom={filters.createdFrom}
                createdTo={filters.createdTo}
                updatedFrom={filters.updatedFrom}
                updatedTo={filters.updatedTo}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter}
            />
        </div>
    );
};

export default Facility;

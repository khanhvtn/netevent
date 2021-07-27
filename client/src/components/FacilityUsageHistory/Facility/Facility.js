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
    recoveryFacilities
} from '../../../actions/facilityActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR, FACILITY_LOADING } from '../../../constants';
import FacilityFilter from './FacilityFilter/FacilityFilter';
import PaginationTable from '../MainTable/PaginationTable/PaginationTable';
import DataTable from '../MainTable/DataTable/DataTable';

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

        totalPages,
        isLoading
    } = useSelector((state) => ({
        facilities: state.facility.facilities,
        isLoading: state.facility.isLoading,
        totalPages: state.facility.totalPages
    }));

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);
    const [selected, setSelected] = useState([]);
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);
    const [timeOutForSearch, setTimeOutForSearch] = useState({
        key: '',
        timeoutFunc: null
    });

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

    const handleRecovery = () => {
        dispatch(
            recoveryFacilities({
                recoveryList: selected
            })
        );
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
                                isRecoveryMode={isRecoveryMode}
                                setIsRecoveryMode={setIsRecoveryMode}
                                handleRecovery={handleRecovery}
                                recoveryMode={true}
                                take={state.take}
                                data={facilities}
                                isLoading={isLoading}
                                tableName="List of Facilities"
                                headCells={headCells}
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

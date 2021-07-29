import React, { useEffect, useState } from 'react';
import useStyles from './styles';
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getFacilityHistories } from '../../actions/facilityHistoryActions';
import { getFacility } from '../../actions/facilityActions';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR_CLEAR, FACILITY_HISTORY_LOADING } from '../../constants';
import FacilityHistoryFilter from './FacilityHistoryFilter/FacilityHistoryFilter';
import FacilityHistoryPagination from './FacilityHistoryPagination/FacilityHistoryPagination';
import FacilityHistoryTable from './FacilityHistoryTable/FacilityHistoryTable';
import { useHistory, useParams } from 'react-router-dom';
const headCells = [
    {
        id: 'eventName',
        numeric: false,
        disablePadding: false,
        label: 'Event Name'
    },

    {
        id: 'borrowDate',
        numeric: false,
        disablePadding: false,
        label: 'Borrowed Date'
    },
    {
        id: 'returnDate',
        numeric: false,
        disablePadding: false,
        label: 'Returned Date'
    }
];

const filterState = {
    borrowFrom: null,
    borrowTo: null,
    returnFrom: null,
    returnTo: null
};

const initialState = {
    search: '',
    take: 10,
    page: 1,
    openCreateAndUpdateDialog: false,
    name: '',
    code: '',
    type: '',
    openAlert: false,
    openFilter: false,
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
    borrowFrom: null,
    borrowTo: null,
    returnFrom: null,
    returnTo: null
};

const FacilityUsageHistory = () => {
    const css = useStyles();
    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    /* state for searching */
    const [timeOutForSearch, setTimeOutForSearch] = useState({
        key: '',
        timeoutFunc: null
    });

    const {
        facilityHistories,
        totalPages,
        isLoading,
        facilityEach,
        facilityLoading
    } = useSelector((state) => ({
        facilityHistories: state.facilityHistory.facilityHistories,
        isLoading: state.facilityHistory.isLoading,
        totalPages: state.facilityHistory.totalPages,
        facilityEach: state.facility.facilityEach,
        facilityLoading: state.facility.isLoading
    }));

    //useEffect
    useEffect(() => {
        if (!history.location.state?.from) {
            history.push({
                state: { from: '/dashboard/reviewer/facility-usage' }
            });
        }

        dispatch(
            getFacilityHistories({
                id: id,
                search: state.search,
                take: state.take,
                page: state.page,
                createdFrom: state.createdFrom,
                createdTo: state.createdTo,
                updatedFrom: state.updatedFrom,
                updatedTo: state.updatedTo,
                borrowFrom: state.borrowFrom,
                borrowTo: state.borrowTo,
                returnFrom: state.returnFrom,
                returnTo: state.returnTo
            })
        );
        //clear selected item
        return () => {
            dispatch({
                type: ERROR_CLEAR,
                payload: null
            });
        };
    }, [
        id,
        dispatch,
        state.search,
        state.take,
        state.page,
        state.createdFrom,
        state.createdTo,
        state.updatedFrom,
        state.updatedTo,
        state.borrowFrom,
        state.borrowTo,
        state.returnFrom,
        state.returnTo,
        history
    ]);

    //Get Selected Facility
    useEffect(() => {
        dispatch(getFacility(id));
    }, [id, dispatch]);

    const handleChangeSearch = (e) => {
        const { name, value } = e.target;
        setTimeOutForSearch((prevState) => {
            dispatch({
                type: FACILITY_HISTORY_LOADING,
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

    const handleOnClickReturn = () => {
        setState(initialState);
        return history.push({
            pathname: `/dashboard/reviewer/facility-usage`,
            page: history.location.state?.page
        });
    };

    return (
        <div className={css.grow}>
            <Paper className={css.paper} color="inherit">
                <div className={css.grow}>
                    <AppBar position="static" color="default">
                        <Grid container direction="column">
                            <Toolbar>
                                <IconButton onClick={handleOnClickReturn}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <div className={css.search}>
                                    <div className={css.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        onChange={handleChangeSearch}
                                        className={css.inputInput}
                                        placeholder="Search by event name"
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
                            <FacilityHistoryTable
                                selectedFacility={facilityEach}
                                take={state.take}
                                facilityLoading={facilityLoading}
                                data={facilityHistories}
                                isLoading={isLoading}
                                tableName="List of Facility Usage History"
                                headCells={headCells}
                            />
                            {/* Facility Pagination */}
                            <FacilityHistoryPagination
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

            <FacilityHistoryFilter
                openFilter={state.openFilter}
                handleToggleFilter={handleToggleFilter}
                handleFilterChange={handleFilterChange}
                borrowFrom={filters.borrowFrom}
                returnFrom={filters.returnFrom}
                setFilters={setFilters}
                borrowTo={filters.borrowTo}
                returnTo={filters.borrowTo}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter}
            />
        </div>
    );
};

export default FacilityUsageHistory;

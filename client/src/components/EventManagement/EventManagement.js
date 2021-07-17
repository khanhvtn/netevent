import React, { useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    AppBar,
    Grid,
    Toolbar,
    InputBase,
    Tooltip,
    IconButton,
    Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { FilterList, Delete, Close } from '@material-ui/icons';
import EventPagination from './EventPagination/EventPagination';
import EventCard from './EventCard/EventCard';
import EventFilter from './EventFilter/EventFilter';
import { useHistory } from 'react-router-dom';
import { getEvents } from '../../actions/eventActions';
import { getAllEventTypes } from '../../actions/eventTypeActions';
import SystemNotification from '../Notification/Notification';

const initialState = {
    search: '',
    take: 3,
    page: 1,
    openFilter: false,
    type: '',
    status: '',
    budgetRange: null,
    participantRange: null,
    startFrom: null,
    startTo: null,
    endFrom: null,
    endTo: null,
    openDeleteSnackBar: false,
    isRecycleMode: false
};

const filterState = {
    type: '',
    status: '',
    budgetRange: null,
    participantRange: null,
    startFrom: null,
    startTo: null,
    endFrom: null,
    endTo: null
};

const EventManagement = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        events,
        isLoading,
        totalPages,
        deleteEventSuccess,
        userId,
        eventTypes
    } = useSelector((state) => ({
        events: state.event.events,
        isLoading: state.event.isLoading,
        totalPages: state.event.totalPages,
        deleteEventSuccess: state.event.deleteSuccess,
        userId: state.user.user.id,
        eventTypes: state.eventType?.eventTypes
    }));

    /* Change isRecycleMode if use turn back from event detail */
    const [state, setState] = useState({
        ...initialState,
        isRecycleMode: history.location.state?.isRecycleMode
            ? history.location.state?.isRecycleMode
            : false
    });
    const [filters, setFilters] = useState(filterState);

    // Request to get the events data
    useEffect(() => {
        if (
            !history.location.state?.from ||
            history.location.state?.isUpdated
        ) {
            dispatch(
                getEvents({
                    search: state.search,
                    take: state.take,
                    page: state.page,
                    type: state.type,
                    budgetRange: state.budgetRange,
                    participantRange: state.participantRange,
                    startFrom: state.startFrom,
                    startTo: state.startTo,
                    endFrom: state.endFrom,
                    endTo: state.endTo,
                    ownerId: userId,
                    isDeleted: state.isRecycleMode
                })
            );
        }
        history.replace();
    }, [
        dispatch,
        history,
        state.search,
        state.take,
        state.page,
        state.type,
        state.budgetRange,
        state.participantRange,
        state.startFrom,
        state.startTo,
        state.endFrom,
        state.endTo,
        state.isRecycleMode,
        userId
    ]);

    // Request all event type in the first access
    useEffect(() => {
        if (!eventTypes) {
            dispatch(getAllEventTypes());
        }
    }, [dispatch, eventTypes]);

    // UseEffect for delete event success
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            openDeleteSnackBar: deleteEventSuccess
        }));
    }, [deleteEventSuccess]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'search' || name === 'take') {
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

    //handle Filter Change
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
            page: 1,
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

    // Push to the event-detail page with event props
    const handleOnClickEvent = (event) => {
        history.push({
            pathname: `/dashboard/creator/event-detail/${event.urlCode}`,
            state: {
                from: '/dashboard/creator/event-management',
                isRecycleMode: state.isRecycleMode
            }
        });
    };

    //toggle recycle mode
    const handleToggleRecycleMode = () => {
        setState((prevState) => {
            if (!prevState.isRecycleMode) {
                localStorage.setItem(
                    'stateHistory',
                    JSON.stringify({
                        isRecycleMode: !state.isRecycleMode
                    })
                );
            } else {
                localStorage.removeItem('stateHistory');
            }
            return {
                ...prevState,
                isRecycleMode: !prevState.isRecycleMode
            };
        });
    };

    return (
        <>
            <Paper className={css.paper} color="inherit" elevation={3}>
                {/* Event search */}
                <div className={css.grow}>
                    <AppBar position="static" color="default" elevation={0}>
                        <Grid container direction="column">
                            <Toolbar>
                                <div className={css.search}>
                                    <div className={css.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        onChange={handleChange}
                                        className={css.inputInput}
                                        placeholder="Search by event name"
                                        name="search"
                                        value={state.search}
                                        inputProps={{
                                            'aria-label': 'search'
                                        }}
                                    />
                                </div>
                                <div className={css.grow} />
                                <Button
                                    style={{ textTransform: 'none' }}
                                    disabled={isLoading}
                                    onClick={handleToggleRecycleMode}
                                    variant="contained"
                                    color={
                                        state.isRecycleMode
                                            ? 'default'
                                            : 'secondary'
                                    }
                                    endIcon={
                                        state.isRecycleMode ? (
                                            <Close />
                                        ) : (
                                            <Delete />
                                        )
                                    }>
                                    {state.isRecycleMode ? 'Close' : 'Bin'}
                                </Button>
                                <Tooltip
                                    title="Filter"
                                    className={css.filterButton}>
                                    <div>
                                        <IconButton
                                            disabled={isLoading}
                                            color="inherit"
                                            onClick={handleToggleFilter}>
                                            <FilterList />
                                        </IconButton>
                                    </div>
                                </Tooltip>
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </div>

                {/* Grid view of Event */}
                <Paper className={css.paper1} elevation={0}>
                    {/* Event Header */}
                    <Typography
                        className={css.title}
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        List of events
                    </Typography>
                    <Grid
                        className={css.gridLayout}
                        container
                        justify="flex-start"
                        spacing={2}>
                        {isLoading ? (
                            Array.apply(null, { length: state.take }).map(
                                (skeleton, index) => {
                                    return (
                                        <EventCard
                                            key={index}
                                            isLoading={isLoading}
                                        />
                                    );
                                }
                            )
                        ) : events.length === 0 ? (
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: '50vh' }}>
                                <Typography>No data matched</Typography>
                            </Grid>
                        ) : (
                            events.map((event) => {
                                return (
                                    <EventCard
                                        event={event}
                                        key={event._id}
                                        isLoading={isLoading}
                                        onClickEvent={handleOnClickEvent}
                                    />
                                );
                            })
                        )}
                    </Grid>
                </Paper>

                {/* Event Pagination */}
                <EventPagination
                    totalPages={totalPages}
                    page={state.page}
                    take={state.take}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleChangePage={handleChangePage}
                />
            </Paper>

            {/* Event Filter */}
            <EventFilter
                openFilter={state.openFilter}
                type={filters.type}
                budgetRange={filters.budgetRange}
                participantRange={filters.participantRange}
                startFrom={filters.startFrom}
                startTo={filters.startTo}
                endFrom={filters.endFrom}
                endTo={filters.endTo}
                setFilters={setFilters}
                handleFilterChange={handleFilterChange}
                handleToggleFilter={handleToggleFilter}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter}
            />

            {/* Notification */}
            <SystemNotification openDeleteSnackBar={state.openDeleteSnackBar} />
        </>
    );
};

export default EventManagement;

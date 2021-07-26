import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    AppBar,
    Grid,
    Toolbar,
    InputBase,
    Tooltip,
    IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { FilterList } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { getEvents } from '../../actions/eventActions';
import { getAllEventTypes } from '../../actions/eventTypeActions';
import SystemNotification from '../Notification/Notification';
import EventCard from '../EventManagement/EventCard/EventCard';
import EventFilter from '../EventManagement/EventFilter/EventFilter';
import EventPagination from '../EventManagement/EventPagination/EventPagination';
import { EVENT_LOADING } from '../../constants';

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
    openDeleteSnackBar: false
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

const EventRequest = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);

    const { events, isLoading, totalPages } = useSelector((state) => ({
        events: state.event.events,
        isLoading: state.event.isLoading,
        totalPages: state.event.totalPages
    }));

    /* state for searching */
    const [timeOutForSearch, setTimeOutForSearch] = useState({
        key: '',
        timeoutFunc: null
    });

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
                    status: state.status,
                    ownerId: null
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
        state.status
    ]);

    const { eventTypes } = useSelector(() => ({
        eventTypes: state.eventType?.eventTypes
    }));

    // Request all event type in the first access
    useEffect(() => {
        if (!eventTypes) {
            dispatch(getAllEventTypes());
        }
    }, [dispatch, eventTypes]);

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

    const handleChangeSearch = (e) => {
        const { name, value } = e.target;
        setTimeOutForSearch((prevState) => {
            dispatch({
                type: EVENT_LOADING,
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
            }, 300);
            return {
                ...prevState,
                [name]: value,
                timeoutFunc: newTimeoutFunc
            };
        });
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
            pathname: `/dashboard/reviewer/event-review/${event.urlCode}`,
            state: {
                from: '/dashboard/reviewer/event-request',
                event: event,
                reviewer: true
            }
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
                isReviewer={true}
                openFilter={state.openFilter}
                type={filters.type}
                budgetRange={filters.budgetRange}
                participantRange={filters.participantRange}
                startFrom={filters.startFrom}
                startTo={filters.startTo}
                endFrom={filters.endFrom}
                endTo={filters.endTo}
                status={filters.status}
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

export default EventRequest;

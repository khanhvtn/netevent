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
    CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';


import useStyles from './styles'
import { FilterList } from '@material-ui/icons';
import EventPagination from './EventPagination/EventPagination';
import EventCard from './EventCard/EventCard';
import EventFilter from './EventFilter/EventFilter';
import { useHistory } from 'react-router-dom';
import { getEvents } from '../../actions/eventActions';


const initialState = {
    search: '',
    take: 3,
    page: 1,
    openFilter: false,
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
}

const filterState = {
    createdFrom: null,
    createdTo: null,
    updatedFrom: null,
    updatedTo: null,
};

const EventManagement = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        events,
        isLoading,
        totalPages
    } = useSelector((state) => ({
        events: state.event.events,
        isLoading: state.event.isLoading,
        totalPages: state.event.totalPages,
        errors: state.error.errors
    }));

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);

    // Request to get the events data
    useEffect(() => {
        if (!history.location.state) {
            dispatch(getEvents(
                state.search,
                state.take,
                state.page
            ))
        }
    }, [dispatch, state.search, state.take, state.page])

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

    //handle Filter Change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
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

    // Push to the event-detail page with event props
    const handleOnClickEvent = (event) => {
        history.push({
            pathname: '/dashboard/event-detail',
            state: {
                event: event
            }
        })
    }

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
                                            'aria-label': 'search',
                                        }}
                                    />
                                </div>
                                <div className={css.grow} />
                                <Tooltip title="Filter">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleToggleFilter}
                                    >
                                        <FilterList />
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </div>

                {/* Event Header */}
                <Typography
                    className={css.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    List of events
                </Typography>

                {/* Grid view of Event */}
                <Grid className={css.gridLayout} container justify="flex-start" spacing={2}>
                    {isLoading ?
                        Array.apply(null, { length: state.take }).map((skeleton, index) => {
                            return (
                                <EventCard key={index} isLoading={isLoading} />
                            )
                        })
                        :
                        events.map((event, index) => {
                            return (
                                <EventCard event={event} key={index} isLoading={isLoading} onClickEvent={handleOnClickEvent} />
                            )
                        })
                    }
                </Grid>

                {/* Event Pagination */}
                <EventPagination
                    totalPages={totalPages}
                    page={state.page}
                    take={state.take}
                    handleChangeRowsPerPage={
                        handleChangeRowsPerPage
                    }
                    handleChangePage={handleChangePage}
                />
            </Paper>

            {/* Event Filter */}
            <EventFilter
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
        </>
    )
}

export default EventManagement;
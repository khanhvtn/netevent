import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Grid,
    Toolbar,
    IconButton,
    Tooltip,
    InputBase
} from '@material-ui/core';
import ParticipantPagination from '../../ParticipantPagination/ParticipantPagination';
import ParticipantTable from '../../ParticipantTable/ParticipantTable';
import { FilterList } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    getParticipants,
    setAttendedParticipant
} from '../../../../actions/participantActions';
import ParticipantFilter from '../../ParticipantFilter/ParticipantFilter';
import SystemNotification from '../../../Notification/Notification';
import { PARTICIPANT_LOADING } from '../../../../constants';
import ReviewParticipantDialog from '../VerifyTable/ReviewParticipantDialog/ReviewParticipantDialog';

const initialState = {
    search: '',
    take: 10,
    page: 1,
    openFilter: false,
    academic: '',
    isAttended: '',
    isValid: true,
    isParticipantUpdated: false,
    checkInMode: true,
    openReviewParticipantDialog: false,
    participant: null
};

const filterState = {
    academic: '',
    isAttended: ''
};

const CheckInTable = ({ eventId, tabs }) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);
    const [selected, setSelected] = useState([]);

    const { isParticipantUpdated } = useSelector((state) => ({
        isParticipantUpdated: state.participant.isUpdated
    }));

    /* state for searching */
    const [timeOutForSearch, setTimeOutForSearch] = useState({
        key: '',
        timeoutFunc: null
    });

    // UseEffect for update event success
    useEffect(() => {
        if (isParticipantUpdated) {
            setSelected([]);
            setState(initialState);
            dispatch(
                getParticipants(
                    state.search,
                    state.take,
                    state.page,
                    state.academic,
                    state.isValid,
                    state.isAttended,
                    eventId
                )
            );
        }
        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: isParticipantUpdated
        }));
    }, [
        dispatch,
        state.search,
        state.take,
        state.page,
        state.academic,
        state.isValid,
        state.isAttended,
        eventId,
        isParticipantUpdated
    ]);

    // Use Effect call participants API after state is set
    useEffect(() => {
        if (eventId && tabs === 2) {
            dispatch(
                getParticipants(
                    state.search,
                    state.take,
                    state.page,
                    state.academic,
                    state.isValid,
                    state.isAttended,
                    eventId
                )
            );
        }
    }, [
        dispatch,
        state.search,
        state.take,
        state.page,
        state.academic,
        state.isValid,
        state.isAttended,
        eventId,
        tabs
    ]);

    const handleSetAttended = (action) => {
        dispatch(
            setAttendedParticipant({ attendedList: selected, action: action })
        );
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

    const handleChangeSearch = (e) => {
        const { name, value } = e.target;
        setTimeOutForSearch((prevState) => {
            dispatch({
                type: PARTICIPANT_LOADING,
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
            page: 1,
            openFilter: !prevState.openFilter
        }));
        setSelected([]);
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
        setSelected([]);
    };

    const handleToggleDialogReviewParticipant = (e, participant) => {
        e.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            participant: participant,
            openReviewParticipantDialog: !prevState.openReviewParticipantDialog
        }));
    };

    const handleCloseDialogReviewParticipant = () => {
        setState((prevState) => ({
            ...prevState,
            participant: null,
            openReviewParticipantDialog: !prevState.openReviewParticipantDialog
        }));
    };

    return (
        <AppBar elevation={0} position="static" color="default">
            <Grid container direction="column">
                <Toolbar>
                    <div className={css.search}>
                        <div className={css.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={handleChangeSearch}
                            className={css.inputInput}
                            placeholder="Search by email, name, university or major"
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

                <ParticipantTable
                    take={state.take}
                    checkInMode={state.checkInMode}
                    handleSetAttended={handleSetAttended}
                    selected={selected}
                    setSelected={setSelected}
                    handleToggleDialogReviewParticipant={
                        handleToggleDialogReviewParticipant
                    }
                />

                <ParticipantPagination
                    page={state.page}
                    take={state.take}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleChangePage={handleChangePage}
                />

                {/* Participant Filter */}
                <ParticipantFilter
                    checkInMode={state.checkInMode}
                    openFilter={state.openFilter}
                    handleToggleFilter={handleToggleFilter}
                    academic={filters.academic}
                    isAttended={filters.isAttended}
                    handleFilterChange={handleFilterChange}
                    handleApplyFilter={handleApplyFilter}
                    handleClearFilter={handleClearFilter}
                />

                <ReviewParticipantDialog
                    openReviewParticipantDialog={
                        state.openReviewParticipantDialog
                    }
                    handleCloseDialogReviewParticipant={
                        handleCloseDialogReviewParticipant
                    }
                    participant={state.participant}
                />
            </Grid>
            {/* Notification */}
            <SystemNotification openUpdateSnackBar={state.openUpdateSnackBar} />
        </AppBar>
    );
};

export default CheckInTable;

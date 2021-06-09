import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Paper,
    Typography,
    AppBar,
    Grid,
    Toolbar,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip,
    Button,
    Chip,
    Dialog,
    Tabs,
    Tab,
    Divider,
    InputBase,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import blankPhoto from '../../../images/blankPhoto.png';
import { Link, useHistory } from 'react-router-dom';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventDeleteDialog from '../EventDialog/EventDeleteDialog';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteEventWithTaskAndFacilityHistory,
    getFacilityAndTaskByEventName,
} from '../../../actions/eventActions';
import { getParticipants, setInvalidAndVerifyParticipant } from '../../../actions/participantActions';
import { Skeleton } from '@material-ui/lab';
import CreateEvent from '../../CreateEvent/CreateEvent';
import SystemNotification from '../../Notification/Notification';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import ParticipantPagination from '../ParticipantPagination/ParticipantPagination';
import ParticipantTable from '../ParticipantTable/ParticipantTable';
import { FilterList } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
import ParticipantFilter from '../ParticipantFilter/ParticipantFilter';
import { is } from 'date-fns/esm/locale';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const initialDescription =
    '{"blocks":[{"key":"4jrep","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

const initialState = {
    search: '',
    take: 10,
    page: 1,
    openFilter: false,
    status: '',
    academic: '',
    isValid: '',
    event: null,
    previousPath: null,
    openDeleteDialog: false,
    openUpdateDialog: false,
    openUpdateSnackBar: false,
    isUpdated: false,
    isParticipantUpdated: false,
};

const initialDeleteState = {
    eventId: null,
    taskListId: [],
    historyFacilityListId: [],
};

const filterState = {
    academic: '',
    isValid: '',
}

const EventDetail = () => {
    const css = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [deleteState, setDeleteState] = useState(initialDeleteState);
    const [expanded, setExpanded] = useState(false);
    const [tabs, setTabs] = useState(0)
    const [filters, setFilters] = useState(filterState);
    const [selected, setSelected] = useState([]);

    // Update new state when getting props from event-management page
    useEffect(() => {
        // Return the previous page when there is no props passing
        if (!history.location.state && !state?.event) {
            history.goBack();
        }

        // Set state for the event
        setState((prevState) => ({
            ...prevState,
            event: {
                ...(history.location.state?.event || newUpdateEventDetail),
                description: history.location?.state?.event?.description || newUpdateEventDetail?.description || '', // Fix later
            },
            previousPath: history.location.state?.from
        }));
    }, []);

    // Get Facility and Task if state event existed
    useEffect(() => {
        if (state.event) {
            dispatch(getFacilityAndTaskByEventName(state.event.eventName));
        }
    }, [dispatch, state.event]);

    const {
        facilities,
        tasks,
        isDetailLoading,
        isLoading,
        updateEventSuccess,
        newUpdateEventDetail,
        isParticipantUpdated,
    } = useSelector((state) => ({
        newUpdateEventDetail: state.event.eventDetail,
        facilities: state.event.eventDetail?.facilityHistoryListId,
        tasks: state.event.eventDetail?.taskListId,
        isDetailLoading: state.event.isDetailLoading,
        isLoading: state.event.isLoading,
        updateEventSuccess: state.event.updateSuccess,
        isParticipantUpdated: state.participant.isUpdated
    }));

    // UseEffect for update event success
    useEffect(() => {
        if (isParticipantUpdated) {
            setSelected([])
            setState((prevState) => ({
                ...prevState,
                academic: '',
                isValid: '',
                isParticipantUpdated: !prevState.isParticipantUpdated
            }));
        }

        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: updateEventSuccess || isParticipantUpdated,
        }));
    }, [updateEventSuccess, isParticipantUpdated]);

    // UseEffect for update event status
    useEffect(() => {
        if (updateEventSuccess) {
            setState((prevState) => ({
                ...prevState,
                event: { ...newUpdateEventDetail },
                isUpdated: true,
            }));
            history.replace();
        }
    }, [updateEventSuccess]);

    // Update Delete State
    useEffect(() => {
        if (state.event && !isDetailLoading)
            setDeleteState((prevState) => ({
                ...prevState,
                eventId: state.event?._id,
                taskListId: tasks.map((task) => task._id),
                historyFacilityListId: facilities.map((facility) => facility._id),
            }));
    }, [isDetailLoading]);

    // Use Effect call participants API after state is set
    useEffect(() => {
        if (state.event?._id && tabs === 1) {
            dispatch(
                getParticipants(
                    state.search,
                    state.take,
                    state.page,
                    state.academic,
                    state.isValid,
                    state.event._id))
        }
    }, [dispatch,
        state.search,
        state.take,
        state.page,
        state.isValid,
        state.academic,
        state.isParticipantUpdated,
        tabs]
    );

    // Handle expand of accordion
    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangeTabs = (event, newValue) => {
        setSelected([]);
        setTabs(newValue);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleOnClickViewTemplate = () => {
        history.push({
            pathname: `/registration/${state.event.eventName.replace(/\s/g, "-")}`,
            state: {
                from: '/dashboard/event-detail',
                event: {
                    ...state.event,
                    taskListId: tasks,
                },
                isReviewed: true
            }
        })
    }

    // Return to previous page with status
    const handleOnClickReturn = () => {
        setState(initialState);

        switch (state.previousPath) {
            case '/dashboard/creator-calendar':
                return history.push({
                    pathname: `${state.previousPath}`,
                    state: {
                        isUpdated: state.isUpdated,
                    },
                });
            case '/dashboard/event-management':
                return history.push({
                    pathname: `${state.previousPath}`,
                    state: {
                        isUpdated: state.isUpdated,
                    },
                });
            default:
                return history.goBack();
        }
    };

    // Handle Delete Event
    const handleDeleteEvent = () => {
        dispatch(deleteEventWithTaskAndFacilityHistory(deleteState, history));
    };

    const contentState = convertFromRaw(
        JSON.parse(
            state.event?.description ? state.event?.description : initialDescription
        )
    );
    const editorState = EditorState.createWithContent(contentState);

    const handleToggleDialogDelete = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteDialog: !prevState.openDeleteDialog,
        }));
    };

    const handleToggleDialogUpdate = () => {
        setState((prevState) => ({
            ...prevState,
            openUpdateDialog: !prevState.openUpdateDialog,
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
            page: 1,
            openFilter: !prevState.openFilter,
        }));
        setSelected([])
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
        setSelected([])
    };

    const handleSetInvalid = () => {
        dispatch(setInvalidAndVerifyParticipant({ invalidList: selected, action: false }))
    }

    const handleSetVerified = () => {
        dispatch(setInvalidAndVerifyParticipant({ verifiedList: selected, action: true }))
    }

    return (
        <>
            <Paper className={css.paper} color="inherit" elevation={3}>
                {/* Event Detail Toolbar */}
                <div className={css.grow}>
                    <AppBar position="static" color="default" elevation={0}>
                        <Grid container direction="column">
                            <Toolbar>
                                <IconButton onClick={handleOnClickReturn}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography className={css.toolbarEventDetail} variant="h6">
                                    Event Management
                                </Typography>
                                <div className={css.grow} />
                                <Tooltip title="Delete">
                                    <div>
                                        <Button
                                            disabled={isDetailLoading || isLoading}
                                            color="inherit"
                                            onClick={handleToggleDialogDelete}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <div>
                                        <Button
                                            disabled={isDetailLoading || isLoading}
                                            color="inherit"
                                            variant="outlined"
                                            style={{ margin: '0 8px' }}
                                            onClick={handleToggleDialogUpdate}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </Tooltip>
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </div>

                <Divider />

                <div className={css.grow}>
                    <AppBar position="static" color="default" elevation={0}>
                        <Grid container direction="column">
                            <Tabs
                                value={tabs}
                                onChange={handleChangeTabs}
                                textColor="inherit"
                                TabIndicatorProps={{ style: { background: 'black' } }}>
                                <Tab style={{ textTransform: 'none' }} textColor="inherit" label="Detail" {...a11yProps(0)} />
                                <Tab style={{ textTransform: 'none' }} textColor="inherit" label="Participant" {...a11yProps(1)} />
                            </Tabs>
                        </Grid>
                    </AppBar>
                </div>

                <Divider />

                {/* Event detail tabs */}
                <TabPanel value={tabs} index={0}>
                    {/* Event Detail */}
                    <Grid container justify="center" alignItems="center" direction="column">
                        {/* Event Header */}
                        <Grid item>
                            <Typography className={css.eventDetailTitle} variant="h3">
                                Event Detail
                        </Typography>
                        </Grid>

                        {/* Event Image */}
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            item
                            md={12}
                            lg={12}
                            xl={12}
                            sm={12}
                            xs={12}
                            className={css.imageWrapper}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '345px',
                                    backgroundImage: `url(${!state.event?.image ? blankPhoto : state.event?.image
                                        })`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'contain',
                                }}
                            ></div>
                        </Grid>

                        {/* Event Detail */}
                        <Grid
                            container
                            justify="center"
                            alignItems="flex-start"
                            direction="row"
                        >
                            {/* Left-side Detail */}
                            <Grid
                                className={css.detailWrapper}
                                xs={12}
                                sm={12}
                                md={8}
                                container
                                alignItems="flex-start"
                                justify="center"
                                direction="column"
                                item
                            >
                                {/* Event Title, Budget and MaxParticipants */}
                                <Grid container direction="column" item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h5">
                                        {state.event?.eventName}
                                        {state.event?.isApproved === null ?
                                            <Chip
                                                className={css.chipStatus}
                                                style={{ backgroundColor: `rgba(251, 191, 36, 1)` }}
                                                size="small"
                                                label="Pending"
                                            />
                                            :
                                            state.event?.isFinished ?
                                                <Chip
                                                    className={css.chipStatus}
                                                    size="small"
                                                    label="Expired"
                                                    disabled
                                                />
                                                : state.event?.isApproved ?
                                                    <Chip
                                                        className={css.chipStatus}
                                                        style={{ backgroundColor: `rgba(52, 211, 153, 1)` }}
                                                        size="small"
                                                        label="On-going"
                                                    />
                                                    :
                                                    <Chip
                                                        className={css.chipStatus}
                                                        style={{ backgroundColor: `rgba(248, 113, 113, 1)` }}
                                                        size="small"
                                                        label="Rejected"
                                                    />
                                        }
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {`${state.event?.budget} vnd | ${state.event?.maxParticipants} participants`}
                                    </Typography>
                                    <div>
                                        <Button disabled={isDetailLoading || isLoading} onClick={handleOnClickViewTemplate} className={css.viewTemplateButton} variant="outlined" size="small" >
                                            View template
                                    </Button>
                                    </div>
                                </Grid>

                                {/* Event Language, Type, Mode, Accomodation */}
                                <Grid className={css.mt48} container item>
                                    <Grid
                                        className={css.schedule}
                                        direction="row"
                                        alignItems="flex-start"
                                        justify="center"
                                        container
                                        item
                                    >
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item
                                        >
                                            <AssignmentIndOutlinedIcon />
                                        </Grid>
                                        <Grid xs={5} container direction="column" item>
                                            <Typography variant="caption" color="textSecondary">
                                                Category (type)
                                        </Typography>
                                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                                {state.event?.eventTypeId?.name}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item
                                        >
                                            <LanguageIcon />
                                        </Grid>
                                        <Grid xs={5} container direction="column" item>
                                            <Typography variant="caption" color="textSecondary">
                                                Language
                                        </Typography>
                                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                                {state.event?.language}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        style={{ marginTop: 24 }}
                                        direction="row"
                                        alignItems="flex-start"
                                        justify="center"
                                        container
                                        item
                                    >
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item
                                        >
                                            <ErrorOutlineOutlinedIcon />
                                        </Grid>
                                        <Grid xs={5} container direction="column" item>
                                            <Typography variant="caption" color="textSecondary">
                                                Mode
                                        </Typography>
                                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                                {state.event?.mode}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item
                                        >
                                            <TimelapseOutlinedIcon />
                                        </Grid>
                                        <Grid xs={5} container direction="column" item>
                                            <Typography variant="caption" color="textSecondary">
                                                Accomodation
                                        </Typography>
                                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                                {state.event?.accommodation}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Event Task List */}
                                <Grid className={css.mt48} container item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                        Tasks
                                </Typography>
                                    <div className={css.expandRoot}>
                                        {isDetailLoading ? (
                                            <>
                                                <Skeleton />
                                                <Skeleton />
                                            </>
                                        ) : (
                                                tasks?.map((task, index) => {
                                                    return (
                                                        <Accordion
                                                            key={index}
                                                            expanded={expanded === `task-panel${index}`}
                                                            onChange={handleExpand(`task-panel${index}`)}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={`task-panel${index}bh-content`}
                                                                id={`task-panel${index}bh-header`}
                                                            >
                                                                <Typography className={css.heading}>
                                                                    {task.name}
                                                                </Typography>
                                                                <Typography className={css.secondaryHeading}>
                                                                    {task.userId?.email}
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails className={css.expandRoot}>
                                                                <Grid className={css.schedule} container>
                                                                    <Grid
                                                                        xs
                                                                        container
                                                                        direction="column"
                                                                        justify="center"
                                                                        item
                                                                    >
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{ fontWeight: 'bold' }}
                                                                        >
                                                                            Type
                                                                    </Typography>
                                                                        <Typography variant="body2">
                                                                            {task.type}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs container direction="column" item>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{ fontWeight: 'bold' }}
                                                                        >
                                                                            From
                                                                    </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(task.startDate).format('LT')}`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs container direction="column" item>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{ fontWeight: 'bold' }}
                                                                        >
                                                                            To
                                                                    </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(task.endDate).format('LT')}`}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    );
                                                })
                                            )}
                                    </div>
                                </Grid>

                                {/* Event Facility List */}
                                <Grid className={css.mt48} container item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                        Facilities
                                </Typography>
                                    <div className={css.expandRoot}>
                                        {isDetailLoading ? (
                                            <>
                                                <Skeleton />
                                                <Skeleton />
                                            </>
                                        ) : (
                                                facilities?.map((facility, index) => {
                                                    return (
                                                        <Accordion
                                                            key={index}
                                                            expanded={expanded === `facility-panel${index}`}
                                                            onChange={handleExpand(`facility-panel${index}`)}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={`facility-panel${index}bh-content`}
                                                                id={`facility-panel${index}bh-header`}
                                                            >
                                                                <Typography>{facility.facilityId?.name}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails className={css.expandRoot}>
                                                                <Grid className={css.schedule} container>
                                                                    <Grid xs container direction="column" item>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{ fontWeight: 'bold' }}
                                                                        >
                                                                            Borrow date
                                                                    </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(facility.borrowDate).format(
                                                                                'DD MMM, YYYY'
                                                                            )}`}
                                                                        </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(facility.borrowDate).format(
                                                                                'LT'
                                                                            )}`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid xs container direction="column" item>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{ fontWeight: 'bold' }}
                                                                        >
                                                                            Return date
                                                                    </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(facility.returnDate).format(
                                                                                'DD MMM, YYYY'
                                                                            )}`}
                                                                        </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(facility.returnDate).format(
                                                                                'LT'
                                                                            )}`}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    );
                                                })
                                            )}
                                    </div>
                                </Grid>

                                {/* Event Description */}
                                <Grid className={css.mt48} item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                        Description
                                </Typography>
                                    {/* <Typography variant="body2">
                                    {state.event?.description}
                                </Typography> */}
                                    <Editor editorState={editorState} readOnly={true} />
                                </Grid>
                            </Grid>

                            {/* Right-side Detail */}
                            <Grid
                                className={css.detailRightWrapper}
                                xs={12}
                                sm={12}
                                md={4}
                                container
                                alignItems="flex-start"
                                justify="center"
                                direction="column"
                                item
                            >
                                {/* Date and time */}
                                <Grid item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                        Date and time
                                </Typography>
                                    <Typography variant="body2">
                                        {moment(state.event?.startDate).format('DD MMM') ===
                                            moment(state.event?.endDate).format('DD MMM')
                                            ? `${moment(state.event?.startDate).format('DD MMM, YYYY')}`
                                            : `${moment(state.event?.startDate).format(
                                                'DD MMM'
                                            )} - ${moment(state.event?.endDate).format('DD MMM')}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`${moment(state.event?.startDate).format('LT')} - ${moment(
                                            state.event?.endDate
                                        ).format('LT')}`}
                                    </Typography>
                                    <Typography variant="caption" color="primary">
                                        <Link to="/dashboard/creator-calendar" style={{ textDecoration: 'none' }}>
                                            View Calendar
                                    </Link>
                                    </Typography>
                                </Grid>

                                {/* Registration Close Date */}
                                <Grid className={css.mt36} item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                        Registration deadline
                                </Typography>
                                    <Typography variant="body2">
                                        {`${moment(state.event?.registrationCloseDate).format(
                                            'DD MMM, YYYY'
                                        )}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`${moment(state.event?.registrationCloseDate).format('LT')}`}
                                    </Typography>
                                </Grid>

                                {/* Location */}
                                <Grid className={css.mt36} item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                        Location
                                </Typography>
                                    <Typography variant="body2">{state.event?.location}</Typography>
                                </Grid>

                                {/* Tags */}
                                <Grid className={css.mt36} item>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                        Tags
                                </Typography>
                                    <div className={css.chipContainer}>
                                        {state.event?.tags.map((tag, index) => (
                                            <Chip key={index} label={tag} size="small" className={css.chip} />
                                        ))}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Participant Tabs */}
                <TabPanel value={tabs} index={1}>
                    <AppBar elevation={0} position="static" color="default">
                        <Grid container direction="column">
                            <Toolbar>
                                <div className={css.search}>
                                    <div className={css.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        onChange={handleChange}
                                        className={css.inputInput}
                                        placeholder="Search by email, name, university or major"
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
                            <ParticipantTable
                                take={state.take}
                                handleSetInvalid={handleSetInvalid}
                                handleSetVerified={handleSetVerified}
                                selected={selected}
                                setSelected={setSelected} />
                            <ParticipantPagination
                                page={state.page}
                                take={state.take}
                                handleChangeRowsPerPage={
                                    handleChangeRowsPerPage
                                }
                                handleChangePage={handleChangePage} />
                        </Grid>
                    </AppBar>
                </TabPanel>
            </Paper>

            {/* Participant Filter */}
            <ParticipantFilter
                openFilter={state.openFilter}
                handleToggleFilter={handleToggleFilter}
                academic={filters.academic}
                isValid={filters.isValid}
                handleFilterChange={handleFilterChange}
                handleApplyFilter={handleApplyFilter}
                handleClearFilter={handleClearFilter} />

            {/* Event Delete Dialog */}
            <EventDeleteDialog
                openDeleteDialog={state.openDeleteDialog}
                handleToggleDialogDelete={handleToggleDialogDelete}
                handleDeleteEvent={handleDeleteEvent}
            />

            {/* Event Update Dialog */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={state.openUpdateDialog}
                onClose={handleToggleDialogUpdate}
                aria-labelledby="max-width-dialog-title"
            >
                <CreateEvent
                    isUpdateMode={state.openUpdateDialog}
                    updateEventDetail={state.event}
                    updateFacilities={facilities}
                    updateTasks={tasks}
                    handleCloseUpdateDialog={handleToggleDialogUpdate}
                />
            </Dialog>

            {/* Notification */}
            <SystemNotification openUpdateSnackBar={state.openUpdateSnackBar} />
        </>
    );
};

export default EventDetail;

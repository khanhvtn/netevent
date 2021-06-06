import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import useStyles from './styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import blankPhoto from '../../../images/blankPhoto.png';
import { useHistory } from 'react-router-dom';
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
import { Skeleton } from '@material-ui/lab';
import CreateEvent from '../../CreateEvent/CreateEvent';
import SystemNotification from '../../Notification/Notification';
import { convertToRaw, EditorState } from 'draft-js';

const initialState = {
    event: null,
    openDeleteDialog: false,
    openUpdateDialog: false,
    openUpdateSnackBar: false,
    isUpdated: false,
};

const initialDeleteState = {
    eventId: null,
    taskListId: [],
    historyFacilityListId: [],
};

const EventDetail = () => {
    const css = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [deleteState, setDeleteState] = useState(initialDeleteState)
    const [expanded, setExpanded] = useState(false);

    const {
        facilities,
        tasks,
        isDetailLoading,
        isLoading,
        updateEventSuccess,
        newUpdateEventDetail,
    } = useSelector((state) => ({
        newUpdateEventDetail: state.event.eventDetail,
        facilities: state.event.eventDetail?.facilityHistoryListId,
        tasks: state.event.eventDetail?.taskListId,
        isDetailLoading: state.event.isDetailLoading,
        isLoading: state.event.isLoading,
        updateEventSuccess: state.event.updateSuccess
    }));

    // Update new state when getting props from event-management page
    useEffect(() => {
        // Return the event-management page when there is no props passing
        if (!history.location.state && !state.event) {
            history.push('/dashboard/event-management')
        }

        // Set state for the event
        setState((prevState) => ({
            ...prevState,
            event: history.location.state.event || newUpdateEventDetail,
        }));
    }, []);


    // Get Facility and Task if state event existed
    useEffect(() => {
        if (state.event) {
            dispatch(getFacilityAndTaskByEventName(state.event.eventName))
        }
    }, [state.event])

    // UseEffect for update event success
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: updateEventSuccess,
        }));
    }, [updateEventSuccess])

    // UseEffect for update event status
    useEffect(() => {
        if (updateEventSuccess) {
            setState((prevState) => ({
                ...prevState,
                event: {
                    ...newUpdateEventDetail,
                    description: JSON.parse(newUpdateEventDetail.description).blocks[0].text
                },
                isUpdated: true
            }));
            history.replace()
        }
    }, [updateEventSuccess])

    // Update Delete State
    useEffect(() => {
        if (state.event && !isDetailLoading)
            setDeleteState((prevState) => ({
                ...prevState,
                eventId: state.event?._id,
                taskListId: tasks.map((task) => task._id),
                historyFacilityListId: facilities.map((facility) => facility._id),
            }))
    }, [isDetailLoading])

    // Handle expand of accordion
    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Return to event-management page with the current path
    const handleOnClickReturn = () => {
        setState(initialState)
        history.push({
            pathname: '/dashboard/event-management',
            state: {
                from: '/dashboard/event-detail',
                isUpdated: state.isUpdated
            }
        })
    }
}, [state.event]);

const {
    facilities,
    tasks,
    isDetailLoading,
    isLoading,
    updateEventSuccess,
    newUpdateEventDetail,
} = useSelector((state) => ({
    newUpdateEventDetail: state.event.eventDetail,
    facilities: state.event.eventDetail?.facilityHistoryListId,
    tasks: state.event.eventDetail?.taskListId,
    isDetailLoading: state.event.isDetailLoading,
    isLoading: state.event.isLoading,
    updateEventSuccess: state.event.updateSuccess,
}));

// UseEffect for update event success
useEffect(() => {
    setState((prevState) => ({
        ...prevState,
        openUpdateSnackBar: updateEventSuccess,
    }));
}, [updateEventSuccess]);

// UseEffect for update event status
useEffect(() => {
    if (updateEventSuccess) {
        setState((prevState) => ({
            ...prevState,
            event: newUpdateEventDetail,
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

// Handle expand of accordion
const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
};

// Return to event-management page with the current path
const handleOnClickReturn = () => {
    setState(initialState);
    history.push({
        pathname: '/dashboard/event-management',
        state: {
            from: '/dashboard/event-detail',
            isUpdated: state.isUpdated,
        },
    });
};

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

// Handle Delete Event
const handleDeleteEvent = () => {
    console.log(deleteState);
    dispatch(deleteEventWithTaskAndFacilityHistory(deleteState, history));
};

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
                                <Button
                                    disabled={isDetailLoading || isLoading}
                                    color="inherit"
                                    onClick={handleToggleDialogDelete}
                                >
                                    Delete
                  </Button>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <Button
                                    disabled={isDetailLoading || isLoading}
                                    color="inherit"
                                    variant="outlined"
                                    style={{ margin: '0 8px' }}
                                    onClick={handleToggleDialogUpdate}
                                >
                                    Update
                  </Button>
                            </Tooltip>
                        </Toolbar>
                    </Grid>
                </AppBar>
            </div>

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
                        <Grid item>
                            <Typography style={{ fontWeight: 'bold' }} variant="h5">
                                {state.event?.eventName}
                                {state.event?.isApproved === null ? (
                                    <Chip
                                        className={css.chipStatus}
                                        style={{ backgroundColor: `rgba(251, 191, 36, 1)` }}
                                        size="small"
                                        label="Pending"
                                    />
                                ) : state.event?.isFinished ? (
                                    <Chip
                                        className={css.chipStatus}
                                        size="small"
                                        label="Expired"
                                        disabled
                                    />
                                ) : state.event?.isApproved ? (
                                    <Chip
                                        className={css.chipStatus}
                                        style={{ backgroundColor: `rgba(52, 211, 153, 1)` }}
                                        size="small"
                                        label="On-going"
                                    />
                                ) : (
                                                <Chip
                                                    className={css.chipStatus}
                                                    style={{ backgroundColor: `rgba(248, 113, 113, 1)` }}
                                                    size="small"
                                                    label="Rejected"
                                                />
                                            )}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {`${state.event?.budget} vnd | ${state.event?.maxParticipants} participants`}
                            </Typography>
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
                                        {state.event?.eventTypeId.name}
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
                            <Typography variant="body2">
                                {state.event?.description}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Right-side Detail */}
                    <Grid
                        className={css.detailWrapper}
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
                            <Typography variant="body2">
                                {state.event?.tags.join(', ')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

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

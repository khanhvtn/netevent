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
    CircularProgress
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useHistory, useParams } from 'react-router-dom';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventDeleteDialog from '../EventDialog/EventDeleteDialog';
import moment from 'moment';
import blankPhoto from '../../../images/blankPhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteEvent,
    deleteEventPermanent,
    getFacilityAndTaskByEventCode,
    recoveryEvent,
    updateEventStatus
} from '../../../actions/eventActions';
import { Skeleton } from '@material-ui/lab';
import CreateEvent from '../../CreateEvent/CreateEvent';
import SystemNotification from '../../Notification/Notification';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import CheckInTable from './CheckInTable/CheckInTable';
import VerifyTable from './VerifyTable/VerifyTable';
import EventCheckingCompletedDialog from '../EventDialog/EventCheckingCompletedDialog';
import NotificationHistory from './NotificationHistory/NotificationHistory';
import Image from 'material-ui-image';
import useStyles from './styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`
    };
}

const initialDescription =
    '{"blocks":[{"key":"4jrep","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

const initialState = {
    event: null,
    previousPath: null,
    openDeleteDialog: false,
    openUpdateDialog: false,
    openCheckingCompletedDialog: false,
    openUpdateSnackBar: false,
    isUpdated: false,
    isParticipantUpdated: false,
    isDetailLoading: false,
    isCheckingCompletedEvent: false
};

const initialDeleteState = {
    eventId: null,
    taskListId: [],
    historyFacilityListId: []
};

const EventDetail = () => {
    const css = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [deleteState, setDeleteState] = useState(initialDeleteState);
    const [expanded, setExpanded] = useState(false);
    const [tabs, setTabs] = useState(0);
    // UseParams to get pathname
    const { code } = useParams();

    const {
        facilities,
        tasks,
        isDetailLoading,
        isLoading,
        updateEventSuccess,
        newUpdateEventDetail,
        deleteEventSuccess,
        recoverySuccess
    } = useSelector((state) => ({
        newUpdateEventDetail: state.event.eventDetail,
        facilities: state.event.eventDetail?.facilityHistoryListId,
        tasks: state.event.eventDetail?.taskListId,
        isDetailLoading: state.event.isDetailLoading,
        isLoading: state.event.isLoading,
        updateEventSuccess: state.event.updateSuccess,
        deleteEventSuccess: state.event.deleteSuccess,
        recoverySuccess: state.event.recoverySuccess
    }));

    // Get Facility and Task if state event existed
    useEffect(() => {
        if (!state.event) {
            dispatch(getFacilityAndTaskByEventCode(code));
        }
        if (!state.previousPath) {
            if (history.location.state?.from) {
                setState((prevState) => ({
                    ...prevState,
                    previousPath: history.location.state?.from
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    isUpdated: true
                }));
            }
        }
    }, [dispatch, history, state.event, state.previousPath, code]);

    // Update new state when getting props from event-management page
    useEffect(() => {
        if (newUpdateEventDetail) {
            setState((prevState) => ({
                ...prevState,
                event: newUpdateEventDetail
            }));
        }
    }, [newUpdateEventDetail]);

    // Get Facility and Task if state event existed
    useEffect(() => {
        if (
            state.event?.endDate &&
            !state.isCheckingCompletedEvent &&
            !state.event?.isFinished &&
            state.event?.isApproved
        ) {
            setState((prevState) => ({
                ...prevState,
                isCheckingCompletedEvent: !prevState.isCheckingCompletedEvent
            }));
            const currentDate = new Date();
            const endDate = new Date(state.event?.endDate);
            if (currentDate > endDate) {
                handleToggleDialogCheckingCompleted();
            }
        }
    }, [
        dispatch,
        state.event?.endDate,
        state.event?.isFinished,
        state.event?.isApproved,
        state.isCheckingCompletedEvent
    ]);

    // UseEffect for update event status
    useEffect(() => {
        if (updateEventSuccess) {
            setState((prevState) => ({
                ...prevState,
                event: newUpdateEventDetail,
                isUpdated: true
            }));
            if (state.openCheckingCompletedDialog) {
                handleToggleDialogCheckingCompleted();
            }
        }
        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: updateEventSuccess
        }));
    }, [
        updateEventSuccess,
        newUpdateEventDetail,
        state.openCheckingCompletedDialog
    ]);

    //userEffect to toggle notification for recovery success
    useEffect(() => {
        if (recoverySuccess) {
            setState((prevState) => ({
                ...prevState,
                openRecoverySnackBar: recoverySuccess
            }));
            history.push({
                pathname: '/dashboard/creator/event-management',
                state: {
                    isRecycleMode: history.location.state?.isRecycleMode,
                    isUpdated: true
                }
            });
        }
    }, [history, recoverySuccess]);

    useEffect(() => {
        if (deleteEventSuccess) {
            handleToggleDialogDelete();
            history.push({
                pathname: '/dashboard/creator/event-management',
                state: {
                    isUpdated: true
                }
            });
        }
    }, [deleteEventSuccess, history]);

    // Update Delete State
    useEffect(() => {
        if (state.event && !isDetailLoading)
            setDeleteState((prevState) => ({
                ...prevState,
                eventId: state.event?._id,
                taskListId: tasks?.map((task) => task._id),
                historyFacilityListId: facilities?.map(
                    (facility) => facility._id
                )
            }));
    }, [isDetailLoading, facilities, state.event, tasks]);

    // Handle expand of accordion
    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangeTabs = (event, newValue) => {
        setTabs(newValue);
    };

    const handleOnClickViewTemplate = () => {
        return history.push({
            pathname: `/registration/${state.event.urlCode}`,
            state: {
                from: '/dashboard/creator/event-detail',
                event: {
                    ...state.event,
                    taskListId: tasks
                },
                isReviewed: true
            }
        });
    };

    // Return to previous page with status
    const handleOnClickReturn = () => {
        setState(initialState);
        let defaultHistoryState = {
            isUpdated: state.isUpdated
        };
        //add isRecycleMode into history state if it exists
        if (history.location.state?.isRecycleMode) {
            defaultHistoryState = {
                ...defaultHistoryState,
                isRecycleMode: history.location.state?.isRecycleMode
            };
        }

        if (state.previousPath) {
            return history.push({
                pathname: state.previousPath,
                state: defaultHistoryState
            });
        } else {
            return history.push({
                pathname: '/dashboard/creator/event-management',
                state: defaultHistoryState
            });
        }
    };

    // Handle Delete Event
    const handleDeleteEvent = () => {
        if (history.location.state?.isRecycleMode) {
            dispatch(deleteEventPermanent(deleteState));
        } else {
            dispatch(deleteEvent({ eventId: deleteState.eventId }));
        }
    };

    // Handle Update Event Status
    const handleUpdateEventStatus = () => {
        dispatch(
            updateEventStatus({
                eventId: state.event?._id,
                status: true,
                action: 'finish'
            })
        );
    };

    const contentState = convertFromRaw(
        JSON.parse(
            state.event?.description
                ? state.event?.description
                : initialDescription
        )
    );
    const editorState = EditorState.createWithContent(contentState);

    const handleToggleDialogDelete = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteDialog: !prevState.openDeleteDialog
        }));
    };

    const handleToggleDialogUpdate = () => {
        setState((prevState) => ({
            ...prevState,
            openUpdateDialog: !prevState.openUpdateDialog
        }));
    };

    const handleToggleDialogCheckingCompleted = () => {
        setState((prevState) => ({
            ...prevState,
            openCheckingCompletedDialog: !prevState.openCheckingCompletedDialog
        }));
    };

    //handle recovery envent
    const handleRecoveryEvent = () => {
        dispatch(recoveryEvent({ eventId: deleteState.eventId }));
    };

    return isDetailLoading ? (
        <div className={css.circularProgress} align="center">
            <CircularProgress color="primary" />
        </div>
    ) : (
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
                                <Typography
                                    className={css.toolbarEventDetail}
                                    variant="h6">
                                    Event Management
                                </Typography>
                                <div className={css.grow} />
                                <Tooltip title="Delete">
                                    <div>
                                        <Button
                                            disabled={
                                                isDetailLoading || isLoading
                                            }
                                            color="inherit"
                                            onClick={handleToggleDialogDelete}>
                                            Delete
                                        </Button>
                                    </div>
                                </Tooltip>
                                {history.location.state.isRecycleMode ? (
                                    <Tooltip title="Edit">
                                        <div>
                                            <Button
                                                disabled={
                                                    isDetailLoading || isLoading
                                                }
                                                color="primary"
                                                variant="contained"
                                                style={{ margin: '0 8px' }}
                                                onClick={handleRecoveryEvent}>
                                                Recovery
                                            </Button>
                                        </div>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Edit">
                                        <div>
                                            <Button
                                                disabled={
                                                    isDetailLoading || isLoading
                                                }
                                                color="inherit"
                                                variant="outlined"
                                                style={{ margin: '0 8px' }}
                                                onClick={
                                                    handleToggleDialogUpdate
                                                }>
                                                Update
                                            </Button>
                                        </div>
                                    </Tooltip>
                                )}
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </div>

                <Divider />

                {/* Event Detail Tabs */}
                <div className={css.grow}>
                    <AppBar
                        component="div"
                        position="static"
                        color="default"
                        elevation={0}>
                        <Grid container direction="column">
                            <Tabs
                                value={tabs}
                                onChange={handleChangeTabs}
                                textColor="inherit"
                                TabIndicatorProps={{
                                    style: {
                                        background: 'black',
                                        height: 3,
                                        borderTopLeftRadius: 3,
                                        borderTopRightRadius: 3
                                    }
                                }}>
                                <Tab
                                    disableTouchRipple
                                    className={css.tabDesign}
                                    textColor="inherit"
                                    label="Detail"
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    disableTouchRipple
                                    className={css.tabDesign}
                                    textColor="inherit"
                                    label="Participant"
                                    {...a11yProps(1)}
                                />
                                <Tab
                                    disableTouchRipple
                                    className={css.tabDesign}
                                    textColor="inherit"
                                    label="Check-in"
                                    {...a11yProps(2)}
                                />
                                <Tab
                                    disableTouchRipple
                                    className={css.tabDesign}
                                    textColor="inherit"
                                    label="Notification"
                                    {...a11yProps(3)}
                                />
                            </Tabs>
                        </Grid>
                    </AppBar>
                </div>

                <Divider />

                {/* Event detail tabs */}
                <TabPanel value={tabs} index={0}>
                    <div className={css.imageCover}>
                        <Image
                            className={css.cover}
                            src={
                                state.event?.image
                                    ? state.event?.image
                                    : blankPhoto
                            }
                            aspectRatio={25 / 9}
                            cover
                        />
                    </div>
                    {/* Event Detail */}
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column">
                        {/* Event Detail */}
                        <Grid
                            container
                            justify="center"
                            alignItems="flex-start"
                            direction="row">
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
                                item>
                                {/* Event Title, Budget and MaxParticipants */}
                                <Grid container direction="column" item>
                                    <Typography variant="h5">
                                        {state.event?.eventName}
                                        {state.event?.isApproved === null ? (
                                            <Chip
                                                className={css.chipStatus}
                                                style={{
                                                    backgroundColor: `#9e9e9e`
                                                }}
                                                size="small"
                                                label="Pending"
                                            />
                                        ) : state.event?.isFinished ? (
                                            <Chip
                                                className={css.chipStatus}
                                                size="small"
                                                label="Completed"
                                                style={{
                                                    backgroundColor: `#4caf50`
                                                }}
                                            />
                                        ) : state.event?.isApproved ? (
                                            <Chip
                                                clickable
                                                onClick={
                                                    handleUpdateEventStatus
                                                }
                                                className={css.chipStatus}
                                                style={{
                                                    backgroundColor: `#5c6bc0`
                                                }}
                                                size="small"
                                                label="Approved"
                                            />
                                        ) : (
                                            <Chip
                                                className={css.chipStatus}
                                                style={{
                                                    backgroundColor: `#e53935`
                                                }}
                                                size="small"
                                                label="Rejected"
                                            />
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary">
                                        {`${state.event?.budget} vnd | ${state.event?.maxParticipants} participants`}
                                    </Typography>
                                    <div>
                                        <Button
                                            disabled={
                                                isDetailLoading || isLoading
                                            }
                                            onClick={handleOnClickViewTemplate}
                                            className={css.viewTemplateButton}
                                            variant="outlined"
                                            size="small">
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
                                        item>
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item>
                                            <AssignmentIndOutlinedIcon />
                                        </Grid>
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary">
                                                Category (type)
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}>
                                                {state.event?.eventTypeId?.name}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item>
                                            <LanguageIcon />
                                        </Grid>
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary">
                                                Language
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}>
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
                                        item>
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item>
                                            <ErrorOutlineOutlinedIcon />
                                        </Grid>
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary">
                                                Mode
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}>
                                                {state.event?.mode}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            xs={1}
                                            container
                                            alignItems="center"
                                            justify="center"
                                            item>
                                            <TimelapseOutlinedIcon />
                                        </Grid>
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary">
                                                Accomodation
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}>
                                                {state.event?.accommodation}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Event Task List */}
                                <Grid className={css.mt48} container item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6">
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
                                                        expanded={
                                                            expanded ===
                                                            `task-panel${index}`
                                                        }
                                                        onChange={handleExpand(
                                                            `task-panel${index}`
                                                        )}>
                                                        <AccordionSummary
                                                            expandIcon={
                                                                <ExpandMoreIcon />
                                                            }
                                                            aria-controls={`task-panel${index}bh-content`}
                                                            id={`task-panel${index}bh-header`}>
                                                            <Typography
                                                                className={
                                                                    css.heading
                                                                }>
                                                                {task.name}
                                                            </Typography>
                                                            <Typography
                                                                className={
                                                                    css.secondaryHeading
                                                                }>
                                                                {
                                                                    task.userId
                                                                        ?.email
                                                                }
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails
                                                            className={
                                                                css.expandRoot
                                                            }>
                                                            <Grid
                                                                className={
                                                                    css.schedule
                                                                }
                                                                container>
                                                                <Grid
                                                                    xs
                                                                    container
                                                                    direction="column"
                                                                    justify="center"
                                                                    item>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="textSecondary"
                                                                        style={{
                                                                            fontWeight:
                                                                                'bold'
                                                                        }}>
                                                                        Type
                                                                    </Typography>
                                                                    <Typography variant="body2">
                                                                        {
                                                                            task.type
                                                                        }
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid
                                                                    xs
                                                                    container
                                                                    direction="column"
                                                                    item>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="textSecondary"
                                                                        style={{
                                                                            fontWeight:
                                                                                'bold'
                                                                        }}>
                                                                        From
                                                                    </Typography>
                                                                    <Typography variant="body2">
                                                                        {`${moment(
                                                                            task.startDate
                                                                        ).format(
                                                                            'LT'
                                                                        )}`}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid
                                                                    xs
                                                                    container
                                                                    direction="column"
                                                                    item>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="textSecondary"
                                                                        style={{
                                                                            fontWeight:
                                                                                'bold'
                                                                        }}>
                                                                        To
                                                                    </Typography>
                                                                    <Typography variant="body2">
                                                                        {`${moment(
                                                                            task.endDate
                                                                        ).format(
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

                                {/* Event Facility List */}
                                <Grid className={css.mt48} container item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6">
                                        Facilities
                                    </Typography>
                                    <div className={css.expandRoot}>
                                        {isDetailLoading ? (
                                            <>
                                                <Skeleton />
                                                <Skeleton />
                                            </>
                                        ) : (
                                            facilities?.map(
                                                (facility, index) => {
                                                    return (
                                                        <Accordion
                                                            key={index}
                                                            expanded={
                                                                expanded ===
                                                                `facility-panel${index}`
                                                            }
                                                            onChange={handleExpand(
                                                                `facility-panel${index}`
                                                            )}>
                                                            <AccordionSummary
                                                                expandIcon={
                                                                    <ExpandMoreIcon />
                                                                }
                                                                aria-controls={`facility-panel${index}bh-content`}
                                                                id={`facility-panel${index}bh-header`}>
                                                                <Typography>
                                                                    {
                                                                        facility
                                                                            .facilityId
                                                                            ?.name
                                                                    }
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails
                                                                className={
                                                                    css.expandRoot
                                                                }>
                                                                <Grid
                                                                    className={
                                                                        css.schedule
                                                                    }
                                                                    container>
                                                                    <Grid
                                                                        xs
                                                                        container
                                                                        direction="column"
                                                                        item>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{
                                                                                fontWeight:
                                                                                    'bold'
                                                                            }}>
                                                                            Borrow
                                                                            date
                                                                        </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(
                                                                                facility.borrowDate
                                                                            ).format(
                                                                                'DD MMM, YYYY'
                                                                            )}`}
                                                                        </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(
                                                                                facility.borrowDate
                                                                            ).format(
                                                                                'LT'
                                                                            )}`}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid
                                                                        xs
                                                                        container
                                                                        direction="column"
                                                                        item>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{
                                                                                fontWeight:
                                                                                    'bold'
                                                                            }}>
                                                                            Return
                                                                            date
                                                                        </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(
                                                                                facility.returnDate
                                                                            ).format(
                                                                                'DD MMM, YYYY'
                                                                            )}`}
                                                                        </Typography>
                                                                        <Typography variant="body2">
                                                                            {`${moment(
                                                                                facility.returnDate
                                                                            ).format(
                                                                                'LT'
                                                                            )}`}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    );
                                                }
                                            )
                                        )}
                                    </div>
                                </Grid>

                                {/* Event Description */}
                                <Grid className={css.mt48} item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6">
                                        Description
                                    </Typography>
                                    {/* <Typography variant="body2">
                                    {state.event?.description}
                                </Typography> */}
                                    <Editor
                                        editorState={editorState}
                                        readOnly={true}
                                    />
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
                                item>
                                {/* Date and time */}
                                <Grid item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6">
                                        Date and time
                                    </Typography>
                                    <Typography variant="body2">
                                        {moment(state.event?.startDate).format(
                                            'DD MMM'
                                        ) ===
                                        moment(state.event?.endDate).format(
                                            'DD MMM'
                                        )
                                            ? `${moment(
                                                  state.event?.startDate
                                              ).format('DD MMM, YYYY')}`
                                            : `${moment(
                                                  state.event?.startDate
                                              ).format('DD MMM')} - ${moment(
                                                  state.event?.endDate
                                              ).format('DD MMM')}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`${moment(
                                            state.event?.startDate
                                        ).format('LT')} - ${moment(
                                            state.event?.endDate
                                        ).format('LT')}`}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="primary">
                                        <Link
                                            to="/dashboard/creator/calendar"
                                            style={{ textDecoration: 'none' }}>
                                            View Calendar
                                        </Link>
                                    </Typography>
                                </Grid>

                                {/* Registration Close Date */}
                                <Grid className={css.mt36} item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6">
                                        Registration deadline
                                    </Typography>
                                    <Typography variant="body2">
                                        {`${moment(
                                            state.event?.registrationCloseDate
                                        ).format('DD MMM, YYYY')}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`${moment(
                                            state.event?.registrationCloseDate
                                        ).format('LT')}`}
                                    </Typography>
                                </Grid>

                                {/* Location */}
                                <Grid className={css.mt36} item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6">
                                        Location
                                    </Typography>
                                    <Typography variant="body2">
                                        {state.event?.location}
                                    </Typography>
                                </Grid>

                                {/* Tags */}
                                <Grid className={css.mt36} item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6">
                                        Tags
                                    </Typography>
                                    <div className={css.chipContainer}>
                                        {state.event?.tags?.map(
                                            (tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    size="small"
                                                    className={css.chip}
                                                />
                                            )
                                        )}
                                    </div>
                                </Grid>

                                {/* Reviewer */}
                                {state.event?.reviewerId?.email && (
                                    <Grid className={css.mt36} item>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            variant="h6">
                                            Reviewer
                                        </Typography>
                                        <Typography variant="body2">
                                            {state.event?.reviewerId?.email}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Participant Tabs */}
                <TabPanel value={tabs} index={1}>
                    <VerifyTable eventId={state.event?._id} tabs={tabs} />
                </TabPanel>

                {/* Participant Tabs */}
                <TabPanel value={tabs} index={2}>
                    <CheckInTable eventId={state.event?._id} tabs={tabs} />
                </TabPanel>

                {/* Send notification Tabs */}
                <TabPanel value={tabs} index={3}>
                    <NotificationHistory
                        eventCode={state.event?.urlCode}
                        eventId={state.event?._id}
                        eventName={state.event?.eventName}
                        tabs={tabs}
                    />
                </TabPanel>
            </Paper>

            {/* Event Delete Dialog */}
            <EventDeleteDialog
                openDeleteDialog={state.openDeleteDialog}
                handleToggleDialogDelete={handleToggleDialogDelete}
                handleDeleteEvent={handleDeleteEvent}
                isRecoveryMode={history.location.state.isRecycleMode}
            />

            {/* Event Checking Completed Dialog */}
            <EventCheckingCompletedDialog
                openCheckingCompletedDialog={state.openCheckingCompletedDialog}
                handleToggleDialogCheckingCompleted={
                    handleToggleDialogCheckingCompleted
                }
                handleUpdateEventStatus={handleUpdateEventStatus}
            />

            {/* Event Update Dialog */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={state.openUpdateDialog}
                onClose={handleToggleDialogUpdate}
                aria-labelledby="max-width-dialog-title">
                <CreateEvent
                    isUpdateMode={state.openUpdateDialog}
                    updateEventDetail={state.event}
                    updateFacilities={facilities}
                    updateTasks={tasks}
                    handleCloseUpdateDialog={handleToggleDialogUpdate}
                />
            </Dialog>

            {/* Event checking completed dialog */}

            {/* Notification */}
            <SystemNotification openUpdateSnackBar={state.openUpdateSnackBar} />
        </>
    );
};

export default EventDetail;

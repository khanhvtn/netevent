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
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import blankPhoto from '../../../images/blankPhoto.png';
import { Link, useHistory } from 'react-router-dom';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
    getFacilityAndTaskByEventCode,
    updateEventStatus,
} from '../../../actions/eventActions';
import { Skeleton } from '@material-ui/lab';
import SystemNotification from '../../Notification/Notification';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import ReviewEventDialog from '../EventDialog/ReviewEventDialog';
import useStyles from './styles';
import NotificationHistory from '../../EventManagement/EventDetail/NotificationHistory/NotificationHistory';
import AllParticipantTable from '../AllParticipantTable/AllParticipantTable';

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
    event: null,
    previousPath: null,
    openUpdateSnackBar: false,
    isUpdated: false,
    isDetailLoading: false,
    openReviewEventDialog: false,
};

const initialDeleteState = {
    eventId: null,
    taskListId: [],
    historyFacilityListId: [],
};

const EventReview = () => {
    const css = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [expanded, setExpanded] = useState(false);
    const [tabs, setTabs] = useState(0);

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
                description:
                    history.location?.state?.event?.description ||
                    newUpdateEventDetail?.description ||
                    '', // Fix later
            },
            previousPath: history.location.state?.from,
        }));
    }, []);

    // Get Facility and Task if state event existed
    useEffect(() => {
        if (state.event && !isDetailLoading) {
            dispatch(getFacilityAndTaskByEventCode(state.event.urlCode));
            setState((prevState) => ({
                ...prevState,
                isDetailLoading: !prevState.isDetailLoading,
            }));
        }
    }, [dispatch, state.event]);

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
        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: updateEventSuccess,
        }));
    }, [updateEventSuccess]);

    const handleChangeTabs = (event, newValue) => {
        setTabs(newValue);
    };

    // Handle expand of accordion
    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleOnClickViewTemplate = () => {
        return history.push({
            pathname: `/registration/${state.event.urlCode}`,
            state: {
                from: '/dashboard/reviewer/event-review',
                event: {
                    ...state.event,
                    taskListId: tasks,
                },
                isReviewed: true,
            },
        });
    };

    // Return to previous page with status
    const handleOnClickReturn = () => {
        setState(initialState);

        switch (state.previousPath) {
            case '/dashboard/reviewer/calendar':
                return history.push({
                    pathname: `${state.previousPath}`,
                    state: {
                        isUpdated: state.isUpdated,
                    },
                });
            case '/dashboard/reviewer/event-request':
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

    // Handle Update Event Status
    const handleUpdateEventStatus = (status, action) => {
        dispatch(
            updateEventStatus({
                eventId: state.event?._id,
                status: status,
                action: action,
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

    const handleToggleDialogReviewEvent = () => {
        setState((prevState) => ({
            ...prevState,
            openReviewEventDialog: !prevState.openReviewEventDialog,
        }));
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
                                <Typography
                                    className={css.toolbarEventDetail}
                                    variant="h6"
                                >
                                    Event Review
                                </Typography>
                                <div className={css.grow} />
                                {!state.event?.isFinished && (
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
                                                    handleToggleDialogReviewEvent
                                                }
                                            >
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
                        elevation={0}
                    >
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
                                        borderTopRightRadius: 3,
                                    },
                                }}
                            >
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
                                    label="Notification"
                                    {...a11yProps(2)}
                                />
                            </Tabs>
                        </Grid>
                    </AppBar>
                </div>

                {/* Event detail tabs */}
                <TabPanel value={tabs} index={0}>
                    {/* Event Detail */}
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                    >
                        {/* Event Header */}
                        <Grid item>
                            <Typography
                                className={css.eventDetailTitle}
                                variant="h3"
                            >
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
                                    backgroundImage: `url(${
                                        !state.event?.image
                                            ? blankPhoto
                                            : state.event?.image
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
                                    <Typography variant="h5">
                                        {state.event?.eventName}
                                        {state.event?.isApproved === null ? (
                                            <Chip
                                                className={css.chipStatus}
                                                style={{
                                                    backgroundColor: `#9e9e9e`,
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
                                                    backgroundColor: `#4caf50`,
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
                                                    backgroundColor: `#5c6bc0`,
                                                }}
                                                size="small"
                                                label="Approved"
                                            />
                                        ) : (
                                            <Chip
                                                className={css.chipStatus}
                                                style={{
                                                    backgroundColor: `#e53935`,
                                                }}
                                                size="small"
                                                label="Rejected"
                                            />
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                    >
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
                                            size="small"
                                        >
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
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item
                                        >
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                Category (type)
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}
                                            >
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
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item
                                        >
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                Language
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}
                                            >
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
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item
                                        >
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                Mode
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}
                                            >
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
                                        <Grid
                                            xs={5}
                                            container
                                            direction="column"
                                            item
                                        >
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                Accomodation
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                {state.event?.accommodation}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Event Task List */}
                                <Grid className={css.mt48} container item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6"
                                    >
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
                                                        )}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={
                                                                <ExpandMoreIcon />
                                                            }
                                                            aria-controls={`task-panel${index}bh-content`}
                                                            id={`task-panel${index}bh-header`}
                                                        >
                                                            <Typography
                                                                className={
                                                                    css.heading
                                                                }
                                                            >
                                                                {task.name}
                                                            </Typography>
                                                            <Typography
                                                                className={
                                                                    css.secondaryHeading
                                                                }
                                                            >
                                                                {
                                                                    task.userId
                                                                        ?.email
                                                                }
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails
                                                            className={
                                                                css.expandRoot
                                                            }
                                                        >
                                                            <Grid
                                                                className={
                                                                    css.schedule
                                                                }
                                                                container
                                                            >
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
                                                                        style={{
                                                                            fontWeight:
                                                                                'bold',
                                                                        }}
                                                                    >
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
                                                                    item
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="textSecondary"
                                                                        style={{
                                                                            fontWeight:
                                                                                'bold',
                                                                        }}
                                                                    >
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
                                                                    item
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="textSecondary"
                                                                        style={{
                                                                            fontWeight:
                                                                                'bold',
                                                                        }}
                                                                    >
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
                                        variant="h6"
                                    >
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
                                                            )}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={
                                                                    <ExpandMoreIcon />
                                                                }
                                                                aria-controls={`facility-panel${index}bh-content`}
                                                                id={`facility-panel${index}bh-header`}
                                                            >
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
                                                                }
                                                            >
                                                                <Grid
                                                                    className={
                                                                        css.schedule
                                                                    }
                                                                    container
                                                                >
                                                                    <Grid
                                                                        xs
                                                                        container
                                                                        direction="column"
                                                                        item
                                                                    >
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{
                                                                                fontWeight:
                                                                                    'bold',
                                                                            }}
                                                                        >
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
                                                                        item
                                                                    >
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="textSecondary"
                                                                            style={{
                                                                                fontWeight:
                                                                                    'bold',
                                                                            }}
                                                                        >
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
                                        variant="h6"
                                    >
                                        Description
                                    </Typography>
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
                                item
                            >
                                {/* Date and time */}
                                <Grid item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6"
                                    >
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
                                        color="primary"
                                    >
                                        <Link
                                            to="/dashboard/reviewer/calendar"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            View Calendar
                                        </Link>
                                    </Typography>
                                </Grid>

                                {/* Registration Close Date */}
                                <Grid className={css.mt36} item>
                                    <Typography
                                        style={{ fontWeight: 'bold' }}
                                        variant="h6"
                                    >
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
                                        variant="h6"
                                    >
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
                                        variant="h6"
                                    >
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
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Participant Tabs */}
                <TabPanel value={tabs} index={1}>
                    <AllParticipantTable
                        eventId={state.event?._id}
                        tabs={tabs}
                    />
                </TabPanel>

                {/* Participant Tabs */}
                <TabPanel value={tabs} index={2}>
                    <NotificationHistory
                        isReviewer={true}
                        eventCode={state.event?.urlCode}
                        eventId={state.event?._id}
                        eventName={state.event?.eventName}
                        tabs={tabs}
                    />
                </TabPanel>
            </Paper>

            <ReviewEventDialog
                handleToggleDialogReviewEvent={handleToggleDialogReviewEvent}
                openReviewEventDialog={state.openReviewEventDialog}
                handleUpdateEventStatus={handleUpdateEventStatus}
            />

            {/* Notification */}
            <SystemNotification openUpdateSnackBar={state.openUpdateSnackBar} />
        </>
    );
};

export default EventReview;

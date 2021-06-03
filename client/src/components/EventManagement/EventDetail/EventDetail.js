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
    CircularProgress,
    Chip
} from '@material-ui/core';
import useStyles from './styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import blankPhoto from '../../../images/blankPhoto.png';
import { useHistory } from 'react-router-dom';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EventDeleteDialog from '../EventDialog/EventDeleteDialog';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getFacilityAndTaskByEventName } from '../../../actions/eventActions';
import { Skeleton } from '@material-ui/lab';

const initialState = {
    openDeleteDialog: false,
}

const EventDetail = () => {
    const css = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [expanded, setExpanded] = useState(false);

    // Update new state when getting props from event-management page
    useEffect(() => {
        // Return the event-management page when there is no props passing
        if (!history.location.state) {
            history.push('/dashboard/event-management')
        }

        // Set state for the event
        setState((prevState) => ({
            ...prevState,
            event: history.location.state.event
        }));
    }, [])

    // Get Facility and Task if state event existed
    useEffect(() => {
        if (state.event) {
            dispatch(getFacilityAndTaskByEventName(state.event.eventName))
        }
    }, [state])

    const { facilities, tasks, isLoading } = useSelector((state) => ({
        facilities: state.event.eventDetail?.facilityHistoryListId,
        tasks: state.event.eventDetail?.taskListId,
        isLoading: state.event.isLoading
    }));

    // Handle expand of accordion
    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Return to event-management page with the current path
    const handleOnClickReturn = () => {
        history.push({
            pathname: '/dashboard/event-management',
            state: {
                from: '/dashboard/event-detail'
            }
        })
    }

    const handleToggleDialogDelete = () => {
        console.log(state.openDeleteDialog)
        setState((prevState) => ({
            ...prevState,
            openDeleteDialog: !prevState.openDeleteDialog,
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
                                <Typography className={css.toolbarEventDetail} variant="h6">
                                    Event Management
                                </Typography>
                                <div className={css.grow} />
                                <Tooltip title="Delete">
                                    <Button
                                        color="inherit"
                                        onClick={handleToggleDialogDelete}
                                    >
                                        Delete
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <Button
                                        color="inherit"
                                        variant="outlined"
                                        style={{ margin: '0 8px' }}
                                    >
                                        Update
                                    </Button>
                                </Tooltip>
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </div>

                {/* Event Detail */}
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                >
                    {/* Event Header */}
                    <Grid item>
                        <Typography style={{ fontWeight: 'bold', marginTop: 16 }} variant="h3">
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
                        style={{ margin: '20px 0' }}
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
                                    {state.event?.isApproved === null ?
                                        <Chip className={css.chipStatus} variant="outlined" size="small" label="Pending" />
                                        :
                                        state.event?.isFinished ?
                                            <Chip className={css.chipStatus} variant="outlined" size="small" label="Expired" disabled />
                                            :
                                            state.event?.isApproved ?
                                                <Chip className={css.chipStatus} variant="outlined" size="small" label="On-going" color="primary" />
                                                :
                                                <Chip className={css.chipStatus} variant="outlined" size="small" label="Rejected" color="secondary" />}
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
                                    <Grid xs={1} container alignItems="center" justify="center" item>
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
                                    <Grid xs={1} container alignItems="center" justify="center" item>
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
                                    <Grid xs={1} container alignItems="center" justify="center" item>
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
                                    <Grid xs={1} container alignItems="center" justify="center" item>
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
                                    {isLoading ?
                                        <>
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                        :
                                        tasks?.map((task, index) => {
                                            return (
                                                <Accordion key={index} expanded={expanded === 'panel1'} onChange={handleExpand('panel1')}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        <Typography className={css.heading}>{task.name}</Typography>
                                                        <Typography className={css.secondaryHeading}>{task.userId.email}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={css.expandRoot}>
                                                        <Grid className={css.schedule} container >
                                                            <Grid xs container direction="column" justify="center" item>
                                                                <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                                    Type
                                                            </Typography>
                                                                <Typography variant="body2">
                                                                    {task.type}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid xs container direction="column" item>
                                                                <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                                    From
                                                            </Typography>
                                                                <Typography variant="body2">
                                                                    {`${moment(task.startDate).format('LT')}`}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid xs container direction="column" item>
                                                                <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                                    To
                                                            </Typography>
                                                                <Typography variant="body2">
                                                                    {`${moment(task.endDate).format('LT')}`}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )
                                        })
                                    }
                                </div>
                            </Grid>

                            {/* Event Facility List */}
                            <Grid className={css.mt48} container item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Facilities
                                </Typography>
                                <div className={css.expandRoot}>
                                    {isLoading ?
                                        <>
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                        :
                                        facilities?.map((facility, index) => {
                                            return (
                                                <Accordion key={index} expanded={expanded === 'panel2'} onChange={handleExpand('panel2')}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2bh-content"
                                                        id="panel2bh-header"
                                                    >
                                                        <Typography >{facility.facilityId.name}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={css.expandRoot}>
                                                        <Grid className={css.schedule} container >
                                                            <Grid xs container direction="column" item>
                                                                <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                                    Borrow date
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    {`${moment(facility.borrowDate).format('DD MMM, YYYY')}`}
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    {`${moment(facility.borrowDate).format('LT')}`}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid xs container direction="column" item>
                                                                <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                                    Return date
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    {`${moment(facility.returnDate).format('DD MMM, YYYY')}`}
                                                                </Typography>
                                                                <Typography variant="body2" >
                                                                    {`${moment(facility.returnDate).format('LT')}`}

                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )
                                        })
                                    }
                                </div>
                            </Grid>


                            {/* Event Description */}
                            <Grid className={css.mt48} item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Description
                                </Typography>
                                <Typography variant="body2" >
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
                                    {
                                        moment(state.event?.startDate).format('DD MMM') === moment(state.event?.endDate).format('DD MMM')
                                            ?
                                            `${moment(state.event?.startDate).format('DD MMM, YYYY')}`
                                            :
                                            `${moment(state.event?.startDate).format('DD MMM')} - ${moment(state.event?.endDate).format('DD MMM')}`
                                    }
                                </Typography>
                                <Typography variant="body2">
                                    {`${moment(state.event?.startDate).format('LT')} - ${moment(state.event?.endDate).format('LT')}`}
                                </Typography>
                            </Grid>

                            {/* Registration Close Date */}
                            <Grid className={css.mt36} item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Registration deadline
                                </Typography>
                                <Typography variant="body2">
                                    {`${moment(state.event?.registrationCloseDate).format('DD MMM, YYYY')}`}
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
                                <Typography variant="body2">
                                    {state.event?.location}
                                </Typography>
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
            // handleDelete={handleDelete}
            />
        </>
    )
}

export default EventDetail;
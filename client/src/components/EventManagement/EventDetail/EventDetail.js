import React, { useState } from 'react';
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
    Button
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

const initialState = {
    eventName: 'Netcompany Presentation Event',
    budget: '1,000,000',
    maxParticipants: '20',
    location: '13 Le Thach, district 4, HCM City',
    tags: ['RMIT', 'Techonology', 'Netcompany'],
    registrationCloseDate: '',
    language: 'English',
    type: 'NetCompany',
    mode: 'On-going',
    accommodation: '1 day',
    image: 'https://source.unsplash.com/featured/?macbook',
    description: `Vừa phát triển mạng lưới tiếp thị kỹ thuật số của bạn trong lúc thưởng thức cocktail thủ công, đồ ăn vừa ngon lại còn có rút thăm may mắn xuyên đêm tại Hard Rock Cafe nằm ngay trung tâm Quận 1. Chương trình bắt đầu từ 18:00 chiều thứ Sáu ngày of 28 tháng 05! Đảm bảo rằng bạn đến đúng giờ nhé vì bạn sẽ được giảm giá 50% TẤT CẢ ly thức uống có từ 6 - 9 giờ chiều nữa đó!`,
    openDeleteDialog: false,
}

const EventDetail = () => {
    const css = useStyles();
    const history = useHistory();
    const [state, setState] = useState(initialState);
    const [expanded, setExpanded] = useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                                backgroundImage: `url(${!state.image ? blankPhoto : state.image
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
                                    {state.eventName}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {`${state.budget} vnd | ${state.maxParticipants} participants`}
                                </Typography>
                            </Grid>

                            {/* Event Language, Type, Mode, Accomodation */}
                            <Grid style={{ marginTop: 48 }} container item>
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
                                            {state.type}
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
                                            {state.language}
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
                                            {state.mode}
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
                                            {state.accommodation}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Event Task List */}
                            <Grid style={{ marginTop: 48 }} container item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Tasks
                                </Typography>
                                <div className={css.expandRoot}>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleExpand('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography className={css.heading}>Introduction</Typography>
                                            <Typography className={css.secondaryHeading}>lamdoan@gmail.com</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={css.expandRoot}>
                                            <Grid className={css.schedule} container >
                                                <Grid xs container direction="column" justify="center" item>
                                                    <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                        Type
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Presenter
                                                    </Typography>
                                                </Grid>
                                                <Grid xs container direction="column" item>
                                                    <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                        From
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        08:00 AM
                                                    </Typography>
                                                </Grid>
                                                <Grid xs container direction="column" item>
                                                    <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                        To
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        10:30 AM
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </Grid>

                            {/* Event Facility List */}
                            <Grid style={{ marginTop: 48 }} container item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Facilities
                                </Typography>
                                <div className={css.expandRoot}>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleExpand('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography className={css.heading}>Iphone X</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={css.expandRoot}>
                                            <Grid className={css.schedule} container >
                                                <Grid xs container direction="column" item>
                                                    <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                        Borrow date
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        09, March, 2014
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        08:00 AM
                                                    </Typography>
                                                </Grid>
                                                <Grid xs container direction="column" item>
                                                    <Typography variant="caption" color="textSecondary" style={{ fontWeight: 'bold' }}>
                                                        Return date
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        09, March, 2014
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        10:30 AM
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </Grid>


                            {/* Event Description */}
                            <Grid style={{ marginTop: 48 }} item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Description
                                </Typography>
                                <Typography variant="body2" >
                                    {state.description}
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
                                    09, March, 2014
                                </Typography>
                                <Typography variant="body2">
                                    6:00 PM – 9:00 PM
                                </Typography>
                            </Grid>

                            {/* Registration Close Date */}
                            <Grid style={{ marginTop: 36 }} item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Registration dealine
                                </Typography>
                                <Typography variant="body2">
                                    09, March, 2014
                                </Typography>
                                <Typography variant="body2">
                                    6:00 PM
                                </Typography>
                            </Grid>

                            {/* Location */}
                            <Grid style={{ marginTop: 36 }} item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Location
                                </Typography>
                                <Typography variant="body2">
                                    {state.location}
                                </Typography>
                            </Grid>

                            {/* Tags */}
                            <Grid style={{ marginTop: 36 }} item>
                                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                                    Tags
                                </Typography>
                                <Typography variant="body2">
                                    {state.tags.join(', ')}
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
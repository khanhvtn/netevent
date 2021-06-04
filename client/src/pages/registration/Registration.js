import React, { useEffect, useRef, useState } from 'react'
import useStyles from './styles'
import { Paper, Grid, Typography, Container, Button, CircularProgress } from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import moment from 'moment'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DatePicker,
} from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../actions/eventActions';
import { useParams, useHistory } from 'react-router';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Registration = () => {
    const css = useStyles();
    const [DOB, setDOB] = React.useState(new Date(Date.now()));
    const [graduationDate, setGraduationDate] = React.useState(new Date(Date.now()));
    const [existedEvent, setExistedEvent] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});
    const myRef = useRef(null)
    const eventName = useParams();
    const history = useHistory();
    const { event } = useSelector((state) => state)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch])

    useEffect(() => {
        if (event.loadComplete) {
            if (event.events.length !== 0) {
                for (var i = 0; i < event.events.data.data.length; i++) {
                    const name = event.events.data.data[i].eventName.replace(/\s/g, "");
                    existedEvent.push(name.toLowerCase())
                }


                if (!existedEvent.includes(eventName.eventName)) {
                    console.log(false)
                    history.push('/404')

                } else {
                    const filterEvent = event.events.data.data.filter((obj) => obj.eventName.replace(/\s/g, "").toLowerCase() === eventName.eventName);
                    setCurrentEvent(filterEvent[0]);
                    console.log(currentEvent)
                }
            }
            else {
                history.push('/404')

            }

        }

    }, [eventName])


    const handleDateChange = (date) => {
        setDOB(date);
    };

    const handleDateChange1 = (date) => {
        setGraduationDate(date);
    };

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: "smooth", block: "start" })

    return event.loadComplete === false ?

        <div className={css.circularProgress} align="center">
            <CircularProgress color="primary" />
        </div>
        : Object.keys(currentEvent).length === 0 ? <></> :(
            <div className={css.root}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper variant="outlined" className={css.paper} >
                            <img className={css.responsive} src={currentEvent.image} />
                            <div className={css.centered}>
                                <Paper variant="outlined" square elevation={3} className={css.paper1}>
                                    <Container fixed>
                                        <Typography className={css.typo1} variant="h5">{currentEvent.eventName}</Typography>
                                        <Typography className={css.typo2}>
                                            <EventIcon className={css.icon} />
                                            {moment(currentEvent.startDate).format("LLLL")} - {moment(currentEvent.endDate).format("LLLL")}</Typography>
                                        <Typography className={css.typo3} >
                                            <LocationOnIcon className={css.icon} />
                                            {currentEvent.location}</Typography>
                                        <Button className={css.typo4} color="primary" variant="contained" onClick={executeScroll}>Register Now</Button>
                                    </Container>
                                </Paper>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={8}>

                        <Container fixed className={css.body}>
                            <Typography className={css.eventName}>
                                About {currentEvent.eventName}
                            </Typography>
                            <Typography className={css.eventDescription}>
                                {currentEvent.description}
                            </Typography>
                            <Typography className={css.eventLanguage}>
                                Language: {currentEvent.language}
                            </Typography>
                            <Typography className={css.eventType}>
                                Event Type: {currentEvent.type}
                            </Typography>
                            <Typography className={css.eventMode}>
                                Mode: {currentEvent.mode}
                            </Typography>
                            <Typography className={css.eventLocation}>
                                Location: {currentEvent.location}
                            </Typography>

                            <Typography className={css.eventRegistrationCloseDate}>
                                Registration Closed Date: {moment(currentEvent.registrationCloseDate).format("LLLL")}
                            </Typography>

                            <Typography className={css.eventAccommodation}>
                                Accomomodation: {currentEvent.accommodation}
                            </Typography>

                            <Typography className={css.eventActivities}>
                                Activities
                        </Typography>

                            <TableContainer >
                                <Table className={css.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={css.tableText}>Tasks</TableCell>
                                            <TableCell className={css.tableText} align="left">Start Time</TableCell>
                                            <TableCell className={css.tableText} align="left">End Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(currentEvent.taskListId).length > 0 && currentEvent.taskListId.map((task) => (
                                            <TableRow key={task._id}>
                                                <TableCell className={css.tableText} component="th" scope="row">
                                                    {task.name}
                                                </TableCell>
                                                <TableCell className={css.tableText} align="left">{moment(task.startDate).format("LLLL")}</TableCell>
                                                <TableCell className={css.tableText} align="left">{moment(task.endDate).format("LLLL")}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                            


                            <Typography className={css.eventTags}>
                                Tags
                        </Typography>
                            <div className={css.chipContainer}>

                                {currentEvent.tags.map((tag) => (
                                    <Chip label={tag} size="medium" className={css.chip} />
                                ))}




                            </div>

                            <Typography className={css.form} id="registrationForm">
                                Registration Form
                        </Typography>

                            <FormControl fullWidth ref={myRef}>
                                <TextField label="Full Name" variant="outlined" required fullWidth className={css.textField}></TextField>
                                <TextField label="Email" type="email" variant="outlined" required fullWidth className={css.textField}></TextField>
                                <TextField label="School" variant="outlined" required fullWidth className={css.textField}></TextField>
                                <TextField label="Academic" variant="outlined" required fullWidth className={css.textField}></TextField>
                                <TextField label="Major" variant="outlined" required fullWidth className={css.textField}></TextField>
                                <TextField label="Phone" type="number" variant="outlined" required fullWidth className={css.textField}></TextField>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="outlined"
                                        format="MM//dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date of Birth"
                                        value={DOB}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="outlined"
                                        format="MM//dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Expected Graduation Date"
                                        value={graduationDate}
                                        onChange={handleDateChange1}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                                <Button className={css.registerButton} color="primary" variant="contained">Register Now</Button>

                            </FormControl>
                        </Container>

                    </Grid>
                </Grid>
            </div>
        )
}

export default Registration;

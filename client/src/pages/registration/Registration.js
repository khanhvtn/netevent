import React, { useEffect, useRef, useState, useCallback } from 'react'
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
import { registerParticipant } from '../../actions/participantActions';
import { useParams, useHistory } from 'react-router';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import parse from 'html-react-parser'
import SystemNotification from '../../components/Notification/Notification';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { ERROR, ERROR_CLEAR } from '../../constants';



const participantInitialState = {
    "event": '',
    "email": '',
    "name": '',
    "academic": '',
    "school": '',
    "major": '',
    "phone": '',
    "DOB": '',
    "expectedGraduateDate": ''

}

const Registration = () => {
    const css = useStyles();
    const [DOB, setDOB] = React.useState(new Date(Date.now()));
    const [graduationDate, setGraduationDate] = React.useState(new Date(Date.now()));
    const [existedEvent, setExistedEvent] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});
    const [participant, setParticipant] = useState(participantInitialState);
    const myRef = useRef(null)
    const eventName = useParams();
    const history = useHistory();
    const { event, error } = useSelector((state) => state)
    const participantStore = useSelector((state) => state)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch])

    useEffect(() => {
        if (event.loadComplete) {
            if (event.events.length !== 0) {
                for (var i = 0; i < event.events.data.data.length; i++) {
                    const name = event.events.data.data[i].eventName.replace(/\s/g, "-");
                    existedEvent.push(name.toLowerCase())
                }

                if (!existedEvent.includes(eventName.eventName)) {
                    history.push('/404')

                } else {
                    const filterEvent = event.events.data.data.filter((obj) => obj.eventName.replace(/\s/g, "-").toLowerCase() === eventName.eventName);
                    if (filterEvent[0] !== undefined) {
                        setCurrentEvent(filterEvent[0]);
                        setParticipant({ ...participant, event: currentEvent._id })
                    } else {
                        history.push('/404')
                    }
                }
            }
            else {
                history.push('/404')
            }
        }
    }, [eventName])

        // handle clear all fields
  const handleClearField = useCallback(
    (action) => {
        setParticipant(participantInitialState)

      //clear all error
      if (action) {
        dispatch({
          type: ERROR_CLEAR,
          payload: null,
        });
      }
    },
    [dispatch]
  );


    useEffect(() => {
        if(participantStore.participant.complete){
            handleClearField();
        }
    },[dispatch, participantStore.participant.complete ,handleClearField])

 

    const handleDateChange = (date) => {
        setDOB(date);
        setParticipant({ ...participant, DOB: DOB })
    };

    const handleDateChange1 = (date) => {
        setGraduationDate(date);
        setParticipant({ ...participant, expectedGraduateDate: graduationDate })

    };

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: "smooth", block: "start" })

    const handleOnRegister = (e) => {
        e.preventDefault()
        dispatch(registerParticipant(participant))
       
    }

   

    return event.loadComplete === false ?

        <div className={css.circularProgress} align="center">
            <CircularProgress color="primary" />
        </div>
        : Object.keys(currentEvent).length === 0 ? <></> : (
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
                                {parse(stateToHTML(convertFromRaw(JSON.parse(currentEvent.description))))}
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

                            {participantStore.participant.isLoading === false ?
                                <FormControl fullWidth ref={myRef}>
                                    <TextField label="Full Name" variant="outlined" value={participant.name} onChange={(e) => setParticipant({ ...participant, name: e.target.value })} required fullWidth className={css.textField}></TextField>
                                    {error.errors !== null ? error.errors.name && <Typography className={css.errorStyle}>{error.errors.name}</Typography> : <></>}

                                    <TextField label="Email" type="email" variant="outlined" value={participant.email} onChange={(e) => setParticipant({ ...participant, email: e.target.value })} required fullWidth className={css.textField}></TextField>
                                    {error.errors !== null ? error.errors.email && <Typography className={css.errorStyle}>{error.errors.email}</Typography> : <></>}

                                    <TextField label="University" variant="outlined" value={participant.school} onChange={(e) => setParticipant({ ...participant, school: e.target.value })} required fullWidth className={css.textField}></TextField>
                                    {error.errors !== null ? error.errors.school && <Typography className={css.errorStyle}>{error.errors.school}</Typography> : <></>}

                                    <FormControl className={css.textField}>
                                        <InputLabel id="demo-simple-select-outlined-label1" className={css.academicField}>Academic *</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-outlined-label1"
                                            id="demo-simple-select-outlined"
                                            variant="outlined"
                                            value={participant.academic}
                                            onChange={participant.academic} onChange={(e) => setParticipant({ ...participant, academic: e.target.value })}
                                            label="Academic"
                                        >

                                            <MenuItem value="Bachelor">
                                                <em>Bachelor</em>
                                            </MenuItem>

                                            <MenuItem value="Master">
                                                <em>Master</em>
                                            </MenuItem>

                                            <MenuItem value="Phd">
                                                <em>Phd</em>
                                            </MenuItem>

                                        </Select>
                                        {error.errors !== null ? error.errors.academic && <Typography className={css.errorStyle}>{error.errors.academic}</Typography> : <></>}
                                    </FormControl>


                                    <TextField label="Major" variant="outlined" value={participant.major} onChange={(e) => setParticipant({ ...participant, major: e.target.value })} required fullWidth className={css.textField}></TextField>
                                    {error.errors !== null ? error.errors.major && <Typography className={css.errorStyle}>{error.errors.major}</Typography> : <></>}

                                    <TextField label="Phone" type="number" variant="outlined" value={participant.phone} onChange={(e) => setParticipant({ ...participant, phone: e.target.value })} required fullWidth className={css.textField}></TextField>
                                    {error.errors !== null ? error.errors.phone && <Typography className={css.errorStyle}>{error.errors.phone}</Typography> : <></>}

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            variant="outlined"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date of Birth"
                                            value={DOB}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        {error.errors !== null ? error.errors.DOB && <Typography className={css.errorStyle}>{error.errors.DOB}</Typography> : <></>}


                                        <KeyboardDatePicker
                                            variant="outlined"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Expected Graduation Date"
                                            value={graduationDate}
                                            onChange={handleDateChange1}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        {error.errors !== null
                                            ? error.errors.expectedGraduateDate
                                            &&
                                            <Typography className={css.errorStyle}>
                                                {error.errors.expectedGraduateDate}
                                            </Typography> : <></>
                                        }
                                    </MuiPickersUtilsProvider>
                                    <Button
                                        className={css.registerButton}
                                        color="primary"
                                        variant="contained"
                                        onClick={handleOnRegister}>Register Now</Button>
                                </FormControl>

                                :

                                <FormControl fullWidth ref={myRef}>
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        value={participant.name}
                                        onChange={(e) => setParticipant({ ...participant, name: e.target.value })}
                                        required
                                        fullWidth
                                        className={css.textField}>
                                    </TextField>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        value={participant.email}
                                        onChange={(e) => setParticipant({ ...participant, email: e.target.value })}
                                        required
                                        fullWidth
                                        className={css.textField}></TextField>
                                    <TextField
                                        label="University"
                                        variant="outlined"
                                        value={participant.school}
                                        onChange={(e) => setParticipant({ ...participant, school: e.target.value })}
                                        required
                                        fullWidth
                                        className={css.textField}>
                                    </TextField>
                                    <FormControl className={css.textField}>
                                        <InputLabel id="demo-simple-select-outlined-label1" className={css.academicField}>Academic *</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-outlined-label1"
                                            id="demo-simple-select-outlined"
                                            variant="outlined"
                                            value={participant.academic}
                                            onChange={participant.academic} onChange={(e) => setParticipant({ ...participant, academic: e.target.value })}
                                            label="Academic"
                                        >

                                            <MenuItem value="Bachelor">
                                                <em>Bachelor</em>
                                            </MenuItem>

                                            <MenuItem value="Master">
                                                <em>Master</em>
                                            </MenuItem>

                                            <MenuItem value="Phd">
                                                <em>Phd</em>
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Major"
                                        variant="outlined"
                                        value={participant.major}
                                        onChange={(e) => setParticipant({ ...participant, major: e.target.value })}
                                        required
                                        fullWidth
                                        className={css.textField}>
                                    </TextField>
                                    <TextField
                                        label="Phone"
                                        type="number"

                                        variant="outlined"
                                        value={participant.phone}
                                        onChange={(e) => setParticipant({ ...participant, phone: e.target.value })}
                                        required
                                        fullWidth
                                        className={css.textField}>
                                    </TextField>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            variant="outlined"
                                            format="MM/dd/yyyy"
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
                                            variant="outlined"
                                            format="MM/dd/yyyy"
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
                                    <Button className={css.registerButton} color="primary" variant="contained" onClick={handleOnRegister}>
                                        <CircularProgress color="primary" />
                                    </Button>
                                </FormControl>
                            }
                            <SystemNotification openRegisterParticipantSnackBar={participantStore.participant.complete} />
                        </Container>
                    </Grid>
                </Grid>
            </div>
        )
}

export default Registration;

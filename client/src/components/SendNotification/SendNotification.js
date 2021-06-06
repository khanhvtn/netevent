import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import RichTextEditor from './RichTextEditor/RichTextEditor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents, sendNotification } from '../../actions/eventActions'
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import SystemNotification from '../Notification/Notification';
import parse from 'html-react-parser'

const initialState = {
    eventID: '',
    title: '',
    description: ''
}

const SendNotification = () => {
    const css = useStyles();
    const [state, setState] = useState(initialState)
    const dispatch = useDispatch();
    const { event, error } = useSelector(state => state)
    const [errorEvent, setErrorEvent] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);


    useEffect(() => {
        dispatch(fetchEvents())
        console.log(event.events)
        console.log(error.errors)
    }, [dispatch])

    useEffect(() => {
        if (event.isSendingNotification === true) {
            handleClearField();
        }
    })

    const handleClearField = () => {
        setState(initialState)
    }

    const handleSend = (e) => {
        e.preventDefault()
        const descriptionText = JSON.parse(state.description)
        if (state.eventID === "") {
            setErrorEvent(true)
        }

        else if (state.title === "") {
            setErrorTitle(true)
            setErrorEvent(false)
        }

        else if (descriptionText.blocks[0].text === "") {
            setErrorTitle(false)
            setErrorEvent(false)
            setErrorDescription(true)
        }

        else {
            const data = convertFromRaw(JSON.parse(state.description))
            const html = stateToHTML(data)
            const notificationBody = {
                eventID: state.eventID,
                title: state.title,
                description: html
            }

            dispatch(sendNotification(notificationBody))
            setErrorTitle(false)
            setErrorEvent(false)
            setErrorDescription(false)
        }
    }



    return event.events.data == null ?
        <Paper className={css.paper} color="inherit">
            <div className={css.contentWrapper} align="center">
                <CircularProgress color="primary" />
            </div> </Paper>
        : (
            event.isSendingNotification === false ?
                <div className={css.grow}>
                    <Paper className={css.paper} color="inherit">
                        <div className={css.grow}>
                            <FormControl className={css.formControl} variant="outlined" fullWidth>
                                <Grid container spacing={2} direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start">
                                    <Grid item xs={6} md={6} lg={6}>
                                        <InputLabel id="demo-simple-select-outlined-label">Select Event</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={state.eventID}
                                            onChange={(e) => setState({ ...state, eventID: e.target.value })}
                                            label="Select Event"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {event.events.data.data.map((event) => (
                                                <MenuItem value={event._id}>
                                                    {event.eventName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {error.errors !== null && <Typography className={css.errorStyle}>This event does not have any participants</Typography>}
                                        {errorEvent === true && <Typography className={css.errorStyle}>Event must be selected</Typography>}
                                    </Grid>

                                    <Grid item xs={6} md={6} lg={6} >
                                        <TextField id="filled-basic" label="Title" value={state.title} fullWidth
                                            onChange={(e) => setState({ ...state, title: e.target.value })} />
                                        {errorTitle === true && <Typography className={css.errorStyle}>Title must not be empty</Typography>}
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} direction="row" justify="flex-start" className={css.notificationDescription}
                                    alignItems="flex-start">
                                    <Grid item xs={12} md={12} lg={12} align="left">
                                        <Typography align="left">
                                            Description
                                </Typography>
                                        <RichTextEditor
                                            disabled={false}
                                            setState={setState} />
                                        {errorDescription === true && <Typography className={css.errorStyle}>Description must not be empty</Typography>}
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} direction="row" justify="start-end" alignItems="start-end" className={css.buttonSend}>
                                    <Grid item xs={12} md={12} lg={12} align="right">
                                        <Button variant="contained" color="primary" className={css.buttonSend1} onClick={handleSend}>
                                            Send
                                </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </div>
                    </Paper>
                    {/* Notification */}
                    <SystemNotification openSendSnackBar={event.sendNotiSuccess} />
                </div>

                : (
                    <div className={css.grow}>
                        <Paper className={css.paper} color="inherit">
                            <div className={css.grow}>
                                <FormControl className={css.formControl} variant="outlined" fullWidth>
                                    <Grid container spacing={2} direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start">
                                        <Grid item xs={6} md={6} lg={6}>
                                            <InputLabel id="demo-simple-select-outlined-label">Select Event</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={state.eventID}
                                                onChange={(e) => setState({ ...state, eventID: e.target.value })}
                                                label="Select Event"
                                                disabled
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {event.events.data.data.map((event) => (
                                                    <MenuItem value={event._id}>{event.eventName}</MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>

                                        <Grid item xs={6} md={6} lg={6} >
                                            <TextField id="filled-basic" label="Title" value={state.title} fullWidth
                                                onChange={(e) => setState({ ...state, title: e.target.value })} disabled />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justify="flex-start" className={css.notificationDescription}
                                        alignItems="flex-start">
                                        <Grid item xs={12} md={12} lg={12} align="left">
                                            <Typography align="left">
                                                Description
                                        </Typography>
                                            <RichTextEditor
                                                key={event.createSuccess}
                                                disabled={true}
                                                setState={setState}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justify="start-end" alignItems="start-end" className={css.buttonSend}>
                                        <Grid item xs={12} md={12} lg={12} align="right">
                                            <Button disabled variant="contained" color="primary" className={css.buttonSend1} onClick={handleSend}>
                                                <CircularProgress color="primary" />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </div>
                        </Paper>
                    </div>
                )
        )
}

export default SendNotification;

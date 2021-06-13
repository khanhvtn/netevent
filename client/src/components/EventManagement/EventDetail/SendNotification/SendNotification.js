import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import RichTextEditor from './RichTextEditor/RichTextEditor';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, sendNotification } from '../../../../actions/eventActions';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import SystemNotification from '../../../Notification/Notification';

const initialState = {
    title: '',
    description: '',
};

const SendNotification = ({ eventId, eventName, onClose }) => {
    const css = useStyles();
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const { event, error } = useSelector((state) => state);
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    useEffect(() => {
        if (event.sendNotiSuccess) {
            handleClearField();
            onClose();
        }
    });

    const handleClearField = () => {
        setState(initialState);
    };

    const handleSend = (e) => {
        e.preventDefault();
        const descriptionText = JSON.parse(state.description);
        if (state.title === '') {
            setErrorTitle(true);
        } else if (descriptionText.blocks[0].text === '') {
            setErrorTitle(false);
            setErrorDescription(true);
        } else {
            const data = convertFromRaw(JSON.parse(state.description));
            const html = stateToHTML(data);
            const notificationBody = {
                eventId: eventId,
                title: state.title,
                description: html,
            };

            dispatch(sendNotification(notificationBody));
            setErrorTitle(false);
            setErrorDescription(false);
        }
    };

    return eventId === null ? (
        <Paper className={css.paper} color="inherit">
            <div className={css.contentWrapper} align="center">
                <CircularProgress color="primary" />
            </div>
        </Paper>
    ) :
        <div className={css.grow}>
            <Paper className={css.paper} color="inherit">
                <div className={css.grow}>
                    <div className={css.sendNotiTitle}>
                        <Typography style={{ fontWeight: 'bold' }} align="center" variant="h4">Notification Email</Typography>
                    </div>
                    <FormControl
                        className={css.formControl}
                        variant="outlined"
                        fullWidth
                    >
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    disabled={true}
                                    style={{ backgroundColor: 'white', marginTop: 16 }}
                                    variant="outlined"
                                    id="filled-basic"
                                    label="Event Name"
                                    value={eventName}
                                    fullWidth
                                />

                                {error.errors !== null && (
                                    <Typography className={css.errorStyle}>
                                        This event does not have any participants
                                    </Typography>
                                )}

                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    disabled={event.isSendingNotification}
                                    style={{ backgroundColor: 'white' }}
                                    variant="outlined"
                                    id="filled-basic"
                                    label="Title"
                                    value={state.title}
                                    fullWidth
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                {errorTitle === true && (
                                    <Typography className={css.errorStyle}>
                                        Title must not be empty
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            className={css.notificationDescription}
                            alignItems="flex-start"
                        >
                            <Grid item xs={12} md={12} lg={12} align="left">
                                <Typography align="left">
                                    Description
                                </Typography>
                                <RichTextEditor
                                    key={event.sendNotiSuccess}
                                    disabled={event.isSendingNotification}
                                    setState={setState}
                                />
                                {errorDescription === true && (
                                    <Typography className={css.errorStyle}>
                                        Description must not be empty
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} direction="row" justify="start-end" alignItems="start-end" className={css.buttonSend}>
                            <Grid className={css.dialogAction} item xs={12} md={12} lg={12} align="right">
                                <Button
                                    disabled={event.isSendingNotification}
                                    className={css.buttonCancel}
                                    onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    disabled={event.isSendingNotification}
                                    variant="contained"
                                    color="primary"
                                    className={css.buttonSend}
                                    onClick={handleSend}>
                                    {event.isSendingNotification ?
                                        <CircularProgress
                                            size={26}
                                            color="inherit"
                                        />
                                        :
                                        'Send Email'
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </div>
            </Paper>
        </div >
};

export default SendNotification;

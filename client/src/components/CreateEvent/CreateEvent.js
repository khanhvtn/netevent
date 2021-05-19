import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    CardMedia,
    Paper,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slide,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
} from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import blankPhoto from '../../images/blankPhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import { getEventTypes, createEventType } from '../../actions/eventTypeActions';

//import useStyles in the last
import useStyles from './styles';
import SystemNotification from '../Notification/Notification';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
    //create new event
    tags: [],
    eventName: '',
    eventTypeId: '',
    language: '',
    mode: '',
    location: '',
    accommodation: '',
    registrationCloseDate: null,
    startDate: null,
    endDate: null,
    maxParticipants: '',
    description: '',
    budget: '',
    image: '',
    // create event type
    openDialogCreateEventType: false,
    eventTypeTarget: '',
    openCreateSnackBar: false,
};

const filter = createFilterOptions();
const CreateEvent = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const {
        eventTypes,
        errors,
        eventTypeIsLoading,
        createSuccess,
    } = useSelector((state) => ({
        eventTypes: state.eventType.eventTypes,
        errors: state.error.errors,
        eventTypeIsLoading: state.eventType.isLoading,
        createSuccess: state.eventType.createSuccess,
    }));
    const [state, setState] = useState(initialState);
    //useEffect get status create event type
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            openCreateSnackBar: createSuccess,
            openDialogCreateEventType: false,
        }));
        if (createSuccess) {
            dispatch(getEventTypes());
        }
    }, [dispatch, createSuccess]);

    //useEffect to get all event type
    useEffect(() => {
        dispatch(getEventTypes());
    }, [dispatch]);
    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleCreateEventType = () => {
        dispatch(createEventType({ name: state.eventTypeTarget }));
    };
    const handleToggleDialogCreateEventType = () => {
        setState((prevState) => ({
            ...prevState,
            openDialogCreateEventType: !prevState.openDialogCreateEventType,
        }));
    };
    const handleCreateEvent = () => {
        console.log(state);
    };
    return (
        <div>
            <Paper style={{ margin: '20px', padding: '20px 20px' }}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                >
                    <Grid item>
                        <Typography variant="h3">Create An Event</Typography>
                    </Grid>
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
                        <CardMedia
                            image={blankPhoto}
                            style={{
                                height: '500px',
                                width: '100%',
                            }}
                            title="Event image"
                        />
                    </Grid>

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
                        <Button startIcon={<AddAPhoto />} variant="contained">
                            Choose Image
                        </Button>
                    </Grid>

                    <Grid
                        container
                        item
                        md={12}
                        lg={12}
                        xl={12}
                        sm={12}
                        xs={12}
                        spacing={3}
                        style={{ margin: '20px 0' }}
                    >
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="Event Name"
                                name="eventName"
                                value={state.eventName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Budget"
                                name="budget"
                                value={state.budget}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="select-label-language">
                                    Language
                                </InputLabel>
                                <Select
                                    labelId="select-label-language"
                                    id="select-language"
                                    name="language"
                                    value={state.language}
                                    onChange={handleChange}
                                    label="Language"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Vietnamese'}>
                                        Vietnamese
                                    </MenuItem>
                                    <MenuItem value={'English'}>
                                        English
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <Autocomplete
                                value={state.eventTypeTarget}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        // timeout to avoid instant validation of the dialog's form.
                                        setTimeout(() => {
                                            setState((prevState) => ({
                                                ...prevState,
                                                openDialogCreateEventType: !prevState.openDialogCreateEventType,
                                                eventTypeTarget: newValue,
                                            }));
                                        });
                                    } else if (
                                        newValue &&
                                        newValue.inputValue
                                    ) {
                                        setState((prevState) => ({
                                            ...prevState,
                                            openDialogCreateEventType: !prevState.openDialogCreateEventType,
                                            eventTypeTarget:
                                                newValue.inputValue,
                                        }));
                                    } else {
                                        setState((prevState) => ({
                                            ...prevState,
                                            eventTypeTarget: newValue.name,
                                        }));
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            name: `Add "${params.inputValue}"`,
                                        });
                                    }

                                    return filtered;
                                }}
                                id="free-solo-dialog-demo"
                                options={eventTypes}
                                getOptionLabel={(option) => {
                                    // e.g value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    return option.name;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                renderOption={(option) => option.name}
                                fullWidth
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Event Type"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid
                            container
                            justify="flex-end"
                            alignItems="center"
                            item
                            md={12}
                            lg={12}
                            xl={12}
                            sm={12}
                            xs={12}
                            spacing={1}
                        >
                            <Grid item>
                                <Button variant="contained" color="default">
                                    Close
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleCreateEvent}
                                    variant="contained"
                                    color="primary"
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            {/* Create Event Type Dialog */}
            <Dialog
                TransitionComponent={Transition}
                maxWidth="sm"
                open={state.openDialogCreateEventType}
                onClose={(e) => handleToggleDialogCreateEventType(e)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Create New Event Type
                </DialogTitle>
                <DialogContent>
                    <TextField
                        className={css.textField}
                        helperText={errors?.name ? errors?.name : ''}
                        error={errors?.name ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="name"
                        value={state.eventTypeTarget}
                        name="eventTypeTarget"
                        label="Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={eventTypeIsLoading ? true : false}
                        variant="contained"
                        onClick={handleToggleDialogCreateEventType}
                        color="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateEventType}
                        color="primary"
                    >
                        {eventTypeIsLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : (
                            'Create'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Notification */}
            <SystemNotification openCreateSnackBar={state.openCreateSnackBar} />
        </div>
    );
};

export default CreateEvent;

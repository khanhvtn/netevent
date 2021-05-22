import React, { useState, useEffect, useRef } from 'react';

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
    Chip,
    FormHelperText,
    CircularProgress,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { AddAPhoto, DeleteForever } from '@material-ui/icons';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import blankPhoto from '../../images/blankPhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllEventTypes,
    createEventType,
} from '../../actions/eventTypeActions';

import { getAllFacilities } from '../../actions/facilityActions';
import { getAllUsers } from '../../actions/userActions';
import { createEvent } from '../../actions/eventActions';
import SystemNotification from '../Notification/Notification';
import DataTable from '../DataTable/DataTable';
import CreateEventTypeDialog from './CreateEventTypeDialog/CreateEventTypeDialog';
import BorrowFacilityDialog from './BorrowFacilityDialog/BorrowFailityDialog';
import { ERROR, ERROR_CLEAR } from '../../constants';

import { convertBase64 } from '../../utils';
//import useStyles in the last
import useStyles from './styles';
import TaskDialog from './TaskDialog/TaskDialog';
import RichTextEditor from './RichTextEditor/RichTextEditor';

let tagList = [];
const defaultContent = `{"blocks":[{"key":"ejhoe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;
const initialState = {
    //create new event
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
    description: defaultContent,
    budget: '',
    image: null,
    tasks: [],
    borrowFacilities: [],
    // create event type
    openDialogCreateEventType: false,
    eventTypeTarget: '',
    openCreateSnackBar: false,
};
const initialBorrowFacilityState = {
    //facility taborrowFacilityState.
    borrowFacilities: [],
    borrowFacilityLoading: false,
    borrowFacilityCreatSucces: false,
    borrowFacilityUpdateSucces: false,
    borrowFacilityDeleteSucces: false,
    isBorrowFacilityCreateMode: true,
    name: '',
    borrowDate: null,
    returnDate: null,
    openCreateAndUpdateDialogBorrowFacility: false,
    openDeleteDialogBorrowFacility: false,
};

const initialTaskState = {
    tasks: [],
    isLoading: false,
    taskCreatSucces: false,
    taskDeleteSucces: false,
    taskUpdateSucces: false,
    name: '',
    email: '',
    type: '',
    startTime: null,
    endTime: null,
    openCreateAndUpdateDialogTask: false,
    openDeleteDialogTask: false,
    isTaskCreateMode: true,
};

const filter = createFilterOptions();
const CreateEvent = () => {
    const css = useStyles();
    const fileInput = useRef(null);
    const dispatch = useDispatch();
    const {
        eventTypes,
        errors,
        eventTypeIsLoading,
        createEventTypeSuccess,
        createEventSuccess,
        facilities,
        user,
        users,
        eventIsLoading,
    } = useSelector((state) => ({
        users: state.user.users,
        user: state.user.user,
        eventTypes: state.eventType.eventTypes,
        errors: state.error.errors,
        eventTypeIsLoading: state.eventType.isLoading,
        eventIsLoading: state.event.isLoading,
        createEventTypeSuccess: state.eventType.createSuccess,
        createEventSuccess: state.event.createSuccess,
        facilities: state.facility.facilities,
    }));
    const [state, setState] = useState(initialState);
    //borrow facility table
    const [selectedFacility, setSelectedFacility] = useState([]);
    const [borrowFacilityState, setBorrowFacilityState] = useState(
        initialBorrowFacilityState
    );

    //task table
    const [selectedTask, setSelectedTask] = useState([]);
    const [taskState, setTaskState] = useState(initialTaskState);

    //useEffect for create event success
    useEffect(() => {
        if (createEventSuccess) {
            handleClearFields();
        }
        setState((prevState) => ({
            ...prevState,
            openCreateSnackBar: createEventSuccess,
        }));
    }, [dispatch, createEventSuccess]);

    //useEffect get status create event type
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            openCreateSnackBar: createEventTypeSuccess,
            openDialogCreateEventType: false,
        }));
        if (createEventTypeSuccess) {
            dispatch(getAllEventTypes());
        }
    }, [dispatch, createEventTypeSuccess]);

    //useEffect to get all event type
    useEffect(() => {
        dispatch(getAllEventTypes());
        dispatch(getAllFacilities());
        dispatch(getAllUsers());
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
        const {
            eventName,
            language,
            mode,
            location,
            accommodation,
            registrationCloseDate,
            startDate,
            endDate,
            maxParticipants,
            description,
            budget,
            image,
            eventTypeTarget,
        } = state;
        //generate valid data to send request to the server
        const templateRequest = {
            eventName,
            language,
            eventTypeId: eventTypeTarget
                ? eventTypes.find(
                      (eventType) => eventType.name === eventTypeTarget
                  )._id
                : '',
            mode,
            location,
            accommodation,
            registrationCloseDate,
            startDate,
            endDate,
            maxParticipants,
            tags: tagList,
            description: JSON.parse(description).blocks[0].text
                ? description
                : '',
            ownerId: user.id,
            budget,
            image,
            tasks: taskState.tasks.map((task) => {
                const {
                    name,
                    email,
                    type,
                    startTime: startDate,
                    endTime: endDate,
                } = task;

                const { _id: userId } = users.find(
                    (user) => user.email === email
                );
                return {
                    name,
                    userId,
                    type,
                    startDate,
                    endDate,
                };
            }),
            borrowFacilities: borrowFacilityState.borrowFacilities.map(
                (borrowFacility) => {
                    const { borrowDate, returnDate, name } = borrowFacility;
                    const targetFacility = facilities.find(
                        (facility) => facility.name === name
                    );
                    return {
                        facilityId: targetFacility._id,
                        borrowDate,
                        returnDate,
                    };
                }
            ),
        };
        dispatch(createEvent(templateRequest));
    };

    // handle clear all fields
    const handleClearFields = () => {
        setState(initialState);
        setBorrowFacilityState(initialBorrowFacilityState);
        setTaskState(initialTaskState);
        setSelectedFacility([]);
        tagList = [];
        fileInput.current.value = '';
    };

    /* Borrow Facility */

    const handleChangeBorrowFacility = (e) => {
        setBorrowFacilityState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleToggleDialogCreateAndUpdateBorrowFacility = (event, mode) => {
        let targetEdit;
        if (mode) {
            targetEdit = borrowFacilityState.borrowFacilities.find(
                (facility) => facility.name === selectedFacility[0]
            );
        }
        setBorrowFacilityState((prevState) => ({
            ...prevState,
            name: mode ? targetEdit : '',
            borrowDate: mode ? targetEdit.borrowDate : null,
            returnDate: mode ? targetEdit.returnDate : null,
            openCreateAndUpdateDialogBorrowFacility: !prevState.openCreateAndUpdateDialogBorrowFacility,
            isBorrowFacilityCreateMode: mode ? false : true,
        }));
        //clear Error
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });
    };

    const handleToggleDialogDeleteBorrowFacility = () => {
        setBorrowFacilityState((prevState) => ({
            ...prevState,
            openDeleteDialogBorrowFacility: !prevState.openDeleteDialogBorrowFacility,
        }));
    };

    const handleCreateAndUpdateBorrowFacility = () => {
        const { name, borrowDate, returnDate } = borrowFacilityState;
        let listErrors = {};
        if (!name) {
            listErrors = {
                ...listErrors,
                name: 'Borrow Facility cannot be blanked.',
            };
        }
        if (!borrowDate) {
            listErrors = {
                ...listErrors,
                borrowDate: 'Borrow Facility cannot be blanked.',
            };
        }
        if (!returnDate) {
            listErrors = {
                ...listErrors,
                returnDate: 'Borrow Facility cannot be blanked.',
            };
        }
        if (Object.keys(listErrors).length !== 0) {
            return dispatch({
                type: ERROR,
                payload: listErrors,
            });
        }

        //generate new update when in edit mode
        let update;
        if (!borrowFacilityState.isBorrowFacilityCreateMode) {
            update = borrowFacilityState.borrowFacilities.filter(
                (borrowFacility) => borrowFacility.name !== selectedFacility[0]
            );
        }

        //create
        setBorrowFacilityState((prevState) => {
            update = update ? update : prevState.borrowFacilities;
            return {
                ...prevState,
                borrowFacilities: [
                    ...update,
                    {
                        name: prevState.name.name,
                        borrowDate: prevState.borrowDate,
                        returnDate: prevState.returnDate,
                    },
                ],
                name: '',
                borrowDate: null,
                returnDate: null,
                openCreateAndUpdateDialogBorrowFacility: false,
            };
        });

        //clear error
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });
        setSelectedFacility([]);
    };

    const handleDeleteBorrowFacility = () => {
        setBorrowFacilityState((prevState) => {
            return {
                ...prevState,
                borrowFacilities: prevState.borrowFacilities.filter(
                    (borrowFacility) =>
                        !selectedFacility.includes(borrowFacility.name)
                ),
                name: '',
                borrowDate: null,
                returnDate: null,
                openDeleteDialogBorrowFacility: false,
            };
        });
        setSelectedFacility([]);
    };

    /* Borrow Facility */

    /* Task Table */
    const handleChangeTask = (e) => {
        setTaskState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleToggleDialogCreateAndUpdateTask = (event, mode) => {
        let targetEdit;
        if (mode) {
            targetEdit = taskState.tasks.find(
                (task) => task.name === selectedTask[0]
            );
        }
        setTaskState((prevState) => ({
            ...prevState,
            name: mode ? targetEdit.name : '',
            email: mode ? targetEdit : '',
            type: mode ? targetEdit.type : '',
            startTime: mode ? targetEdit.startTime : null,
            endTime: mode ? targetEdit.endTime : null,
            openCreateAndUpdateDialogTask: !prevState.openCreateAndUpdateDialogTask,
            isTaskCreateMode: mode ? false : true,
        }));
        //clear Error
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });
    };

    const handleToggleDialogDeleteTask = () => {
        setTaskState((prevState) => ({
            ...prevState,
            openDeleteDialogTask: !prevState.openDeleteDialogTask,
        }));
    };

    const handleCreateAndUpdateTask = () => {
        const { name, email, type, startTime, endTime } = taskState;
        let listErrors = {};
        if (!name) {
            listErrors = {
                ...listErrors,
                name: 'Name cannot be blanked.',
            };
        }
        if (!email) {
            listErrors = {
                ...listErrors,
                email: 'Email cannot be blanked.',
            };
        }
        if (!type) {
            listErrors = {
                ...listErrors,
                type: 'Type cannot be blanked.',
            };
        }
        if (!startTime) {
            listErrors = {
                ...listErrors,
                startTime: 'Start Time cannot be blanked.',
            };
        }
        if (!endTime) {
            listErrors = {
                ...listErrors,
                endTime: 'End Time cannot be blanked.',
            };
        }
        if (Object.keys(listErrors).length !== 0) {
            return dispatch({
                type: ERROR,
                payload: listErrors,
            });
        }

        //generate new update when in edit mode
        let update;
        if (!taskState.isTaskCreateMode) {
            update = taskState.tasks.filter(
                (task) => task.name !== selectedTask[0]
            );
        }

        //create
        setTaskState((prevState) => {
            update = update ? update : prevState.tasks;
            return {
                ...prevState,
                tasks: [
                    ...update,
                    {
                        name: prevState.name,
                        email: prevState.email.email,
                        type: prevState.type,
                        startTime: prevState.startTime,
                        endTime: prevState.endTime,
                    },
                ],
                name: '',
                email: '',
                type: '',
                startTime: null,
                endTime: null,
                openCreateAndUpdateDialogTask: false,
            };
        });

        //clear error
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });
        setSelectedTask([]);
    };

    const handleDeleteTask = () => {
        setTaskState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(
                    (task) => !selectedTask.includes(task.name)
                ),
                name: '',
                email: '',
                type: '',
                startTime: null,
                endTime: null,
                openDeleteDialogTask: false,
            };
        });
        setSelectedTask([]);
    };
    /* Task Table */

    //handle change photo
    const handleChangePhoto = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileBase64 = await convertBase64(file);
            setState({ ...state, image: fileBase64 });
        }
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
                            image={!state.image ? blankPhoto : state.image}
                            className={css.cardMedia}
                            title="Event image"
                        />
                        <FormControl error={errors?.image ? true : false}>
                            <FormHelperText>
                                {errors?.image ? errors?.image : ''}
                            </FormHelperText>
                        </FormControl>
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
                        <input
                            ref={fileInput}
                            accept="image/*"
                            className={css.inputImage}
                            id="change-image"
                            type="file"
                            onChange={handleChangePhoto}
                        />
                        {state.image && (
                            <Button
                                disabled={eventIsLoading}
                                className={css.btnRemovePhoto}
                                onClick={() => {
                                    setState({
                                        ...state,
                                        image: null,
                                    });
                                    fileInput.current.value = '';
                                }}
                                color="secondary"
                                startIcon={<DeleteForever />}
                                variant="contained"
                            >
                                Remove
                            </Button>
                        )}
                        <label
                            className={css.btnChangePhoto}
                            htmlFor="change-image"
                        >
                            <Button
                                disabled={eventIsLoading}
                                startIcon={<AddAPhoto />}
                                variant="contained"
                                component="span"
                            >
                                {state.image ? 'Change Image' : 'Choose Image'}
                            </Button>
                        </label>
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
                        {/* Event Name */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                disabled={eventIsLoading}
                                error={errors?.eventName ? true : false}
                                helperText={
                                    errors?.eventName ? errors?.eventName : ''
                                }
                                margin="normal"
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="Event Name"
                                name="eventName"
                                value={state.eventName}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Budget */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                disabled={eventIsLoading}
                                error={errors?.budget ? true : false}
                                helperText={
                                    errors?.budget ? errors?.budget : ''
                                }
                                margin="normal"
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Budget"
                                name="budget"
                                value={state.budget}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Language */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <FormControl
                                disabled={eventIsLoading}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                error={errors?.language ? true : false}
                            >
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
                                <FormHelperText>
                                    {errors?.language ? errors?.language : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* Select Type */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <Autocomplete
                                disabled={eventIsLoading}
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
                                            eventTypeTarget: newValue?.name
                                                ? newValue?.name
                                                : '',
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
                                        error={
                                            errors?.eventTypeId ? true : false
                                        }
                                        helperText={
                                            errors?.eventTypeId
                                                ? errors?.eventTypeId
                                                : ''
                                        }
                                        margin="normal"
                                        {...params}
                                        label="Event Type"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        {/* Mode */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                disabled={eventIsLoading}
                                error={errors?.mode ? true : false}
                                helperText={errors?.mode ? errors?.mode : ''}
                                margin="normal"
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="Mode"
                                name="mode"
                                value={state.mode}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Accommodation */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                disabled={eventIsLoading}
                                error={errors?.accommodation ? true : false}
                                helperText={
                                    errors?.accommodation
                                        ? errors?.accommodation
                                        : ''
                                }
                                margin="normal"
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="Accommodation"
                                name="accommodation"
                                value={state.accommodation}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Max Participant */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                disabled={eventIsLoading}
                                error={errors?.maxParticipants ? true : false}
                                helperText={
                                    errors?.maxParticipants
                                        ? errors?.maxParticipants
                                        : ''
                                }
                                margin="normal"
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Max Participants"
                                name="maxParticipants"
                                value={state.maxParticipants}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Tags */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <Autocomplete
                                key={createEventSuccess}
                                disabled={eventIsLoading}
                                limitTags={4}
                                multiple
                                id="tags-filled"
                                options={[]}
                                freeSolo
                                renderTags={(value, getTagProps) => {
                                    tagList = value;
                                    return value.map((option, index) => (
                                        <Chip
                                            color="primary"
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                        />
                                    ));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        error={errors?.tags ? true : false}
                                        helperText={
                                            errors?.tags ? errors?.tags : ''
                                        }
                                        margin="normal"
                                        {...params}
                                        variant="outlined"
                                        label="Tags"
                                        placeholder="Input your tag"
                                    />
                                )}
                            />
                        </Grid>
                        {/* Start Date  */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disabled={eventIsLoading}
                                    error={errors?.startDate ? true : false}
                                    helperText={
                                        errors?.startDate
                                            ? errors?.startDate
                                            : ''
                                    }
                                    inputVariant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="startDate"
                                    label="Start Date"
                                    format="MM/DD/YYYY"
                                    value={state.startDate}
                                    onChange={(date) => {
                                        setState((prevState) => ({
                                            ...prevState,
                                            startDate: date.toDate(),
                                        }));
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {/* End Date  */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disabled={eventIsLoading}
                                    error={errors?.endDate ? true : false}
                                    helperText={
                                        errors?.endDate ? errors?.endDate : ''
                                    }
                                    inputVariant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="endDate"
                                    label="End Date"
                                    format="MM/DD/YYYY"
                                    value={state.endDate}
                                    onChange={(date) => {
                                        setState((prevState) => ({
                                            ...prevState,
                                            endDate: date.toDate(),
                                        }));
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {/* Registration Close Date  */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disabled={eventIsLoading}
                                    error={
                                        errors?.registrationCloseDate
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.registrationCloseDate
                                            ? errors?.registrationCloseDate
                                            : ''
                                    }
                                    inputVariant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="registrationCloseDate"
                                    label="Registration Close Date"
                                    format="MM/DD/YYYY"
                                    value={state.registrationCloseDate}
                                    onChange={(date) => {
                                        setState((prevState) => ({
                                            ...prevState,
                                            registrationCloseDate: date.toDate(),
                                        }));
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {/* Location */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
                                disabled={eventIsLoading}
                                error={errors?.location ? true : false}
                                helperText={
                                    errors?.location ? errors?.location : ''
                                }
                                margin="normal"
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="Location"
                                name="location"
                                value={state.location}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Pick Facility Table */}
                        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                            <Paper elevation={3}>
                                <DataTable
                                    disabled={eventIsLoading}
                                    handleToggleDialogCreateAndUpdate={
                                        handleToggleDialogCreateAndUpdateBorrowFacility
                                    }
                                    handleToggleDialogDelete={
                                        handleToggleDialogDeleteBorrowFacility
                                    }
                                    take={1}
                                    selected={selectedFacility}
                                    setSelected={setSelectedFacility}
                                    data={borrowFacilityState.borrowFacilities}
                                    isLoading={
                                        borrowFacilityState.borrowFacilityLoading
                                    }
                                    createSuccess={
                                        borrowFacilityState.borrowFacilityCreatSucces
                                    }
                                    deleteSuccess={
                                        borrowFacilityState.borrowFacilityDeleteSucces
                                    }
                                    updateSuccess={
                                        borrowFacilityState.borrowFacilityUpdateSucces
                                    }
                                    tableName="Borrow Facility List"
                                    headCells={[
                                        {
                                            id: 'name',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'Name',
                                        },
                                        {
                                            id: 'borrowDate',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'Borrow Date',
                                        },
                                        {
                                            id: 'returnDate',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'Return Date',
                                        },
                                    ]}
                                />
                            </Paper>
                            <FormControl
                                error={
                                    errors?.facilityHistoryListId ? true : false
                                }
                            >
                                <FormHelperText>
                                    {errors?.facilityHistoryListId
                                        ? errors?.facilityHistoryListId
                                        : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* Tasks Table */}
                        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                            <Paper elevation={3}>
                                <DataTable
                                    disabled={eventIsLoading}
                                    handleToggleDialogCreateAndUpdate={
                                        handleToggleDialogCreateAndUpdateTask
                                    }
                                    handleToggleDialogDelete={
                                        handleToggleDialogDeleteTask
                                    }
                                    take={1}
                                    selected={selectedTask}
                                    setSelected={setSelectedTask}
                                    data={taskState.tasks}
                                    isLoading={taskState.isLoading}
                                    createSuccess={taskState.taskCreatSucces}
                                    deleteSuccess={taskState.taskDeleteSucces}
                                    updateSuccess={taskState.taskUpdateSucces}
                                    tableName="Task List"
                                    headCells={[
                                        {
                                            id: 'name',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'Name',
                                        },
                                        {
                                            id: 'email',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'Email',
                                        },
                                        {
                                            id: 'type',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'Type',
                                        },
                                        {
                                            id: 'startTime',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'Start Time',
                                        },
                                        {
                                            id: 'endTime',
                                            numeric: false,
                                            disablePadding: false,
                                            label: 'End Time',
                                        },
                                    ]}
                                />
                            </Paper>
                            <FormControl
                                error={errors?.taskListId ? true : false}
                            >
                                <FormHelperText>
                                    {errors?.taskListId
                                        ? errors?.taskListId
                                        : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* Description */}
                        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                            <RichTextEditor
                                key={createEventSuccess}
                                defaultContent={state.description}
                                disabled={eventIsLoading}
                                setState={setState}
                            />
                            <FormControl
                                error={errors?.description ? true : false}
                            >
                                <FormHelperText>
                                    {errors?.description
                                        ? errors?.description
                                        : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* Button Control */}
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
                        >
                            <Grid item>
                                <Button
                                    disabled={eventIsLoading}
                                    size="large"
                                    variant="contained"
                                    color="default"
                                    onClick={handleClearFields}
                                >
                                    Clear
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    disabled={eventIsLoading}
                                    style={{ marginLeft: '20px' }}
                                    size="large"
                                    onClick={handleCreateEvent}
                                    variant="contained"
                                    color="primary"
                                >
                                    {eventIsLoading ? (
                                        <CircularProgress
                                            size={26}
                                            color="inherit"
                                        />
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            {/* Create Event Type Dialog */}
            <CreateEventTypeDialog
                openDialogCreateEventType={state.openDialogCreateEventType}
                handleToggleDialogCreateEventType={
                    handleToggleDialogCreateEventType
                }
                handleChange={handleChange}
                eventTypeTarget={state.eventTypeTarget}
                eventTypeIsLoading={eventTypeIsLoading}
                handleCreateEventType={handleCreateEventType}
                errors={errors}
            />
            {/* Borrow Facility Dialog */}
            <BorrowFacilityDialog
                openCreateAndUpdateDialog={
                    borrowFacilityState.openCreateAndUpdateDialogBorrowFacility
                }
                handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdateBorrowFacility
                }
                isCreateMode={borrowFacilityState.isBorrowFacilityCreateMode}
                handleChange={handleChangeBorrowFacility}
                setBorrowFacilityState={setBorrowFacilityState}
                name={borrowFacilityState.name}
                borrowDate={borrowFacilityState.borrowDate}
                returnDate={borrowFacilityState.returnDate}
                openDeleteDialog={
                    borrowFacilityState.openDeleteDialogBorrowFacility
                }
                handleCreateAndUpdate={handleCreateAndUpdateBorrowFacility}
                handleToggleDialogDelete={
                    handleToggleDialogDeleteBorrowFacility
                }
                handleDelete={handleDeleteBorrowFacility}
                isLoading={borrowFacilityState.borrowFacilityLoading}
                errors={errors}
                createSuccess={borrowFacilityState.borrowFacilityCreatSucces}
                availableFacilities={
                    /* 
                    if isBorrowFacilityCreateMode is true, 
                    then render facilities that are not in borrow facility table, vice versa.
                     */
                    borrowFacilityState.isBorrowFacilityCreateMode
                        ? facilities
                              .filter((facility) => facility.status === true)
                              .filter((facility) => {
                                  const facilityNames = borrowFacilityState.borrowFacilities.map(
                                      (borrowFacility) => borrowFacility.name
                                  );

                                  return !facilityNames.includes(facility.name);
                              })
                        : facilities.filter(
                              (facility) => facility.status === true
                          )
                }
            />
            {/* Borrow Facility Dialog */}

            <TaskDialog
                openCreateAndUpdateDialog={
                    taskState.openCreateAndUpdateDialogTask
                }
                handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdateTask
                }
                isCreateMode={taskState.isTaskCreateMode}
                handleChange={handleChangeTask}
                setTaskState={setTaskState}
                name={taskState.name}
                email={taskState.email}
                type={taskState.type}
                startTime={taskState.startTime}
                endTime={taskState.endTime}
                openDeleteDialog={taskState.openDeleteDialogTask}
                handleCreateAndUpdate={handleCreateAndUpdateTask}
                handleToggleDialogDelete={handleToggleDialogDeleteTask}
                handleDelete={handleDeleteTask}
                isLoading={taskState.isLoading}
                errors={errors}
                createSuccess={taskState.taskCreatSucces}
                availableUsers={
                    /* 
                    if isTaskCreateMode is true, 
                    then render user emails that are not in task table or a team member, vice versa.
                     */
                    taskState.isTaskCreateMode
                        ? users
                              .filter((targetUser) =>
                                  targetUser.role.includes('4')
                              )
                              .filter((targetUser) => {
                                  const listUserEmails = taskState.tasks.map(
                                      (task) => task.email
                                  );

                                  return !listUserEmails.includes(
                                      targetUser.email
                                  );
                              })
                        : users.filter(
                              (targetUser) => targetUser.email !== user.email
                          )
                }
            />
            {/* Notification */}
            <SystemNotification openCreateSnackBar={state.openCreateSnackBar} />
        </div>
    );
};

export default CreateEvent;

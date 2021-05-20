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
    Chip,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { AddAPhoto } from '@material-ui/icons';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import blankPhoto from '../../images/blankPhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllEventTypes,
    createEventType,
} from '../../actions/eventTypeActions';

import { getAllFacilities } from '../../actions/facilityActions';

//import useStyles in the last
import useStyles from './styles';
import SystemNotification from '../Notification/Notification';
import DataTable from '../DataTable/DataTable';
import CreateEventTypeDialog from './CreateEventTypeDialog/CreateEventTypeDialog';
import BorrowFacilityDialog from './BorrowFacilityDialog/BorrowFailityDialog';
import { ERROR, ERROR_CLEAR } from '../../constants';

let tags = [];

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

const filter = createFilterOptions();
const CreateEvent = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const {
        eventTypes,
        errors,
        eventTypeIsLoading,
        createSuccess,
        facilities,
    } = useSelector((state) => ({
        eventTypes: state.eventType.eventTypes,
        errors: state.error.errors,
        eventTypeIsLoading: state.eventType.isLoading,
        createSuccess: state.eventType.createSuccess,
        facilities: state.facility.facilities,
    }));
    const [state, setState] = useState(initialState);
    //facility table
    const [selectedFacility, setSelectedFacility] = useState([]);
    const [borrowFacilityState, setBorrowFacilityState] = useState(
        initialBorrowFacilityState
    );
    //useEffect get status create event type
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            openCreateSnackBar: createSuccess,
            openDialogCreateEventType: false,
        }));
        if (createSuccess) {
            dispatch(getAllEventTypes());
        }
    }, [dispatch, createSuccess]);

    //useEffect to get all event type
    useEffect(() => {
        dispatch(getAllEventTypes());
        dispatch(getAllFacilities());
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
        console.log({ ...state, tags });
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
        setBorrowFacilityState((prevState) => ({
            ...prevState,
            borrowFacilities: [
                ...prevState.borrowFacilities,
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
        }));
        //clear error
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });
    };

    const handleDeleteBorrowFacility = () => {
        console.log('Delete Borrow Facility');
    };

    /* Borrow Facility */
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
                        {/* Event Name */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <TextField
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
                                margin="normal"
                                variant="outlined"
                                fullWidth
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
                            </FormControl>
                        </Grid>
                        {/* Select Type */}
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
                                margin="normal"
                                type="number"
                                variant="outlined"
                                fullWidth
                                label="Mode"
                                name="maxParticipants"
                                value={state.maxParticipants}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Tags */}
                        <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                            <Autocomplete
                                limitTags={4}
                                multiple
                                id="tags-filled"
                                options={[]}
                                freeSolo
                                renderTags={(value, getTagProps) => {
                                    tags = value;
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
                            <Paper>
                                <DataTable
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
                                    size="large"
                                    variant="contained"
                                    color="default"
                                >
                                    Close
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{ marginLeft: '20px' }}
                                    size="large"
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
                availableFacilities={facilities.filter(
                    (facility) => facility.status === true
                )}
            />
            {/* Notification */}
            <SystemNotification openCreateSnackBar={state.openCreateSnackBar} />
        </div>
    );
};

export default CreateEvent;

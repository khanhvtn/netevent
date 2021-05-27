import React from 'react';

import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    FormHelperText,
    Typography,
} from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';
const filter = createFilterOptions();
const CreateEventInputGroup = ({
    eventIsLoading,
    errors,
    handleChange,
    state,
    setState,
    eventTypes,
    createEventSuccess,
    updateTagList,
}) => {
    const css = useStyles();
    return (
        <>
            <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                    Event Details
                </Typography>
            </Grid>
            {/* Event Name */}
            <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                <TextField
                    disabled={eventIsLoading}
                    error={errors?.eventName ? true : false}
                    helperText={errors?.eventName ? errors?.eventName : ''}
                    size="medium"
                    type="text"
                    variant="outlined"
                    fullWidth
                    label="Event Name"
                    name="eventName"
                    value={state.eventName}
                    onChange={handleChange}
                />
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
                        } else if (newValue && newValue.inputValue) {
                            setState((prevState) => ({
                                ...prevState,
                                openDialogCreateEventType: !prevState.openDialogCreateEventType,
                                eventTypeTarget: newValue.inputValue,
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
                            error={errors?.eventTypeId ? true : false}
                            helperText={
                                errors?.eventTypeId ? errors?.eventTypeId : ''
                            }
                            size="medium"
                            {...params}
                            label="Event Type"
                            variant="outlined"
                        />
                    )}
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
                        updateTagList(value);
                        return value.map((option, index) => (
                            <Chip
                                color="primary"
                                variant="default"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ));
                    }}
                    renderInput={(params) => (
                        <TextField
                            error={errors?.tags ? true : false}
                            helperText={errors?.tags ? errors?.tags : ''}
                            size="medium"
                            {...params}
                            variant="outlined"
                            label="Tags"
                            placeholder="Input your tag"
                        />
                    )}
                />
            </Grid>

            {/* Language */}
            <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                <FormControl
                    disabled={eventIsLoading}
                    size="medium"
                    variant="outlined"
                    fullWidth
                    error={errors?.language ? true : false}
                >
                    <InputLabel id="select-label-language">Language</InputLabel>
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
                        <MenuItem value={'Vietnamese'}>Vietnamese</MenuItem>
                        <MenuItem value={'English'}>English</MenuItem>
                    </Select>
                    <FormHelperText>
                        {errors?.language ? errors?.language : ''}
                    </FormHelperText>
                </FormControl>
            </Grid>

            {/* Mode */}
            <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                <TextField
                    disabled={eventIsLoading}
                    error={errors?.mode ? true : false}
                    helperText={errors?.mode ? errors?.mode : ''}
                    size="medium"
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
                        errors?.accommodation ? errors?.accommodation : ''
                    }
                    size="medium"
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
                <CurrencyTextField
                    disabled={eventIsLoading}
                    error={errors?.maxParticipants ? true : false}
                    helperText={
                        errors?.maxParticipants ? errors?.maxParticipants : ''
                    }
                    size="medium"
                    variant="outlined"
                    fullWidth
                    label="Max Participants"
                    name="maxParticipants"
                    value={state.maxParticipants}
                    onChange={(event, value) =>
                        setState((prevState) => ({
                            ...prevState,
                            maxParticipants: value
                                ? value
                                : event.currentTarget.value,
                        }))
                    }
                    currencySymbol="🚹"
                    outputFormat="string"
                    decimalCharacter="."
                    digitGroupSeparator=","
                    preDefined={{
                        decimalPlaces: 0,
                    }}
                />
            </Grid>
            {/* Budget */}
            <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                <CurrencyTextField
                    disabled={eventIsLoading}
                    error={errors?.budget ? true : false}
                    helperText={errors?.budget ? errors?.budget : ''}
                    size="medium"
                    variant="outlined"
                    fullWidth
                    label="Budget"
                    name="budget"
                    value={state.budget}
                    onChange={(event, value) => {
                        setState((prevState) => ({
                            ...prevState,
                            budget: value ? value : event.currentTarget.value,
                        }));
                    }}
                    currencySymbol="VND"
                    outputFormat="string"
                    decimalCharacter="."
                    digitGroupSeparator=","
                    preDefined={{
                        allowDecimalPadding: false,
                    }}
                />
            </Grid>

            <Grid
                style={{ marginTop: 36 }}
                item
                md={12}
                lg={12}
                xl={12}
                sm={12}
                xs={12}
            >
                <Typography style={{ fontWeight: 'bold' }} variant="h6">
                    Time & Location
                </Typography>
            </Grid>

            {/* Start Date  */}
            <Grid item md={6} lg={6} xl={6} sm={12} xs={12}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        disablePast
                        disabled={eventIsLoading}
                        error={errors?.startDate ? true : false}
                        helperText={errors?.startDate ? errors?.startDate : ''}
                        inputVariant="outlined"
                        size="medium"
                        fullWidth
                        id="startDate"
                        label="Start Date"
                        format="MM/DD/YYYY"
                        value={state.startDate}
                        onChange={(date) => {
                            setState((prevState) => ({
                                ...prevState,
                                startDate: date?.toDate()
                                    ? date?.toDate()
                                    : null,
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
                        disablePast
                        error={errors?.endDate ? true : false}
                        helperText={errors?.endDate ? errors?.endDate : ''}
                        disabled={
                            !state.startDate
                                ? true
                                : eventIsLoading
                                ? true
                                : false
                        }
                        minDate={
                            state.startDate
                                ? Date.parse(state.startDate)
                                : undefined
                        }
                        inputVariant="outlined"
                        size="medium"
                        fullWidth
                        id="endDate"
                        label="End Date"
                        format="MM/DD/YYYY"
                        value={state.endDate}
                        onChange={(date) => {
                            setState((prevState) => ({
                                ...prevState,
                                endDate: date?.toDate() ? date?.toDate() : null,
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
                        disablePast
                        disabled={
                            !state.startDate
                                ? true
                                : !state.endDate
                                ? true
                                : eventIsLoading
                                ? true
                                : false
                        }
                        minDate={
                            state.startDate
                                ? Date.parse(state.startDate)
                                : undefined
                        }
                        maxDate={
                            state.endDate
                                ? Date.parse(state.endDate)
                                : undefined
                        }
                        error={errors?.registrationCloseDate ? true : false}
                        helperText={
                            errors?.registrationCloseDate
                                ? errors?.registrationCloseDate
                                : ''
                        }
                        inputVariant="outlined"
                        size="medium"
                        fullWidth
                        id="registrationCloseDate"
                        label="Registration Close Date"
                        format="MM/DD/YYYY"
                        value={state.registrationCloseDate}
                        onChange={(date) => {
                            setState((prevState) => ({
                                ...prevState,
                                registrationCloseDate: date?.toDate()
                                    ? date?.toDate()
                                    : null,
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
                    helperText={errors?.location ? errors?.location : ''}
                    size="medium"
                    type="text"
                    variant="outlined"
                    fullWidth
                    label="Location"
                    name="location"
                    value={state.location}
                    onChange={handleChange}
                />
            </Grid>
        </>
    );
};

export default CreateEventInputGroup;

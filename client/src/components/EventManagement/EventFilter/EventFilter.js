import React, { useState } from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    Grid,
    Typography,
    Button,
    Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

//import useStyles in the last
import useStyles from './styles';
import { useSelector } from 'react-redux';

const PrettoSlider = withStyles({
    root: {
        color: '#3F51B5',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


const EventFilter = ({
    openFilter,
    type,
    budgetRange,
    participantRange,
    startFrom,
    startTo,
    endFrom,
    endTo,
    setFilters,
    handleToggleFilter,
    handleFilterChange,
    handleClearFilter,
    handleApplyFilter,
}) => {
    const css = useStyles();

    const { eventTypes, isLoading } = useSelector((state) => ({
        eventTypes: state.eventType.eventTypes,
        isLoading: state.eventType.isLoading
    }))

    // Set budget state
    const handleOnChangeBudget = (e, budget) => {
        setFilters((prevState) => ({
            ...prevState,
            budgetRange: budget
        }));
    }

    // Set maxParticipants state
    const handleOnChangeParticipant = (e, participant) => {
        setFilters((prevState) => ({
            ...prevState,
            participantRange: participant
        }));
    }

    return (
        <Drawer anchor="right" open={openFilter} onClose={handleToggleFilter}>
            <div className={css.filterTitle}>
                <Typography style={{ fontWeight: 'bold' }} align="center" variant="h6">Filter User</Typography>
            </div>
            <div className={css.filterWrapper}>
                <div className={css.filterInputs}>
                    <FormControl size="small" margin="normal" fullWidth variant="outlined">
                        <InputLabel id="typeFilterLabel">Type</InputLabel>
                        <Select
                            disabled={isLoading}
                            id="typeFilter"
                            label="Type"
                            labelId="typeFilterLabel"
                            value={type}
                            onChange={handleFilterChange}
                            inputProps={{
                                name: 'type',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {eventTypes.map((eventType, index) => {
                                return (
                                    <MenuItem key={index} value={eventType.name}>{eventType.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <FormControl size="small" margin="normal" fullWidth>
                        <Typography variant="caption">Bugdet Range: {budgetRange} vnd</Typography>
                        <PrettoSlider
                            name="budgetRange"
                            valueLabelDisplay="off"
                            aria-label="pretto slider"
                            value={budgetRange}
                            onChange={handleOnChangeBudget}
                            step={500000}
                            min={500000}
                            max={10000000}
                        />
                    </FormControl>
                    <FormControl size="small" margin="normal" fullWidth>
                        <Typography variant="caption">Participant Range</Typography>
                        <PrettoSlider
                            name="participantRange"
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={30}
                            value={participantRange}
                            onChange={handleOnChangeParticipant}
                            step={5}
                            min={10}
                            max={100}

                        />
                    </FormControl>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                inputVariant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                id="startFrom"
                                label="Start From"
                                format="MM/DD/YYYY"
                                value={startFrom}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        startFrom: date.toDate(),
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                inputVariant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                id="startTo"
                                label="Start To"
                                format="MM/DD/YYYY"
                                value={startTo}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        startTo: date.toDate(),
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                fullWidth
                                id="endFrom"
                                label="End From"
                                size="small"
                                margin="normal"
                                format="MM/DD/YYYY"
                                inputVariant="outlined"
                                value={endFrom}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        endFrom: date.toDate(),
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                fullWidth
                                id="endTo"
                                label="End To"
                                size="small"
                                margin="normal"
                                format="MM/DD/YYYY"
                                inputVariant="outlined"
                                value={endTo}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        endTo: date.toDate(),
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div className={css.filterActions}>
                    <Button
                        className={css.handleClearButton}
                        onClick={handleClearFilter}
                        style={{ backgroundColor: 'transparent' }}
                        color="default"
                    >
                        Clear all
                    </Button>
                    <Button
                        onClick={handleApplyFilter}
                        variant="contained"
                        color="primary"
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default EventFilter;
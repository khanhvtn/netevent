import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import {
    Grid,
    Typography,
    Button,
    Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';

//import useStyles in the last
import useStyles from './styles';
import { useSelector } from 'react-redux';

const EventFilter = ({
    openFilter,
    type,
    status,
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
    isReviewer
}) => {
    const css = useStyles();

    const { eventTypes, isLoading } = useSelector((state) => ({
        eventTypes: state.eventType.eventTypes,
        isLoading: state.eventType.isLoading
    }));

    return (
        <Drawer anchor="right" open={openFilter} onClose={handleToggleFilter}>
            <div className={css.filterTitle}>
                <Typography
                    style={{ fontWeight: 'bold' }}
                    align="center"
                    variant="h6">
                    Filter User
                </Typography>
            </div>
            <div className={css.filterWrapper}>
                <div className={css.filterInputs}>
                    <FormControl
                        size="small"
                        margin="normal"
                        fullWidth
                        variant="outlined">
                        <InputLabel id="typeFilterLabel">Type</InputLabel>
                        <Select
                            disabled={isLoading}
                            id="typeFilter"
                            label="Type"
                            labelId="typeFilterLabel"
                            value={type}
                            onChange={handleFilterChange}
                            inputProps={{
                                name: 'type'
                            }}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {eventTypes.map((eventType, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        value={eventType.name}>
                                        {eventType.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {isReviewer && (
                        <>
                            <FormControl
                                size="small"
                                margin="normal"
                                fullWidth
                                variant="outlined">
                                <InputLabel id="statusFilterLabel">
                                    Status
                                </InputLabel>
                                <Select
                                    disabled={isLoading}
                                    id="statusFilter"
                                    label="Status"
                                    labelId="statusFilterLabel"
                                    value={status}
                                    onChange={handleFilterChange}
                                    inputProps={{
                                        name: 'status'
                                    }}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Approved">
                                        Approved
                                    </MenuItem>
                                    <MenuItem value="Rejected">
                                        Rejected
                                    </MenuItem>
                                    <MenuItem value="Completed">
                                        Completed
                                    </MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                    <FormControl size="small" margin="normal" fullWidth>
                        <Typography variant="caption">
                            Bugdet Range
                        </Typography>
                        <RadioGroup
                            aria-label="budgetRange"
                            name="budgetRange"
                            value={budgetRange}
                            onChange={handleFilterChange}>
                            <FormControlLabel value="20" control={<Radio color="primary" />} label="Less than 20m" />
                            <FormControlLabel value="20-50" control={<Radio color="primary" />} label="20m - 50m" />
                            <FormControlLabel value="50" control={<Radio color="primary" />} label="More than 50m" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl size="small" margin="normal" fullWidth>
                        <Typography variant="caption">
                            Participant Range
                        </Typography>
                        <RadioGroup
                            aria-label="participantRange"
                            name="participantRange"
                            value={participantRange}
                            onChange={handleFilterChange}>
                            <FormControlLabel value="20" control={<Radio color="primary" />} label="Less than 20" />
                            <FormControlLabel value="20-50" control={<Radio color="primary" />} label="20-50" />
                            <FormControlLabel value="50" control={<Radio color="primary" />} label="More than 50" />
                        </RadioGroup>
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
                                        startFrom: date.toDate()
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
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
                                        startTo: date.toDate()
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
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
                                        endFrom: date.toDate()
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
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
                                        endTo: date.toDate()
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
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
                        color="default">
                        Clear all
                    </Button>
                    <Button
                        onClick={handleApplyFilter}
                        variant="contained"
                        color="primary">
                        Apply
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default EventFilter;

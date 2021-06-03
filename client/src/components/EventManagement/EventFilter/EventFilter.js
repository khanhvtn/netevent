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
    handleToggleFilter,
    createdFrom,
    createdTo,
    setFilters,
    handleClearFilter,
    handleApplyFilter,
}) => {
    const css = useStyles();
    const [budgetRange, setBudgetRange] = useState(2500000);

    const handleOnChangeBudget = (e, newBudget) => {
        setBudgetRange(newBudget)
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
                            id="typeFilter"
                            label="Type"
                            labelId="typeFilterLabel"
                            // value={typeFilter}
                            // onChange={handleFilterChange}
                            inputProps={{
                                name: 'typeFilter',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={2}>Expired</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" margin="normal" fullWidth>
                        <Typography variant="caption">Bugdet Range: {budgetRange} vnd</Typography>
                        <PrettoSlider
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
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={30}
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
                                id="createdFrom"
                                label="Start Date"
                                format="MM/DD/YYYY"
                                value={createdFrom}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        createdFrom: date.toDate(),
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
                                id="createdTo"
                                label="End Date"
                                format="MM/DD/YYYY"
                                value={createdTo}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        createdTo: date.toDate(),
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
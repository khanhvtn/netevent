import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { Grid, Typography, Button, Drawer } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
//import useStyles in the last
import useStyles from './styles';

const EventAnalysisFilter = ({
    openFilter,
    startFrom,
    startTo,
    endFrom,
    endTo,
    setFilters,
    handleToggleFilter,
    handleClearFilter,
    handleApplyFilter
}) => {
    const css = useStyles();
    return (
        <Drawer anchor="right" open={openFilter} onClose={handleToggleFilter}>
            <div className={css.filterTitle}>
                <Typography
                    style={{ fontWeight: 'bold' }}
                    align="center"
                    variant="h6">
                    Filter Event Analysis
                </Typography>
            </div>
            <div className={css.filterWrapper}>
                <div className={css.filterInputs}>
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

export default EventAnalysisFilter;

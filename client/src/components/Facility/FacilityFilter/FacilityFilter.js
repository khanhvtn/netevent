import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { Grid, Typography, Button, Drawer } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
//import useStyles in the last
import useStyles from './styles';

const FacilityFilter = ({
    openFilter,
    handleToggleFilter,
    createdFrom,
    createdTo,
    setFilters,
    updatedFrom,
    updatedTo,
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
                    Filter Facility
                </Typography>
            </div>
            <div className={css.filterWrapper}>
                <div className={css.filterInputs}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                fullWidth
                                id="createdFrom"
                                label="Created From"
                                value={createdFrom}
                                size="small"
                                margin="normal"
                                format="MM/DD/YYYY"
                                inputVariant="outlined"
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        createdFrom: date.toDate()
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                            <KeyboardDatePicker
                                fullWidth
                                id="createdTo"
                                label="Created To"
                                value={createdTo}
                                size="small"
                                margin="normal"
                                format="MM/DD/YYYY"
                                inputVariant="outlined"
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        createdTo: date.toDate()
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                            <KeyboardDatePicker
                                fullWidth
                                id="updatedFrom"
                                label="Updated From"
                                size="small"
                                margin="normal"
                                format="MM/DD/YYYY"
                                inputVariant="outlined"
                                value={updatedFrom}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        updatedFrom: date.toDate()
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                            <KeyboardDatePicker
                                fullWidth
                                id="updatedTo"
                                label="Updated To"
                                size="small"
                                margin="normal"
                                format="MM/DD/YYYY"
                                inputVariant="outlined"
                                value={updatedTo}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        updatedTo: date.toDate()
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
                        className={css.handleFilterButton}
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

export default FacilityFilter;

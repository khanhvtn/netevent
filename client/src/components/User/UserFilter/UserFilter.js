import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    Grid,
    Typography,
    Button,
    Select,
    MenuItem,
    Drawer,
    InputLabel,
    FormControl,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
//import useStyles in the last
import useStyles from './styles';

const UserFilter = ({
    openFilter,
    handleToggleFilter,
    statusFilter,
    handleFilterChange,
    createdFrom,
    createdTo,
    setFilters,
    updatedFrom,
    updatedTo,
    handleClearFilter,
    handleApplyFilter,
}) => {
    const css = useStyles();
    return (
        <Drawer anchor="right" open={openFilter} onClose={handleToggleFilter}>
            <div className={css.filterWrapper}>
                <Typography variant="h6">Filter List</Typography>
                <div className={css.filterInputs}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="statusFilterLabel">Status</InputLabel>
                        <Select
                            labelId="statusFilterLabel"
                            id="statusFiler"
                            value={statusFilter}
                            onChange={handleFilterChange}
                            label="Status"
                            inputProps={{
                                name: 'statusFilter',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Expired</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                size="small"
                                fullWidth
                                margin="normal"
                                id="createdFrom"
                                label="Created From"
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
                                size="small"
                                fullWidth
                                margin="normal"
                                id="createdTo"
                                label="Created To"
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
                            <KeyboardDatePicker
                                size="small"
                                fullWidth
                                margin="normal"
                                id="updatedFrom"
                                label="Updated From"
                                format="MM/DD/YYYY"
                                value={updatedFrom}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        updatedFrom: date.toDate(),
                                    }));
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                size="small"
                                fullWidth
                                margin="normal"
                                id="updatedTo"
                                label="Updated To"
                                format="MM/DD/YYYY"
                                value={updatedTo}
                                onChange={(date) => {
                                    setFilters((prevState) => ({
                                        ...prevState,
                                        updatedTo: date.toDate(),
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
                        onClick={handleClearFilter}
                        variant="contained"
                        color="default"
                    >
                        Clear Filter
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

export default UserFilter;

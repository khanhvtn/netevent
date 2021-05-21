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
    Divider,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
//import useStyles in the last
import useStyles from './styles';

const UserFilter = ({
    openFilter,
    handleToggleFilter,
    rolesFilter,
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
                        <InputLabel id="rolesFilterLabel">Roles</InputLabel>
                        <Select
                            labelId="rolesFilterLabel"
                            id="rolesFiler"
                            value={rolesFilter}
                            onChange={handleFilterChange}
                            label="Roles"
                            inputProps={{
                                name: 'rolesFilter',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>Reviewer</MenuItem>
                            <MenuItem value={3}>Creator</MenuItem>
                            <MenuItem value={4}>Team Member</MenuItem>
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
                        className={css.handleClearButton}
                        onClick={handleClearFilter}
                        style={{ backgroundColor: 'transparent' }}
                        color="default"
                    >
                        Clear
                    </Button>
                    <Button
                        className={css.handleFilterButton}
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

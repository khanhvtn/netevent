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

const ParticipantFilter = ({
    openFilter,
    handleToggleFilter,
    handleFilterChange,
    handleClearFilter,
    handleApplyFilter,
    academic,
    status,
}) => {
    const css = useStyles();
    return (
        <Drawer anchor="right" open={openFilter} onClose={handleToggleFilter}>
            <div className={css.filterTitle}>
                <Typography style={{ fontWeight: 'bold' }} align="center" variant="h6">Filter User</Typography>
            </div>
            <div className={css.filterWrapper}>
                <div className={css.filterInputs}>
                    <FormControl size="small" margin="normal" fullWidth variant="outlined">
                        <InputLabel id="academicFilterLabel">Academic</InputLabel>
                        <Select
                            id="academicFiler"
                            label="Academic"
                            labelId="academicFilterLabel"
                            value={academic}
                            onChange={handleFilterChange}
                            inputProps={{
                                name: 'academic',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Bachelor'}>Bachelor</MenuItem>
                            <MenuItem value={'Master'}>Master</MenuItem>
                            <MenuItem value={'PhD'}>PhD</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" margin="normal" fullWidth variant="outlined">
                        <InputLabel id="statusFilterLabel">Status</InputLabel>
                        <Select
                            id="statusFiler"
                            label="status"
                            labelId="statusFilterLabel"
                            value={status}
                            onChange={handleFilterChange}
                            inputProps={{
                                name: 'status',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Valid</MenuItem>
                            <MenuItem value={2}>Invalid</MenuItem>
                            <MenuItem value={3}>Check-in</MenuItem>
                        </Select>
                    </FormControl>
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

export default ParticipantFilter;
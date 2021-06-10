import React from 'react';
import {
    Typography,
    Button,
    Select,
    MenuItem,
    Drawer,
    InputLabel,
    FormControl,
} from '@material-ui/core';
//import useStyles in the last
import useStyles from './styles';

const ParticipantFilter = ({
    openFilter,
    handleToggleFilter,
    handleFilterChange,
    handleClearFilter,
    handleApplyFilter,
    academic,
    isValid,
    isAttended,
    checkInMode
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
                        {checkInMode ?
                            <>
                                <InputLabel id="isAttendedFilterLabel">Status</InputLabel>
                                <Select
                                    id="isAttendedFiler"
                                    label="Status"
                                    labelId="isAttendedFilterLabel"
                                    value={isAttended}
                                    onChange={handleFilterChange}
                                    inputProps={{
                                        name: 'isAttended',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={true}>Checked</MenuItem>
                                    <MenuItem value={false}>Verified</MenuItem>
                                </Select>
                            </>
                            :
                            <>
                                <InputLabel id="isValidFilterLabel">Status</InputLabel>
                                <Select
                                    id="isValidFiler"
                                    label="Status"
                                    labelId="isValidFilterLabel"
                                    value={isValid}
                                    onChange={handleFilterChange}
                                    inputProps={{
                                        name: 'isValid',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={true}>Verified</MenuItem>
                                    <MenuItem value={false}>Invalid</MenuItem>
                                    <MenuItem value={"null"}>Pending</MenuItem>
                                </Select>
                            </>
                        }
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
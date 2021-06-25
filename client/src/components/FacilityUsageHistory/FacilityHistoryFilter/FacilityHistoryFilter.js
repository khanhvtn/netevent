import React from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { Grid, Typography, Button, Drawer } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
//import useStyles in the last
import useStyles from './styles';
const FacilityHistoryFilter = ({
    openFilter,
    handleToggleFilter,
    borrowFrom,
    returnFrom,
    setFilters,
    borrowTo,
    returnTo,
    handleClearFilter,
    handleApplyFilter,
}) => {
    const css = useStyles();
    return (
        <Drawer anchor="right" open={openFilter} onClose={handleToggleFilter}>
        <div className={css.filterTitle}>
            <Typography
                style={{ fontWeight: 'bold' }}
                align="center"
                variant="h6"
            >
                Filter Facility History
            </Typography>
        </div>
        <div className={css.filterWrapper}>
            <div className={css.filterInputs}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDateTimePicker
                            fullWidth
                            id="borrowFrom"
                            label="Borrowed From"
                            value={borrowFrom}
                            size="small"
                            margin="normal"
                            format="DD/MM/YYYY, h:mm a"
                            inputVariant="outlined"
                            onChange={(date) => {
                                setFilters((prevState) => ({
                                    ...prevState,
                                    borrowFrom: date.toDate(),
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDateTimePicker
                            fullWidth
                            id="borrowTo"
                            label="Borrowed To"
                            value={borrowTo}
                            size="small"
                            margin="normal"
                            format="DD/MM/YYYY, h:mm a"
                            inputVariant="outlined"
                            onChange={(date) => {
                                setFilters((prevState) => ({
                                    ...prevState,
                                    borrowTo: date.toDate(),
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDateTimePicker
                            fullWidth
                            id="returnFrom"
                            label="Returned From"
                            size="small"
                            margin="normal"
                            format="DD/MM/YYYY, h:mm a"
                            inputVariant="outlined"
                            value={returnFrom}
                            onChange={(date) => {
                                setFilters((prevState) => ({
                                    ...prevState,
                                    returnFrom: date.toDate(),
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDateTimePicker
                            fullWidth
                            id="returnTo"
                            label="Returned To"
                            size="small"
                            margin="normal"
                            format="DD/MM/YYYY, h:mm a"
                            inputVariant="outlined"
                            value={returnTo}
                            onChange={(date) => {
                                setFilters((prevState) => ({
                                    ...prevState,
                                    returnTo: date.toDate(),
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
    )
}

export default FacilityHistoryFilter;

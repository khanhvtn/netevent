import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const CalendarEvent = ({ event }) => {
    return (
        <Grid container alignItems="center" justify="space-around">
            <Typography style={{ flexGrow: 1 }} variant="subtitle1">
                {event.title}
            </Typography>
        </Grid>
    );
};

export default CalendarEvent;

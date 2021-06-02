import React from 'react';
import { Grid, Typography } from '@material-ui/core';
//import useStyles in the last
import useStyles from './styles';

const CalendarEvent = ({ event }) => {
    const css = useStyles();
    return (
        <Grid container alignItems="center" justify="space-around">
            <Typography style={{ flexGrow: 1 }} variant="subtitle1">
                {event.title}
            </Typography>
        </Grid>
    );
};

export default CalendarEvent;

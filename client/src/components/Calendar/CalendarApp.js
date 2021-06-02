import React, { useEffect, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {
    Paper,
    Dialog,
    DialogContent,
    Button,
    DialogActions,
} from '@material-ui/core';
import CreateEvent from '../CreateEvent/CreateEvent';

import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent } from '../../actions/eventActions';
import { Skeleton } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';
import CalendarEvent from './CalendarEvent/CalendarEvent';

const CalendarApp = () => {
    const css = useStyles();
    const [state, setState] = useState({ open: false, start: null, end: null });
    const dispatch = useDispatch();
    const { events, eventIsLoading, createEventSuccess } = useSelector(
        (state) => ({
            events: state.event.events,
            eventIsLoading: state.event.isLoading,
            createEventSuccess: state.event.createSuccess,
        })
    );
    const localizer = momentLocalizer(moment);
    useEffect(() => {
        dispatch(getAllEvent());
    }, [dispatch]);

    //useEffect for create event success
    useEffect(() => {
        if (createEventSuccess) {
            handleClose();
            dispatch(getAllEvent());
        }
    }, [dispatch, createEventSuccess]);

    const genEvents = events.map((event) => {
        const { eventName, startDate, endDate, ...rest } = event;
        return {
            title: eventName,
            start: new Date(startDate),
            end: new Date(endDate),
            resource: rest,
            allDay: false,
        };
    });

    const handleSelectEvent = (event) => {
        alert(`Go to event id : ${event.resource._id}`);
    };
    const handlePickEventTime = ({ start, end }) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (moment(start).isBefore(currentDate)) {
            alert('Invalid Range Time');
            return;
        }
        setState((prevState) => ({
            ...prevState,
            start,
            end,
            open: !prevState.open,
        }));
    };
    //handle toggle create form
    const handleClose = () => {
        setState((prevState) => ({ ...prevState, open: !prevState.open }));
    };
    return (
        <Paper
            elevation={3}
            style={{
                margin: '20px',
                padding: '20px',
            }}
        >
            {eventIsLoading ? (
                <>
                    <Skeleton height="100px" />
                    <Skeleton height="100px" />
                    <Skeleton height="100px" />
                    <Skeleton height="100px" />
                    <Skeleton height="100px" />
                </>
            ) : (
                <Calendar
                    popup
                    selectable
                    formats={{
                        agendaHeaderFormat: (
                            { start, end },
                            culture,
                            localizer
                        ) =>
                            localizer.format(start, 'DD/MM/YYYY', culture) +
                            ' — ' +
                            localizer.format(end, 'DD/MM/YYYY', culture),
                    }}
                    style={{ height: '100vh' }}
                    localizer={localizer}
                    events={genEvents}
                    defaultView={Views.MONTH}
                    scrollToTime={new Date()}
                    defaultDate={new Date()}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handlePickEventTime}
                    components={{
                        event: CalendarEvent,
                    }}
                    eventPropGetter={(date) => {
                        let styleTemplate = {
                            style: {
                                color: '#333',
                                outline: 'none',
                            },
                        };
                        const { isApproved } = date.resource;
                        /* Approve Status
                    Null is pending and color is yellow
                    True Accepted and color is green
                    False Rejected and color is red
                     */
                        if (isApproved === null) {
                            styleTemplate = {
                                ...styleTemplate,
                                style: {
                                    ...styleTemplate.style,
                                    backgroundColor: `rgba(251, 191, 36, 1)`,
                                },
                            };
                        } else if (isApproved === true) {
                            styleTemplate = {
                                ...styleTemplate,
                                style: {
                                    ...styleTemplate.style,
                                    backgroundColor: `rgba(52, 211, 153, 1)`,
                                },
                            };
                        } else {
                            styleTemplate = {
                                ...styleTemplate,
                                style: {
                                    ...styleTemplate.style,
                                    backgroundColor: `rgba(248, 113, 113, 1)`,
                                },
                            };
                        }
                        return styleTemplate;
                    }}
                />
            )}
            {/* Dialog Create Event */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={state.open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <CreateEvent
                    startDate={state.start}
                    endDate={state.end}
                    handleCloseCreateDialog={handleClose}
                />
            </Dialog>
        </Paper>
    );
};

export default CalendarApp;

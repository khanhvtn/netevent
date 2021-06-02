import React, { useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Paper } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent } from '../../actions/eventActions';
//import useStyles in the last
import useStyles from './styles';
import CalendarEvent from './CalendarEvent/CalendarEvent';

const CalendarApp = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { events } = useSelector((state) => ({
        events: state.event.events,
    }));
    const localizer = momentLocalizer(moment);
    useEffect(() => {
        dispatch(getAllEvent());
    }, [dispatch]);

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
        console.log(start, end);
    };
    return (
        <Paper
            elevation={3}
            style={{
                margin: '20px',
                padding: '20px',
            }}
        >
            <Calendar
                popup
                selectable
                style={{ height: 800 }}
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
        </Paper>
    );
};

export default CalendarApp;

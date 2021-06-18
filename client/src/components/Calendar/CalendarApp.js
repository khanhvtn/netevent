import React, { useEffect, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Paper, Dialog } from '@material-ui/core';
import CreateEvent from '../CreateEvent/CreateEvent';

import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../actions/eventActions';
import { Skeleton } from '@material-ui/lab';
import CalendarEvent from './CalendarEvent/CalendarEvent';
import { useHistory } from 'react-router-dom';

const CalendarApp = ({ targetRole }) => {
  const [state, setState] = useState({ open: false, start: null, end: null });
  const dispatch = useDispatch();
  const history = useHistory();
  const { events, eventIsLoading, createEventSuccess, userId } = useSelector(
    (state) => ({
      events: state.event.events,
      eventIsLoading: state.event.isLoading,
      createEventSuccess: state.event.createSuccess,
      userId: state.user.user.id
    })
  );
  const localizer = momentLocalizer(moment);
  useEffect(() => {
    if (!history.location.state || history.location.state?.isUpdated) {
      if (targetRole === 3) {
        dispatch(getEvents({ ownerId: userId }));
      }
      if (targetRole === 2) {
        dispatch(getEvents({}));
      }
    }
    history.replace();
  }, [dispatch, history, userId, targetRole]);

  //useEffect for create event success
  useEffect(() => {
    if (createEventSuccess) {
      handleClose();
      dispatch(getEvents({ ownerId: userId }));
    }
  }, [dispatch, createEventSuccess, userId]);

  const genEvents = events.map((event) => {
    const { eventName, startDate, endDate, ...rest } = event;
    return {
      title: eventName,
      start: new Date(startDate),
      end: new Date(endDate),
      resource: rest,
      allDay: false
    };
  });

  const handleSelectEvent = (event) => {
    history.push({
      pathname:
        targetRole === 3
          ? `/dashboard/creator/event-detail/${event.resource.urlCode}`
          : `/dashboard/reviewer/event-review/${event.resource.urlCode}`,
      state: {
        from:
          targetRole === 3
            ? `/dashboard/creator/calendar`
            : `/dashboard/reviewer/calendar`
      }
    });
  };

  const handlePickEventTime = ({ start, end }) => {
    if (targetRole === 3) {
      console.log('here');
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
        open: !prevState.open
      }));
    }
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
        padding: '20px'
      }}>
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
            agendaHeaderFormat: ({ start, end }, culture, localizer) =>
              localizer.format(start, 'DD/MM/YYYY', culture) +
              ' — ' +
              localizer.format(end, 'DD/MM/YYYY', culture)
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
            event: CalendarEvent
          }}
          eventPropGetter={(date) => {
            let styleTemplate = {
              style: {
                color: 'white',
                outline: 'none'
              }
            };
            const { isApproved, isFinished } = date.resource;
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
                  backgroundColor: `#9e9e9e`
                }
              };
            } else if (isFinished === true) {
              styleTemplate = {
                ...styleTemplate,
                style: {
                  ...styleTemplate.style,
                  backgroundColor: `#4caf50`
                }
              };
            } else if (isApproved === true) {
              styleTemplate = {
                ...styleTemplate,
                style: {
                  ...styleTemplate.style,
                  backgroundColor: `#5c6bc0`
                }
              };
            } else {
              styleTemplate = {
                ...styleTemplate,
                style: {
                  ...styleTemplate.style,
                  backgroundColor: `#e53935`
                }
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
        aria-labelledby="max-width-dialog-title">
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

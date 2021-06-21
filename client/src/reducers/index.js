import { combineReducers } from 'redux';
import userReducers from './userReducers';
import errorReducers from './errorReducers';
import linkReducers from './linkReducers';
import facilityReducers from './facilityReducers';
import eventTypeReducers from './eventTypeReducers';
import eventReducers from './eventReducers';
import facilityHistoryReducers from './facilityHistoryReducers';
import participantReducers from './participantReducers';
import notificationHistoryReducers from './notificationHistoryReducers';
import taskReducers from './taskReducers';

const rootReducers = combineReducers({
    user: userReducers,
    error: errorReducers,
    link: linkReducers,
    facility: facilityReducers,
    eventType: eventTypeReducers,
    event: eventReducers,
    facilityHistory: facilityHistoryReducers,
    participant: participantReducers,
    notificationHistory: notificationHistoryReducers,
    task: taskReducers
});

export default rootReducers;

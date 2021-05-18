import { combineReducers } from 'redux';
import userReducers from './userReducers';
import errorReducers from './errorReducers';
import linkReducers from './linkReducers';
import facilityReducers from './facilityReducers';
import eventTypeReducers from './eventTypeReducers';
const rootReducers = combineReducers({
    user: userReducers,
    error: errorReducers,
    link: linkReducers,
    facility: facilityReducers,
    eventType: eventTypeReducers,
});
export default rootReducers;

import { combineReducers } from 'redux';
import userReducers from './userReducers';
import errorReducers from './errorReducers';
import linkReducers from './linkReducers';
import facilityReducers from './facilityReducers';

const rootReducers = combineReducers({
    user: userReducers,
    error: errorReducers,
    link: linkReducers,
    facility: facilityReducers
});

export default rootReducers;

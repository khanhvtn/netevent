import { combineReducers } from 'redux';
import userReducers from './userReducers';
import errorReducers from './errorReducers';
import linkReducers from './linkReducers'
const rootReducers = combineReducers({
    user: userReducers,
    error: errorReducers,
    link: linkReducers
});
export default rootReducers;

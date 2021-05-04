import { combineReducers } from 'redux';
import userReducers from './userReducers';
import errorReducers from './errorReducers';

const rootReducers = combineReducers({
    user: userReducers,
    error: errorReducers,
});
export default rootReducers;

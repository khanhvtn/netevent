import { ERROR, ERROR_CLEAR } from '../constants';

const initialState = {
    errors: null
};

export default function errorReducers(state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return { ...state, errors: action.payload };
        case ERROR_CLEAR:
            return initialState;
        default:
            return state;
    }
}

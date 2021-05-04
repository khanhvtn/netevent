import { ERROR, ERROR_CLEAR } from '../constants';

const initialState = {
    error: null,
};

export default function errorReducers(state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return { ...state, error: action.payload };
        case ERROR_CLEAR:
            return initialState;
        default:
            return state;
    }
}

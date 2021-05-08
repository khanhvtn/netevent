import {
    USER_CHECK,
    USER_LOGIN,
    USER_LOADING,
    USER_CHECKING,
} from '../constants';

const initialState = {
    isUserChecking: false,
    isLoading: false,
    user: null,
};

export default function userReducers(state = initialState, action) {
    switch (action.type) {
        case USER_CHECK:
            return { ...state, user: action.payload };
        case USER_LOGIN:
            return { ...state, user: action.payload };
        case USER_LOADING:
            return { ...state, isLoading: action.payload };
        case USER_CHECKING:
            return { ...state, isUserChecking: action.payload };
        default:
            return state;
    }
}

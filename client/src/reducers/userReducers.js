import {
    USER_CHECK,
    USER_LOGIN,
    USER_LOADING,
    USER_CHECKING,
    USER_CREATE,
    USER_CONFIRM,
    USER_IS_CONFIRM,
    FETCH_ALL_USERS,
    SEARCH_USER,
    DELETE_USER,
    USER_LOGOUT,
} from '../constants';

const initialState = {
    isUserChecking: false,
    isLoading: false,
    isConfirm: false,
    user: null,
    users: []
};

export default function userReducers(state = initialState, action) {
    switch (action.type) {
        case USER_CHECK:
            return { ...state, user: action.payload };
        case USER_CREATE:
            return { ...state, user: action.payload }
        case USER_CONFIRM:
            return { ...state, user: action.payload }
        case USER_IS_CONFIRM:
            return { ...state, isConfirm: action.payload }
        case USER_LOGIN:
            return { ...state, user: action.payload };
        case USER_LOGOUT:
            return initialState;
        case USER_LOADING:
            return { ...state, isLoading: action.payload };
        case USER_CHECKING:
            return { ...state, isUserChecking: action.payload };
        case FETCH_ALL_USERS:
            return { ...state, users: action.payload };
        case SEARCH_USER:
            return { ...state, users: action.payload }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.payload)
            }
        default:
            return state;
    }
}

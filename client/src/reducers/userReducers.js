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
    UPDATE_USER,
    DELETE_USER,
    USER_LOGOUT,
    USER_PICK_ROLE,
    USER_CREATE_SUCCESSFUL,
    USER_UPDATE_SUCCESSFUL,
    FILTER_USER_ROLE
} from '../constants';

const initialState = {
    isUserChecking: false,
    isLoading: false,
    isConfirm: false,
    user: null,
    pickedRoleNum: null,
    users: [],
    isCreated: false,
    isUpdated: false,
};

export default function userReducers(state = initialState, action) {
    switch (action.type) {
        case USER_CHECK:
            return { ...state, user: action.payload };
        case USER_CREATE:
            return { ...state, user: action.payload };
        case USER_CREATE_SUCCESSFUL:
            return { ...state, isCreated: action.payload }
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
        case USER_PICK_ROLE:
            return { ...state, pickedRoleNum: action.payload };
        case FETCH_ALL_USERS:
            return { ...state, users: action.payload.data };
        case FILTER_USER_ROLE:
            return { ...state, users: action.payload.data };
        case SEARCH_USER:
            return { ...state, users: action.payload.data };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) => action.payload.data._id === user._id ? action.payload.data : user)
            }
        case USER_UPDATE_SUCCESSFUL:
            return { ...state, isUpdated: action.payload }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user._id !== action.payload
                ),
            };
        default:
            return state;
    }
}

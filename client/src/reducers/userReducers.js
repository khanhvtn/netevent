import {
  USER_CHECK,
  USER_LOGIN,
  USER_LOADING,
  USER_CHECKING,
  USER_CONFIRM,
  USER_IS_CONFIRM,
  FETCH_ALL_USERS,
  FETCH_CURRENT_USER,
  USER_LOGOUT,
  USER_PICK_ROLE,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  GET_ALL_USERS
} from '../constants';

const initialState = {
  isUserChecking: false,
  isLoading: false,
  isConfirm: false,
  pickedRoleNum: null,
  users: [],
  user: null,
  totalPages: null,
  isCreated: false,
  isUpdated: false,
  isDeleted: false
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    // AUTH
    case USER_LOGIN:
      return { ...state, user: action.payload };
    case USER_LOGOUT:
      return initialState;
    case USER_LOADING:
      return { ...state, isLoading: action.payload };
    case USER_PICK_ROLE:
      return { ...state, pickedRoleNum: action.payload };

    // CONFIRMATION
    case USER_CONFIRM:
      return { ...state, user: action.payload };
    case USER_IS_CONFIRM:
      return { ...state, isConfirm: action.payload };
    case USER_CHECK:
      return { ...state, user: action.payload };
    case USER_CHECKING:
      return { ...state, isUserChecking: action.payload };

    // CRUD
    case FETCH_ALL_USERS:
      return {
        ...state,
        users: action.payload.data.data,
        totalPages: action.payload.data.totalPages
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.data.data
      };
    case FETCH_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };

    // SNACKBAR
    case USER_CREATE_SUCCESS:
      return { ...state, isCreated: action.payload };
    case USER_UPDATE_SUCCESS:
      return { ...state, isUpdated: action.payload };
    case USER_DELETE_SUCCESS:
      return { ...state, isDeleted: action.payload };
    default:
      return state;
  }
}

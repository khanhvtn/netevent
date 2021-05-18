//user action types
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_CHECK = 'USER_CHECK';
export const USER_LOADING = 'USER_LOADING';
export const USER_CHECKING = 'USER_CHECKING';
export const USER_PICK_ROLE = 'USER_PICK_ROLE';

export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';

export const USER_CREATE = 'USER_CREATE';
export const USER_CONFIRM = 'USER_CONFIRM';
export const USER_IS_CONFIRM = 'USER_IS_CONFIRM';

export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const DELETE_USER = 'DELETE_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const UPDATE_USER = 'UPDATE_USER';

//error action types
export const ERROR = 'ERROR';
export const ERROR_CLEAR = 'ERROR_CLEAR';

//error form handle create users
export const EMAIL_ERROR = 'Email must not be empty and in right format';
export const ROLE_ERROR = 'Role must not be empty';
export const PASSWORD_MATCHED =
    'Passwords must be matched and should not be empty';

//link action types
export const GET_LINKS = 'GET_LIKKS';
export const GET_LINK_COMPLETE = 'GET_LINK_COMPLETE';

//Facility action types
export const FACILITY_GET_ALL = 'FACILITY_GET_ALL';
export const FACILITY_LOADING = 'FACILITY_LOADING';
export const FACILITY_CREATE = 'FACILITY_CREATE';
export const FACILITY_UPDATE = 'FACILITY_UPDATE';
export const FACILITY_DELETE = 'FACILITY_DELETE';
export const FACILITY_CREATE_SUCCESS = 'FACILITY_CREATE_SUCCESS';
export const FACILITY_UPDATE_SUCCESS = 'FACILITY_UPDATE_SUCCESS';
export const FACILITY_DELETE_SUCCESS = 'FACILITY_DELETE_SUCCESS';

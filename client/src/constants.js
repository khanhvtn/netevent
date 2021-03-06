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
export const GET_ALL_USERS = 'GET_ALL_USERS';
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
export const GET_LINK_BY_ID = 'GET_LINK_BY_ID';
//Facility action types
export const FACILITY_GET_ALL = 'FACILITY_GET_ALL';
export const FACILITY_GET_ALL_FILTER = 'FACILITY_GET_ALL_FILTER';
export const FACILITY_LOADING = 'FACILITY_LOADING';
export const FACILITY_CREATE = 'FACILITY_CREATE';
export const FACILITY_UPDATE = 'FACILITY_UPDATE';
export const FACILITY_DELETE = 'FACILITY_DELETE';
export const FACILITY_RECOVERY = 'FACILITY_RECOVERY';
export const FACILITY_CREATE_SUCCESS = 'FACILITY_CREATE_SUCCESS';
export const FACILITY_UPDATE_SUCCESS = 'FACILITY_UPDATE_SUCCESS';
export const FACILITY_DELETE_SUCCESS = 'FACILITY_DELETE_SUCCESS';
export const FACILITY_RECOVERY_SUCCESS = 'FACILITY_RECOVERY_SUCCESS';
export const FACILITY_GET_EACH = 'FACILITY_GET_EACH';
//Event Type action types
export const EVENT_TYPE_GET_ALL = 'EVENT_TYPE_GET_ALL';
export const EVENT_TYPE_GET_ALL_FILTER = 'EVENT_TYPE_GET_ALL_FILTER';
export const EVENT_TYPE_LOADING = 'EVENT_TYPE_LOADING';
export const EVENT_TYPE_CREATE = 'EVENT_TYPE_CREATE';
export const EVENT_TYPE_UPDATE = 'EVENT_TYPE_UPDATE';
export const EVENT_TYPE_DELETE = 'EVENT_TYPE_DELETE';
export const EVENT_TYPE_CREATE_SUCCESS = 'EVENT_TYPE_CREATE_SUCCESS';
export const EVENT_TYPE_UPDATE_SUCCESS = 'EVENT_TYPE_UPDATE_SUCCESS';
export const EVENT_TYPE_DELETE_SUCCESS = 'EVENT_TYPE_DELETE_SUCCESS';
export const EVENT_TYPE_RECOVERY = 'EVENT_TYPE_RECOVERY';
export const EVENT_TYPE_RECOVERY_SUCCESS = 'EVENT_TYPE_RECOVERY_SUCCESS';

// Event actions types
export const EVENT_GET_ALL = 'EVENT_GET_ALL';
export const EVENT_LOADING = 'EVENT_LOADING';
export const EVENT_DETAIL_LOADING = 'EVENT_DETAIL_LOADING';
export const EVENT_CREATE = 'EVENT_CREATE';
export const EVENT_UPDATE = 'EVENT_UPDATE';
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS';
export const IS_SENDING_NOTIFICATION = 'IS_SENDING_NOTIFICATION';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const SEND_NOTI_SUCCESS = 'SEND_SUCCESS';
export const GET_EVENTS_COMPLETE = 'GET_EVENTS_COMPLETE';
export const EVENT_UPDATE_SUCCESS = 'EVENT_UPDATE_SUCCESS';
export const EVENT_DELETE_SUCCESS = 'EVENT_DELETE_SUCCESS';
export const EVENT_RECOVERY_SUCCESS = 'EVENT_RECOVERY_SUCCESS';
export const EVENT_GET_ALL_FILTER = 'EVENT_GET_ALL_FILTER';
export const EVENT_GET_FACILITY_AND_TASK = 'EVENT_GET_FACILITY_AND_TASK';
export const GET_EVENT_ANALYSIS = 'GET_EVENT_ANALYSIS';
export const GET_EVENT_ANALYSIS_BY_ID = 'GET_EVENT_ANALYSIS_BY_ID';

export const LOADING_ANALYSIS = 'LOADING_ANALYSIS';
//Facility action types
export const FACILITY_HISTORY_GET_ALL = 'FACILITY_HISTORY_GET_ALL';
export const FACILITY_HISTORY_LOADING = 'FACILITY_HISTORY_LOADING';
export const FACILITY_HISTORY_GET_ALL_FILTER =
    'FACILITY_HISTORY_GET_ALL_FILTER';

//Participant action types
export const PARTICIPANT_GET_ALL_FILTER = 'PARTICIPANT_GET_ALL_FILTER';
export const PARTICIPANT_REGISTER = 'PARTICIPANT_REGISTER';
export const PARTICIPANT_LOADING = 'PARTICIPANT_LOADING';
export const PARTICIPANT_UPDATE_SUCCESS = 'PARTICIPANT_UPDATE_SUCCESS';
export const PARTICIPANT_GET_ALL_SUGGESTED = 'PARTICIPANT_GET_ALL_SUGGESTED';
export const PARTICIPANT_INVITATION_LIST_EMAIL =
    'PARTICIPANT_INVITATION_LIST_EMAIL';
export const PARTICIPANT_INVITE = 'PARTICIPANT_INVITE';
export const INVITATION_LOADING = 'INVITATION_LOADING';
export const PARTICIPANT_SPINNER_INDEX = 'PARTICIPANT_SPINNER_INDEX';
export const PARTICIPANT_SEND_FEEDBACK = 'PARTICIPANT_SEND_FEEDBACK';
export const PARTICIPANT_SUBMIT_FEEBACK_LOADING =
    'PARTICIPANT_SUBMIT_FEEBACK_LOADING';
export const PARTICIPANT_SUBMIT_SUCCESS = 'PARTICIPANT_SUBMIT_SUCCESS';
export const PARTICIPANT_GET_FEEDBACK = 'PARTICIPANT_GET_FEEDBACK';
export const PARTICIPANT_FETCHING = 'PARTICIPANT_FETCHING';
export const PARTICIPANT_FETCH_DATA = 'PARTICIPANT_FETCH_DATA';
export const PARTICIPANT_SUGGESTED_LOADING = 'PARTICIPANT_SUGGESTED_LOADING';

//Notification history action types
export const NOTIFICATION_HISTORY_LOADING = 'NOTIFICATION_HISTORY_LOADING';
export const NOTIFICATION_HISTORY_GET_ALL = 'NOTIFICATION_HISTORY_GET_ALL';

//Task action types
export const TASK_LOADING = 'TASK_LOADING';
export const TASK_GET_ALL = 'TASK_GET_ALL';
export const TASK_GET_ALL_FILTER = 'TASK_GET_ALL_FILTER';

//Feedback action types
export const FEEDBACK_LOADING = 'FEEDBACK_LOADING';
export const GET_FEEDBACK_BY_ID = 'GET_FEEDBACK_BY_ID';

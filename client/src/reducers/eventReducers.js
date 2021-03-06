import {
    EVENT_CREATE_SUCCESS,
    EVENT_LOADING,
    IS_SENDING_NOTIFICATION,
    FETCH_EVENTS,
    SEND_NOTI_SUCCESS,
    GET_EVENTS_COMPLETE,
    EVENT_GET_ALL,
    EVENT_GET_ALL_FILTER,
    EVENT_UPDATE_SUCCESS,
    EVENT_DELETE_SUCCESS,
    EVENT_GET_FACILITY_AND_TASK,
    EVENT_DETAIL_LOADING,
    EVENT_UPDATE,
    EVENT_RECOVERY_SUCCESS,
    GET_EVENT_ANALYSIS,
    GET_EVENT_ANALYSIS_BY_ID,
    LOADING_ANALYSIS
} from '../constants';

const initialState = {
    isLoading: false,
    loadingAnalysis: false,
    loadComplete: false,
    isDetailLoading: false,
    events: [],
    analysis: [],
    analysisByID: [],
    eventDetail: null,
    totalPages: null,
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    recoverySuccess: false,
    isSendingNotification: false,
    sendNotiSuccess: false
};

export default function eventReducers(state = initialState, action) {
    switch (action.type) {
        case EVENT_GET_ALL:
            return { ...state, events: action.payload.data.data };
        case EVENT_LOADING:
            return { ...state, isLoading: action.payload };
        case LOADING_ANALYSIS:
            return { ...state, loadingAnalysis: action.payload };
        case FETCH_EVENTS:
            return { ...state, events: action.payload.data.data };
        case IS_SENDING_NOTIFICATION:
            return { ...state, isSendingNotification: action.payload };
        case SEND_NOTI_SUCCESS:
            return { ...state, sendNotiSuccess: action.payload };
        case GET_EVENTS_COMPLETE:
            return { ...state, loadComplete: action.payload };
        case EVENT_DETAIL_LOADING:
            return { ...state, isDetailLoading: action.payload };
        case EVENT_GET_ALL_FILTER:
            return {
                ...state,
                events: action.payload.data?.data,
                totalPages: action.payload.data?.totalPages
            };
        case EVENT_GET_FACILITY_AND_TASK:
            return {
                ...state,
                eventDetail: action.payload.data?.data
            };
        case EVENT_UPDATE:
            return {
                ...state,
                eventDetail: action.payload.data?.data
            };
        case EVENT_CREATE_SUCCESS:
            return { ...state, createSuccess: action.payload };
        case EVENT_UPDATE_SUCCESS:
            return { ...state, updateSuccess: action.payload };
        case EVENT_DELETE_SUCCESS:
            return { ...state, deleteSuccess: action.payload };
        case EVENT_RECOVERY_SUCCESS:
            return { ...state, recoverySuccess: action.payload };
        case GET_EVENT_ANALYSIS:
            return { ...state, analysis: action.payload.data.data };
        case GET_EVENT_ANALYSIS_BY_ID:
            return { ...state, analysisByID: action.payload.data.data };
        default:
            return state;
    }
}

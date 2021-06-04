import { EVENT_CREATE_SUCCESS, EVENT_LOADING, IS_SENDING_NOTIFICATION, FETCH_EVENTS, SEND_SUCCESS, GET_EVENTS_COMPLETE } from '../constants';

const initialState = {
    isLoading: false,
    loadComplete: false,
    events: [],
    totalPages: null,
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    isSendingNotification: false,
};

export default function facilityReducers(state = initialState, action) {
    switch (action.type) {
        case EVENT_LOADING:
            return { ...state, isLoading: action.payload };
        case FETCH_EVENTS:
            return { ...state, events: action.payload }
        case EVENT_CREATE_SUCCESS:
            return { ...state, createSuccess: action.payload };
        case IS_SENDING_NOTIFICATION:
            return { ...state, isSendingNotification: action.payload}
        case SEND_SUCCESS:
            return { ...state, createSuccess: action.payload }
        case GET_EVENTS_COMPLETE:
            return {...state, loadComplete: action.payload}

        default:
            return state;
    }
}
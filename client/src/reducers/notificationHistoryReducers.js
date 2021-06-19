import {
    NOTIFICATION_HISTORY_LOADING,
    NOTIFICATION_HISTORY_GET_ALL
} from '../constants';

const initialState = {
    isLoading: false,
    notificationHistories: []
};

export default function notificationHistoryReducers(
    state = initialState,
    action
) {
    switch (action.type) {
        case NOTIFICATION_HISTORY_GET_ALL:
            return {
                ...state,
                notificationHistories: action.payload.data?.data
            };
        case NOTIFICATION_HISTORY_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}

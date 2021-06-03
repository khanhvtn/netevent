import {
    EVENT_LOADING,
    EVENT_GET_ALL_FILTER,
    EVENT_CREATE_SUCCESS,
    EVENT_UPDATE_SUCCESS,
    EVENT_DELETE_SUCCESS,
    EVENT_GET_FACILITY_AND_TASK
} from '../constants';

const initialState = {
    isLoading: false,
    events: [],
    eventDetail: null,
    totalPages: null,
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
};

export default function eventReducers(state = initialState, action) {
    switch (action.type) {
        case EVENT_LOADING:
            return { ...state, isLoading: action.payload };
        case EVENT_GET_ALL_FILTER:
            return {
                ...state,
                events: action.payload.data?.data,
                totalPages: action.payload.data?.totalPages
            }
        case EVENT_GET_FACILITY_AND_TASK:
            return {
                ...state,
                eventDetail: action.payload.data?.data
            }
        case EVENT_CREATE_SUCCESS:
            return { ...state, createSuccess: action.payload };
        case EVENT_UPDATE_SUCCESS:
            return { ...state, updateSuccess: action.payload };
        case EVENT_DELETE_SUCCESS:
            return { ...state, deleteSuccess: action.payload };
        default:
            return state;
    }
}
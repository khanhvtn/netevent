import { EVENT_CREATE_SUCCESS, EVENT_LOADING } from '../constants';

const initialState = {
    isLoading: false,
    events: [],
    totalPages: null,
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
};

export default function eventReducers(state = initialState, action) {
    switch (action.type) {
        case EVENT_LOADING:
            return { ...state, isLoading: action.payload };
        case EVENT_CREATE_SUCCESS:
            return { ...state, createSuccess: action.payload };
        default:
            return state;
    }
}
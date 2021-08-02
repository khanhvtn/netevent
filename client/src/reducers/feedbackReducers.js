import { FEEDBACK_LOADING, GET_FEEDBACK_BY_ID } from '../constants';

const initialState = {
    isLoading: false,
    feedbacks: []
};

export default function feedbackReducers(state = initialState, action) {
    switch (action.type) {
        case FEEDBACK_LOADING:
            return { ...state, isLoading: action.payload };
        case GET_FEEDBACK_BY_ID:
            return { ...state, feedbacks: action.payload.data.data };
        default:
            return state;
    }
}

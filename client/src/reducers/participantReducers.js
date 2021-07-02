import {
    PARTICIPANT_REGISTER,
    PARTICIPANT_LOADING,
    PARTICIPANT_GET_ALL_FILTER,
    PARTICIPANT_UPDATE_SUCCESS,
    PARTICIPANT_ALL
} from '../constants';

const initialState = {
    participants: [],
    complete: false,
    isLoading: false,
    totalPages: null,
    isUpdated: false,
    allParticipants: []
};

export default function participantReducers(state = initialState, action) {
    switch (action.type) {
        case PARTICIPANT_LOADING:
            return { ...state, isLoading: action.payload };
        case PARTICIPANT_UPDATE_SUCCESS:
            return { ...state, isUpdated: action.payload };
        case PARTICIPANT_ALL:
            return { ...state, allParticipants: action.payload.data.data };
        case PARTICIPANT_GET_ALL_FILTER:
            return {
                ...state,
                participants: action.payload.data?.data,
                totalPages: action.payload.data?.totalPages
            };
        // case SET_INVALID_VERIFIED:
        //     return {
        //         ...state
        //     }
        case PARTICIPANT_REGISTER:
            return { ...state, complete: action.payload };
        default:
            return state;
    }
}

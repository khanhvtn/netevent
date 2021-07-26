import {
    PARTICIPANT_REGISTER,
    PARTICIPANT_LOADING,
    PARTICIPANT_GET_ALL_FILTER,
    PARTICIPANT_UPDATE_SUCCESS,
    PARTICIPANT_ALL,
    PARTICIPANT_INVITATION_LIST_EMAIL,
    PARTICIPANT_INVITE,
    PARTICIPANT_SPINNER_INDEX,
    INVITATION_LOADING,
    PARTICIPANT_FETCHING,
    PARTICIPANT_FETCH_DATA
} from '../constants';

const initialState = {
    participants: [],
    complete: false,
    isLoading: false,
    totalPages: null,
    isUpdated: false,
    isInviteLoading: false,
    invitationListEmail: [],
    suggestedParticipants: [],
    spinnerIndex: null,
    isFetching: false
};

export default function participantReducers(state = initialState, action) {
    switch (action.type) {
        case PARTICIPANT_LOADING:
            return { ...state, isLoading: action.payload };
        case PARTICIPANT_UPDATE_SUCCESS:
            return { ...state, isUpdated: action.payload };
        case PARTICIPANT_ALL:
            return {
                ...state,
                suggestedParticipants:
                    action.payload.data?.data.suggestedParticipants
            };
        case PARTICIPANT_GET_ALL_FILTER:
            return {
                ...state,
                participants: action.payload.data?.data,
                totalPages: action.payload.data?.totalPages
            };
        case PARTICIPANT_INVITATION_LIST_EMAIL:
            return {
                ...state,
                invitationListEmail:
                    action.payload.data?.data.invitationListEmail
            };
        case PARTICIPANT_INVITE:
            return {
                ...state,
                invitationListEmail: action.payload.data?.data
            };
        case PARTICIPANT_SPINNER_INDEX:
            return {
                ...state,
                spinnerIndex: action.payload
            };
        case INVITATION_LOADING:
            return {
                ...state,
                isInviteLoading: action.payload
            };
        case PARTICIPANT_REGISTER:
            return { ...state, complete: action.payload };

        case PARTICIPANT_FETCH_DATA:
            return {
                ...state,
                participants: [
                    ...state.participants,
                    ...action.payload.data?.data
                ]
            };
        case PARTICIPANT_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        default:
            return state;
    }
}

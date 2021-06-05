import { PARTICIPANT_REGISTER, PARTICIPANT_LOADING } from '../constants'

const initialState = {
    complete: false,
    isLoading: false
}

export default function participantReducers(state = initialState, action) {
    switch (action.type) {
        case PARTICIPANT_LOADING:
            return { ...state, isLoading: action.payload }
        case PARTICIPANT_REGISTER:
            return { ...state, complete: action.payload }
        default:
            return state
    }
}
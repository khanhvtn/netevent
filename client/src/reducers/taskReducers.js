import {
    TASK_LOADING,
    TASK_GET_ALL_FILTER,
} from '../constants'

const initialState = {
    tasks: [],
    isLoading: false,
    totalPages: null,
}

export default function taskReducers(state = initialState, action) {
    switch (action.type) {
        case TASK_LOADING:
            return { ...state, isLoading: action.payload }
        case TASK_GET_ALL_FILTER:
            return {
                ...state,
                tasks: action.payload.data?.data,
            }
        default:
            return state
    }
}
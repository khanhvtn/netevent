import {
    FACILITY_LOADING,
    CREATE_FACILITY,
    FETCH_ALL_FACILITIES,
    UPDATE_FACILITY,
    DELETE_FACILITY,
    FACILITY_CREATE_SUCCESS,
    FACILITY_UPDATE_SUCCESS,
} from '../constants';

const initialState = {
    isLoading: false,
    isCreated: false,
    isUpdated: false,
    facility: null,
    facilities: [],
};

export default function errorReducers(state = initialState, action) {
    switch (action.type) {
        case FACILITY_LOADING:
            return { ...state, isLoading: action.payload };
        case CREATE_FACILITY:
            return { ...state, facility: action.payload };
        case FACILITY_CREATE_SUCCESS:
            return { ...state, isCreated: action.payload };
        case FACILITY_UPDATE_SUCCESS:
            return { ...state, isUpdated: action.payload };
        case FETCH_ALL_FACILITIES:
            return { ...state, facilities: action.payload };
        case UPDATE_FACILITY:
            return {
                ...state,
                facilities: state.facilities.map(
                    (facility) => action.payload._id === facility._id ? action.payload : facility)
            };
        case DELETE_FACILITY:
            return {
                ...state,
                facilities: state.facilities.filter(
                    (facility) => action.payload !== facility._id
                )
            }
        default:
            return state;
    }
}

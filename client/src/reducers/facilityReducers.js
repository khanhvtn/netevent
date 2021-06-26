import {
    FACILITY_GET_ALL,
    FACILITY_LOADING,
    FACILITY_CREATE_SUCCESS,
    FACILITY_UPDATE_SUCCESS,
    FACILITY_DELETE_SUCCESS,
    FACILITY_GET_ALL_FILTER,
    FACILITY_RECOVERY_SUCCESS,
    FACILITY_GET_EACH
} from '../constants';

const initialState = {
    isLoading: false,
    facilities: [],
    totalPages: null,
    facilityEach: {},
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    recoverySuccess: false
};

export default function facilityReducers(state = initialState, action) {
    switch (action.type) {
        case FACILITY_GET_ALL:
            return {
                ...state,
                facilities: action.payload.data.data
            };
        case FACILITY_GET_ALL_FILTER:
            return {
                ...state,
                facilities: action.payload.data.data,
                totalPages: action.payload.data.totalPages
            };
        case FACILITY_LOADING:
            return { ...state, isLoading: action.payload };
        case FACILITY_CREATE_SUCCESS:
            return { ...state, createSuccess: action.payload };
        case FACILITY_UPDATE_SUCCESS:
            return { ...state, updateSuccess: action.payload };
        case FACILITY_DELETE_SUCCESS:
            return { ...state, deleteSuccess: action.payload };
        case FACILITY_RECOVERY_SUCCESS:
            return { ...state, recoverySuccess: action.payload };
        case FACILITY_GET_EACH:
            return { ...state, facilityEach: action.payload.data.data };
        default:
            return state;
    }
}

import {
    FACILITY_HISTORY_LOADING,
    FACILITY_HISTORY_GET_ALL,
    FACILITY_HISTORY_GET_ALL_FILTER,
} from '../../constants';
import facilityHistoryReducers from '../facilityHistoryReducers'
import expect from 'expect'

describe('FACILITY HISTORY REDUCER', () => {
    const initialState = {
        isLoading: false,
        facilityHistories: [],
        totalPages: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
    };
    it('Should return default state', () => {
        const action = facilityHistoryReducers(undefined, {})
        expect(action).toEqual(initialState)
    });
    it('Should return FACILITY_HISTORY_LOADING', () => {
        const action = facilityHistoryReducers(initialState, {
            type: FACILITY_HISTORY_LOADING
        })
        expect(action).toEqual({
            isLoading: action.payload,
            facilityHistories: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: false,
        })
    });
})
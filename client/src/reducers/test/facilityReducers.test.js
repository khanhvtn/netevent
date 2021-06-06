import {
    FACILITY_GET_ALL,
    FACILITY_LOADING,
    FACILITY_CREATE_SUCCESS,
    FACILITY_UPDATE_SUCCESS,
    FACILITY_DELETE_SUCCESS,
    FACILITY_GET_ALL_FILTER,
} from '../../constants';
import facilityReducers from '../facilityReducers'
import expect from 'expect'

describe('FACILITY REDUCER', () => {
    const initialState = {
        isLoading: false,
        facilities: [],
        totalPages: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
    };
    it('should return default state', () => {
        const action = facilityReducers(undefined, {})
        expect(action).toMatchSnapshot(initialState)
    });
    it('should return FACILITY_LOADING', () => {
        const action = facilityReducers(initialState, {
            type: FACILITY_LOADING
        })
        expect(action).toMatchSnapshot({
            isLoading: action.payload,
            facilities: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: false,
        })
    });
    it('should return FACILITY_CREATE_SUCCESS', () => {
        const action = facilityReducers(initialState, {
            type: FACILITY_CREATE_SUCCESS
        })
        expect(action).toMatchSnapshot({
            isLoading: false,
            facilities: [],
            totalPages: null,
            createSuccess: action.payload,
            updateSuccess: false,
            deleteSuccess: false,
        })
    });
    it('should return FACILITY_UPDATE_SUCCESS', () => {
        const action = facilityReducers(initialState, {
            type: FACILITY_UPDATE_SUCCESS
        })
        expect(action).toMatchSnapshot({
            isLoading: false,
            facilities: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: action.payload,
            deleteSuccess: false,
        })
    });
    it('should return FACILITY_DELETE_SUCCESS', () => {
        const action = facilityReducers(initialState, {
            type: FACILITY_DELETE_SUCCESS
        })
        expect(action).toMatchSnapshot({
            isLoading: false,
            facilities: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: action.payload,
        })
    });
})
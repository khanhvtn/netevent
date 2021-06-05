import {
    EVENT_TYPE_GET_ALL,
    EVENT_TYPE_LOADING,
    EVENT_TYPE_CREATE_SUCCESS,
    EVENT_TYPE_UPDATE_SUCCESS,
    EVENT_TYPE_DELETE_SUCCESS,
    EVENT_TYPE_GET_ALL_FILTER,
} from '../../constants';
import eventTypeReducers from '../eventTypeReducers'
import expect from 'expect'

describe('EVENT TYPE REDUCER', () => {
    const initialState = {
        isLoading: false,
        eventTypes: [],
        totalPages: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
    };
    it('Should return default state', () => {
        const action = eventTypeReducers(undefined, {})
        expect(action).toEqual(initialState)
    })
    it('Should return EVENT_TYPE_LOADING', () => {
        const action = eventTypeReducers(initialState, {
            type: EVENT_TYPE_LOADING
            })
        expect(action).toEqual({
            isLoading: action.payload,
            eventTypes: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: false,
        })
    })
    it('Should return EVENT_TYPE_CREATE_SUCCESS', () => {
        const action = eventTypeReducers(initialState, {
            type: EVENT_TYPE_CREATE_SUCCESS
            })
        expect(action).toEqual({
            isLoading: false,
            eventTypes: [],
            totalPages: null,
            createSuccess: action.payload,
            updateSuccess: false,
            deleteSuccess: false,
        })
    })
    it('Should return EVENT_TYPE_UPDATE_SUCCESS', () => {
        const action = eventTypeReducers(initialState, {
            type: EVENT_TYPE_UPDATE_SUCCESS
            })
        expect(action).toEqual({
            isLoading: false,
            eventTypes: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: action.payload,
            deleteSuccess: false,
        })
    })
    it('Should return EVENT_TYPE_DELETE_SUCCESS', () => {
        const action = eventTypeReducers(initialState, {
            type: EVENT_TYPE_DELETE_SUCCESS
            })
        expect(action).toEqual({
            isLoading: false,
            eventTypes: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: action.payload,
        })
    })
})
import { EVENT_CREATE_SUCCESS, EVENT_LOADING } from '../../constants';
import eventReducers from '../eventReducers'
import expect from 'expect'

describe('EVENT REDUCER', () => {
    const initialState = {
        isLoading: false,
        events: [],
        totalPages: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
    };
    it('Should return default state', () => {
        const action = eventReducers(undefined, {})
        expect(action).toMatchSnapshot(initialState)
    })
    it('Should return EVENT_LOADING', () => {
        const action = eventReducers(initialState, {
            type: EVENT_LOADING
            })
        
        expect(action).toMatchSnapshot({
            isLoading: true,
            events: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: false,
        })
    })
    it('Should return EVENT_CREATE_SUCCESS', () => {
        const action = eventReducers(initialState, {
            type: EVENT_CREATE_SUCCESS,
            })
        
        expect(action).toMatchSnapshot({
            isLoading: false,
            events: [],
            totalPages: null,
            createSuccess: true,
            updateSuccess: false,
            deleteSuccess: false,
        })
    })
})

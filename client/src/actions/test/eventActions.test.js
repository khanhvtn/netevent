import configureMockStore from 'redux-mock-store';		
import thunk from 'redux-thunk';		
import axios from 'axios';		
import beforeEach  from 'jest-wrap'
import MockAdapter from 'axios-mock-adapter';
import {
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
    ERROR_CLEAR,
    ERROR,
} from '../../constants';
import { createEventAPI } from '../../api/index';
import * as actions from '../eventActions'
import expect from 'expect'

const middleware = [thunk];		
const mockStore = configureMockStore(middleware);		
const mock = new MockAdapter(axios);		
const store = mockStore();	

describe('createEvent actions', () => {
    beforeEach(() => {
        store.clearActions()
    })
    
    it('dispatches EVENT_CREATE_SUCCESS after a Successful API requiest', () => {
        mock.onPost('api/event/create').reply(200, {response: true})
        store.dispatch(actions.createEvent()).then(() => {
            let expectedActions = [
                { type: EVENT_LOADING, payload: status},
                { type: createEventAPI },
                { type: EVENT_CREATE_SUCCESS, payload: true }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches EVENT_CREATE_SUCCESS after a Successful API requiest', () => {
        mock.onPost('api/event/create').reply(200, {payload: null})
        store.dispatch(actions.createEvent()).then(() => {
            let expectedActions = [
                { type: EVENT_LOADING, payload: status},
                { type: createEventAPI },
                { type: ERROR_CLEAR, payload: null},
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API request', () => {
        mock.onPost('api/event/create').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.createEvent()).then(() => {
            let expectedActions = [
                { type: createEventAPI },
                {type: ERROR, payload: { error: { message: 'error message'}}}
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
})

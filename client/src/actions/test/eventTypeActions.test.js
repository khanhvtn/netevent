import configureMockStore from 'redux-mock-store';		
import thunk from 'redux-thunk';		
import axios from 'axios';		
import beforeEach  from 'jest-wrap'
import MockAdapter from 'axios-mock-adapter';		
import {
    EVENT_TYPE_GET_ALL,
    EVENT_TYPE_LOADING,
    EVENT_TYPE_UPDATE_SUCCESS,
    EVENT_TYPE_CREATE_SUCCESS,
    ERROR,
    ERROR_CLEAR,
    EVENT_TYPE_DELETE_SUCCESS,
    EVENT_TYPE_GET_ALL_FILTER,
} from '../../constants';
import {
    getEventTypesAPI,
    createEventTypeAPI,
    updateEventTypeAPI,
    deleteEventTypesAPI,
    getAllEventTypesAPI,
} from '../../api/index';
import * as actions from '../eventTypeActions'
import expect from 'expect'

const middleware = [thunk];		
const mockStore = configureMockStore(middleware);		
const mock = new MockAdapter(axios);		
const store = mockStore();	

describe('getAllEventTypes actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches EVENT_TYPE_GET_ALL after a successfull API requests', () => {
        mock.onGet('api/eventType/all').reply(200, { response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getAllEventTypes()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: getAllEventTypesAPI },
                {
                    type: EVENT_TYPE_GET_ALL,
                    payload: [{ item: 'item1'}, {item: 'item2'}]
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('getEventTypes actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches EVENT_TYPE_GET_ALL_FILTER after a successfull API requests', () => {
        mock.onGet('api/eventType/filter').reply(200, { response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getEventTypes()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: getEventTypesAPI },
                {
                    type: EVENT_TYPE_GET_ALL_FILTER,
                    payload: [{ item: 'item1'}, {item: 'item2'}]
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('createEventType actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches EVENT_TYPE_CREATE_SUCCESS after a successfull API requests', () => {
        mock.onPost('api/eventType/create').reply(200, { response: true})
        store.dispatch(actions.createEventType()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: createEventTypeAPI },               
                { type: EVENT_TYPE_CREATE_SUCCESS, payload: true }, 
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches EVENT_TYPE_CREATE_SUCCESS after a successfull API requests', () => {
        mock.onPost('api/eventType/create').reply(200, { response: null})
        store.dispatch(actions.createEventType()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: createEventTypeAPI },               
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onPost('api/eventType/create').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.createEventType()).then(() => {
            let expectedActions = [
                { type: createEventTypeAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('updateEventType actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches EVENT_TYPE_UPDATE_SUCCESS after a successfull API requests', () => {
        mock.onPatch('api/eventType/update').reply(200, { response: true})
        store.dispatch(actions.updateEventType()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: updateEventTypeAPI },               
                { type: EVENT_TYPE_UPDATE_SUCCESS, payload: true },   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches EVENT_TYPE_UPDATE_SUCCESS after a successfull API requests', () => {
        mock.onPatch('api/eventType/update').reply(200, { response: null})
        store.dispatch(actions.updateEventType()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: updateEventTypeAPI },               
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onPatch('api/eventType/update').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.updateEventType()).then(() => {
            let expectedActions = [
                { type: updateEventTypeAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('deleteEventTypes actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches EVENT_TYPE_DELETE_SUCCESS after a successfull API requests', () => {
        mock.onDelete('api/eventType/delete').reply(200, { response: true})
        store.dispatch(actions.deleteEventTypes()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: deleteEventTypesAPI },               
                { type: EVENT_TYPE_DELETE_SUCCESS, payload: true }, 
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches EVENT_TYPE_DELETE_SUCCESS after a successfull API requests', () => {
        mock.onDelete('api/eventType/delete').reply(200, { response: null})
        store.dispatch(actions.deleteEventTypes()).then(() => {
            let expectedActions = [
                { type: EVENT_TYPE_LOADING },
                { type: deleteEventTypesAPI },               
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onDelete('api/eventType/delete').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.deleteEventTypes()).then(() => {
            let expectedActions = [
                { type: deleteEventTypesAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
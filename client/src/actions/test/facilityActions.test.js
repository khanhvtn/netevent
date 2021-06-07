import configureMockStore from 'redux-mock-store';		
import thunk from 'redux-thunk';		
import axios from 'axios';		
import beforeEach  from 'jest-wrap'
import MockAdapter from 'axios-mock-adapter';		
import {
    FACILITY_GET_ALL,
    FACILITY_LOADING,
    FACILITY_UPDATE_SUCCESS,
    FACILITY_CREATE_SUCCESS,
    ERROR,
    ERROR_CLEAR,
    FACILITY_DELETE_SUCCESS,
    FACILITY_GET_ALL_FILTER,
} from '../../constants';
import {
    getFacilitiesAPI,
    createFacilityAPI,
    updateFacilityAPI,
    deleteFacilitiesAPI,
    getAllFacilitiesAPI,
} from '../../api/index';
import * as actions from '../facilityActions'
import expect from 'expect'

const middleware = [thunk];		
const mockStore = configureMockStore(middleware);		
const mock = new MockAdapter(axios);		
const store = mockStore();	

describe('getAllFacilities actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FACILITY_GET_ALL after a successfull API requests', () => {
        mock.onGet('api/facility/all').reply(200, { response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getAllFacilities()).then(() => {
            let expectedActions = [
                { type: getAllFacilitiesAPI },
                {
                    type: FACILITY_GET_ALL,
                    payload: [{ item: 'item1'}, {item: 'item2'}]
                },
                { type: EVENT_LOADING, payload: status}
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('getFacilities actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FACILITY_GET_ALL_FILTER after a successfull API requests', () => {
        mock.onGet('api/facility/filter').reply(200, { response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getFacilities()).then(() => {
            let expectedActions = [
                { type: getFacilitiesAPI },
                {
                    type: FACILITY_GET_ALL_FILTER,
                    payload: [{ item: 'item1'}, {item: 'item2'}]
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('createFacility actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FACILITY_CREATE_SUCCESS after a successfull API requests', () => {
        mock.onPost('api/facility/create').reply(200, { response: true})
        store.dispatch(actions.createFacility()).then(() => {
            let expectedActions = [
                { type: createFacilityAPI },               
                { type: FACILITY_CREATE_SUCCESS, payload: true },
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onPost('api/facility/create').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.createFacility()).then(() => {
            let expectedActions = [
                { type: createFacilityAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('updateFacility actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FACILITY_UPDATE_SUCCESS after a successfull API requests', () => {
        mock.onPatch('api/facility/update').reply(200, { response: true})
        store.dispatch(actions.updateFacility()).then(() => {
            let expectedActions = [
                { type: updateFacilityAPI },               
                { type: FACILITY_UPDATE_SUCCESS, payload: true },
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onPatch('api/facility/update').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.updateFacility()).then(() => {
            let expectedActions = [
                { type: updateFacilityAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('deleteFacility actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FACILITY_DELETE_SUCCESS after a successfull API requests', () => {
        mock.onDelete('api/facility/delete').reply(200, { response: true})
        store.dispatch(actions.deleteFacilities()).then(() => {
            let expectedActions = [
                { type: deleteFacilitiesAPI },               
                { type: FACILITY_DELETE_SUCCESS, payload: true },
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onDelete('api/facility/delete').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.deleteFacilities()).then(() => {
            let expectedActions = [
                { type: deleteFacilitiesAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});


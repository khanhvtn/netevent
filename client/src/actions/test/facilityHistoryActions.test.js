import configureMockStore from 'redux-mock-store';		
import thunk from 'redux-thunk';		
import axios from 'axios';		
import beforeEach  from 'jest-wrap'
import MockAdapter from 'axios-mock-adapter';
import { 
    getAllFacilityHistoriesAPI, 
    getFacilityHistoriesAPI } 
    from '../../api/index';
import {
    FACILITY_HISTORY_GET_ALL,
    FACILITY_HISTORY_LOADING,
    FACILITY_HISTORY_GET_ALL_FILTER,
} from '../../constants';
import * as actions from '../facilityHistoryActions'
import expect from 'expect'

const middleware = [thunk];		
const mockStore = configureMockStore(middleware);		
const mock = new MockAdapter(axios);		
const store = mockStore();	

describe('getAllFacilityHistories actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FACILITY_HISTORY_GET_ALL after a Successful API requiest', () => {
        mock.onPost('api/facilityHistory/all').reply(200, {response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getAllFacilityHistories()).then(() => {
            let expectedActions = [
                { type: FACILITY_HISTORY_LOADING, payload: true},
                { type: getAllFacilityHistoriesAPI },
                { type: FACILITY_HISTORY_GET_ALL, payload: [{ item: 'item1'}, {item: 'item2'}] },

            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
})
describe('getFacilityHistories actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FACILITY_HISTORY_GET_ALL_FILTER after a Successful API requiest', () => {
        mock.onPost('api/facilityHistory/all').reply(200, {response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getFacilityHistories()).then(() => {
            let expectedActions = [
                { type: FACILITY_HISTORY_LOADING, payload: true},
                { type: getFacilityHistoriesAPI },
                { type: FACILITY_HISTORY_GET_ALL_FILTER, payload: [{ item: 'item1'}, {item: 'item2'}] },
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
})

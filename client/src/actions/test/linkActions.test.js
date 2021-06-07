import configureMockStore from 'redux-mock-store';		
import thunk from 'redux-thunk';		
import axios from 'axios';		
import beforeEach  from 'jest-wrap'
import MockAdapter from 'axios-mock-adapter';		
import { 
    GET_LINKS, 
    GET_LINK_COMPLETE } 
    from '../../constants'
    import {getLinksAPI} from '../../api/index';
import * as actions from '../linkActions'
import expect from 'expect'

const middleware = [thunk];		
const mockStore = configureMockStore(middleware);		
const mock = new MockAdapter(axios);		
const store = mockStore();	

describe('getLinks actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches GET_LINKS after a successfull API requests', () => {
        mock.onGet('api/link').reply(200, { response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getLinks()).then(() => {
            let expectedActions = [
                { type: getLinksAPI },
                {
                    type: GET_LINKS,
                    payload: [{ item: 'item1'}, {item: 'item2'}]
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches GET_LINK_COMPLETE after a successfull API requests', () => {
        mock.onGet('api/link/:id').reply(200, { response: true })
        store.dispatch(actions.getLinks()).then(() => {
            let expectedActions = [
                { type: getLinksAPI },
                {
                    type: GET_LINK_COMPLETE,
                    payload: true
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});

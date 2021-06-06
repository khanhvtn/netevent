import { GET_LINKS, GET_LINK_COMPLETE } from '../../constants'
import linkReducers from '../linkReducers'
import expect from 'expect'

describe('LINK REDUCER', () => {
    const initialState = {
        links: [],
        complete: false
    }
    it('should return default state', () => {
        const action = linkReducers(undefined, {})
        expect(action).toMatchSnapshot(initialState)
    });
    it('should return GET_LINKS', () => {
        const action = linkReducers(initialState, {
            type: GET_LINKS
        })
        expect(action).toMatchSnapshot({
            links: action.payload,
            complete: false
        })
    });
    it('should return GET_LINKS_COMPLETE', () => {
        const action = linkReducers(initialState, {
            type: GET_LINK_COMPLETE
        })
        expect(action).toMatchSnapshot({
            links: [],
            complete: action.payload,
        })
    });
})

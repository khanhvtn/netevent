import eventReducers from '../../reducers/eventReducers'
import * as types from '../../constants'
import expect from 'expect'

/**
 *  =====================================
 *            EVENT REDUCER TESTING
 *  =====================================
 */

describe('event reducer', () => {
    const initialState = {
        isLoading: false,
        events: [],
        totalPages: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
    };
/**
 *  We call the eventReducers with an undefined 
 *  state and without an action type. We expect this 
 *  to be equal with the initial state we have 
 *  in our reducer.
 */
    it('returns the initial state when an action type is not passed', () => {
        const action = eventReducers(undefined, {})
        expect(action).toEqual(initialState)
    })
/**
 *  We expect this EVENT_LOADING property to 
 *  have changed to undefined and the events still
 *  be empty
 */
    it('should handle EVENT_LOADING', () => {
        const action = eventReducers(initialState, {type: types.EVENT_LOADING})
        expect(action).toEqual({
            isLoading: undefined,
            events: [],
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: false
        })    
        })
/**
 *  We pass the payload in our action object and
 *  we expect this to be what the reducer returns
 *  in the events property. We also expect the 
 *  loading property 'switched' to false
 */
    it('shoulh handle EVENT_CREATE_SUCCESS', () => {
        const action = eventReducers(initialState, {type: types.EVENT_CREATE_SUCCESS})
        expect(action).toEqual({
            isLoading: false,
            events: [],
            totalPages: null,
            createSuccess: undefined,
            updateSuccess: false,
            deleteSuccess: false,
        })
    })
})

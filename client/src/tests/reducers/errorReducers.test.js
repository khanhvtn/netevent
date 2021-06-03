import errorReducers from '../../reducers/errorReducers'
import * as types from '../../constants'
import expect from 'expect'

/**
 *  =====================================
 *            ERROR REDUCER TESTING
 *  =====================================
 */

describe('error reducer', () => {
    const initialState = {
        errors: null,
    };
/**
 *  We call the errorReducers with an undefined state 
 *  and without an action type. We expect this 
 *  to be equal with the initial state we have 
 *  in our reducer.
 */
    it('return the initial state when an action type is not passed', () => {
        const action = errorReducers(undefined, {})
        expect(action).toEqual(initialState)
    })
/**
 *  We expect this ERROR property to have changed
 *  to undefined
 */
    it('should handle ERROR', () => {
        const action = errorReducers(initialState, {type: types.ERROR})
        expect(action).toEqual({
            errors: undefined
        })
    })
/**
 *  We expect this ERROR_CLEAR property to 
 *  have changed to null
 */
    it('should handle ERROR_CLEAR', () => {
        const action = errorReducers(initialState, {type: types.ERROR_CLEAR})
        expect(action).toEqual({
            errors: null
        })
    })
    
})


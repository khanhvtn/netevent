import eventTypeReducers from '../../reducers/eventTypeReducers'
import * as types from '../../constants'
import expect from 'expect'
import data from '../../../../server/models/eventTypeModel'
/**
 *  =====================================
 *            EVENT TYPE REDUCER TESTING
 *  =====================================
 */

 describe('event type reducer', () => {
    const initialState = {
        isLoading: false,
        eventTypes: [],
        totalPages: null,
        createSuccess: false,
        updateSuccess: false,
        deleteSuccess: false,
    }
    
    it('returns the initial state when an action type is not passed', () => {
        const action = eventTypeReducers(undefined, {})
        expect(action).toEqual(initialState)
    })
    it('should handle EVENT_TYPE_GET_ALL', () => {
        const action = eventTypeReducers(initialState, {
            type: types.EVENT_TYPE_GET_ALL,
            payload: {
                data: [
                    {
                        _id: "60afb11aeec180001034a66f",
                        name: "Technology",
                        createdAt: "2021-05-27T14:47:54.519Z",
                        updatedAt: "2021-05-27T14:47:54.519Z",
                        __v: 0
                    }
                ]
            }
        })
        expect(action).toEqual({
            eventTypes: undefined,
            totalPages: null,
            createSuccess: false,
            updateSuccess: false,
            deleteSuccess: false,
            isLoading: false
        })
    })
 })
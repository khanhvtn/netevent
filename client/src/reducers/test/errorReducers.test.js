import { ERROR, ERROR_CLEAR } from '../../constants';
import errorReducers from '../errorReducers'
import expect from 'expect'

describe('ERROR REDUCERS', () => {
    const initialState = {
        errors: null,
    };
    it('should return default state', () => {
        const action = errorReducers(undefined, {})
        expect(action).toMatchSnapshot(initialState)
    }) 
    it('should return ERROR', () => {
        const action = errorReducers(initialState, {
            type: ERROR
        })
        expect(action).toMatchSnapshot({
            errors: []
        })
    })
    it('should return ERROR_CLEAR', () => {
        const action = errorReducers(initialState, {
            type: ERROR_CLEAR
        })
        expect(action).toMatchSnapshot(initialState)
    })
})
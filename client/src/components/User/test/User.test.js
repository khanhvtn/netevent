import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import User from '../User'

const mockStore = configureStore([])
describe('User', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'User'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <User />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
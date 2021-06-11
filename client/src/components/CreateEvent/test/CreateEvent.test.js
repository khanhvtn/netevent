import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import CreateEvent from '../CreateEvent'

const mockStore = configureStore([])
describe('CreateEvent', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'create Event'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <CreateEvent />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
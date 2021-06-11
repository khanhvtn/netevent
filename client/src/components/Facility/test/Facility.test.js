import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import Facility from '../Facility'

const mockStore = configureStore([])
describe('Facility', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'Facility'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <Facility />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
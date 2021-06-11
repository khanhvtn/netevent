import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import FacilityPagination from '../FacilityPagination'

const mockStore = configureStore([])
describe('FacilityPagination', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'Facility Pagination'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <FacilityPagination />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
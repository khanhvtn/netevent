import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import PaginationTable from '../PaginationTable/PaginationTable'

const mockStore = configureStore([])
describe('PaginationTable', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'Pagination Table'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <PaginationTable />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import UserPagination from '../UserPagination/UserPagination'

const mockStore = configureStore([])
describe('UserPagination', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'User Pagination'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <UserPagination />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
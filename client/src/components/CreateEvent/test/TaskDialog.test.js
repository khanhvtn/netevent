import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import TaskDialog from '../TaskDialog/TaskDialog'

const mockStore = configureStore([])
describe('TaskDialog', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'Task Dialog'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <TaskDialog />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
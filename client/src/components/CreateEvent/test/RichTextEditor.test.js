import React from 'react'
import { Provider } from 'react-redux'
import { renderer } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import RichTextEditor from '../RichTextEditor/RichTextEditor'

const mockStore = configureStore([])
describe('RichTextEditor', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'Rich Text Editor'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <RichTextEditor />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
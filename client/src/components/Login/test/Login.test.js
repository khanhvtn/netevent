import React from 'react'
import { Provider } from 'react-redux'
import { renderer, act, create } from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import beforeEach from 'jest-wrap'
import expect from 'expect'
import toJson from 'enzyme-to-json'

import Login from '../Login'
import { userLogin } from '../../../actions/userActions'

const mockStore = configureStore([])
describe('Login', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            myState: 'user login'
        })

        store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <Login />
            </Provider>
        )
    })
    
    it('should render with given state from Redux store', () => {
        expect(toJson(component)).toMatchSnapshot()
    });

    // it('should dispatch an action on btutton click', () => {
    //     const component = renderer.create(
    //         <Provider store={store}>
    //             <Login>
                    
    //             </Login>
    //         </Provider>
    //     )
    // });
})

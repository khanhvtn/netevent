import expect from 'expect'
import beforeEach from 'jest-wrap'
import React from 'react'
import {shallow} from 'enzyme'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import Login from '../Login'
import { TextField } from '@material-ui/core'
import wrap from 'jest-wrap'
import { userLogin } from '../../../actions/userActions'

const mockStore = configureStore([]);

describe('Login React-Redux Component', () => {
    let store;
    let component;
    let wrapper;

    beforeEach(() =>{
        store = mockStore({
            myState: 'login State'
        })
        
        // store.dispatch = jest.fn()

        component = renderer.create(
            <Provider store={store}>
                <Login />
            </Provider>
        )
    })
    
 
    it('should render with given state from Redux store', () => {
        // expect(component.toJSON()).toMatchSnapshot()
    });
   
    // it('should dispatch an action on button click', () => {
    //     renderer.act(() => {
    //         component.findByType('submit').props.onClick()
    //     })
    //     expect(store.dispatch).toHaveBeenCalledTimes(1)
    //     expect(store.dispatch).toHaveBeenCalledWith(
    //         userLogin({payload: 'login State'})
    //     )
    // });
});


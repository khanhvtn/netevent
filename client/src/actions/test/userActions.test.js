import configureMockStore from 'redux-mock-store';		
import thunk from 'redux-thunk';		
import axios from 'axios';		
import beforeEach  from 'jest-wrap'
import MockAdapter from 'axios-mock-adapter';		
import {
    ERROR,
    ERROR_CLEAR,
    USER_LOADING,
    USER_LOGIN,
    USER_LOGOUT,
    USER_PICK_ROLE,
    USER_CHECK,
    USER_CHECKING,
    USER_CONFIRM,
    USER_IS_CONFIRM,
    FETCH_ALL_USERS,
    FETCH_CURRENT_USER,
    GET_LINK_COMPLETE,
    USER_CREATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_DELETE_SUCCESS,
    GET_ALL_USERS,
} from '../../constants';

import * as api from '../../api/index';
import * as actions from '../userActions'
import expect from 'expect'

const middleware = [thunk];		
const mockStore = configureMockStore(middleware);		
const mock = new MockAdapter(axios);		
const store = mockStore();	

describe('userLogin actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches USER_LOGIN after a successfull API requests', () => {
        mock.onPost('api/user/login').reply(200, { response: { item: 'item1'} })
        store.dispatch(actions.userLogin()).then(() => {
            let expectedActions = [
                { type: api.userLoginAPI },
                {
                    type: USER_LOGIN,
                    payload: { item: 'item1'}
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a successfull API requests', () => {
        mock.onGet('api/user/login').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.userLogin()).then(() => {
            let expectedActions = [
                { type: api.userLoginAPI },
                {
                    type: ERROR,
                    payload: { error: {message: 'error message'}}
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('userLogout actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches USER_LOGOUT after a successfull API requests', () => {
        mock.onGet('api/user/logout').reply(200, { response: { item: 'item1'} })
        store.dispatch(actions.userLogout()).then(() => {
            let expectedActions = [
                { type: api.userLogoutAPI },
                {
                    type: USER_LOGOUT,
                    payload: { item: 'item1'}
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
})
describe('fetchCurrentUser actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FETCH_CURRENT_USER after a successfull API requests', () => {
        mock.onPost('api/user/fetchCurrent').reply(200, { response: { item: 'item1'} })
        store.dispatch(actions.fetchCurrentUser()).then(() => {
            let expectedActions = [
                { type: api.fetchCurrentUser },
                {
                    type: FETCH_CURRENT_USER,
                    payload: { item: 'item1'}
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
})
describe('userCheck actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches USER_CHECK after a successfull API requests', () => {
        mock.onGet('api/user/userCheck').reply(200, { response: { item: 'item1'} })
        store.dispatch(actions.userCheck()).then(() => {
            let expectedActions = [
                { type: api.userCheckingAPI },
                {
                    type: USER_CHECK,
                    payload: { item: 'item1'}
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches USER_CHECK after a failed API requests', () => {
        mock.onGet('api/user/login').reply(400, { payload: null })
        store.dispatch(actions.userCheck()).then(() => {
            let expectedActions = [
                { type: api.userLoginAPI },
                {
                    type: USER_CHECK,
                    payload: null
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('userConfirm actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    
    it('dispatches USER_CONFIRM after a failed API requests', () => {
        mock.onPost('api/user/login').reply(200, { response: {confirm: 'confirmed'} })
        store.dispatch(actions.userConfirm()).then(() => {
            let expectedActions = [
                { type: api.confirmUser },
                {
                    type: USER_CONFIRM,
                    payload: {confirm: 'confirmed'}
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches USER_LOADING after a failed API requests', () => {
        mock.onPost('api/user/login').reply(200, { payload: false })
        store.dispatch(actions.userConfirm()).then(() => {
            let expectedActions = [
                { type: api.confirmUser },
                {
                    type: USER_LOADING,
                    payload: false
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches USER_IS_CONFIRM after a failed API requests', () => {
        mock.onPost('api/user/login').reply(200, { payload: true })
        store.dispatch(actions.userConfirm()).then(() => {
            let expectedActions = [
                { type: api.confirmUser },
                {
                    type: USER_IS_CONFIRM,
                    payload: true
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('getAllUsers actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches GET_ALL_USERS after a successfull API requests', () => {
        mock.onGet('api/user/all').reply(200, { response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getAllUsers()).then(() => {
            let expectedActions = [
                { type: api.getAllUsersAPI },
                {
                    type: GET_ALL_USERS,
                    payload: [{ item: 'item1'}, {item: 'item2'}]
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('getUsers actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches FETCH_ALL_USERS after a successfull API requests', () => {
        mock.onGet('api/user/filter').reply(200, { response: [{ item: 'item1'}, {item: 'item2'}] })
        store.dispatch(actions.getUsers()).then(() => {
            let expectedActions = [
                { type: api.getUsersAPI },
                {
                    type: FETCH_ALL_USERS,
                    payload: [{ item: 'item1'}, {item: 'item2'}]
                }
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('createUser actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches USER_CREATE_SUCCESS after a successfull API requests', () => {
        mock.onPost('api/user/create').reply(200, { response: true})
        store.dispatch(actions.createUser()).then(() => {
            let expectedActions = [
                { type: api.createUserAPI },               
                { type: EVENT_TYPE_CREATE_SUCCESS, payload: true },
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onPost('api/user/create').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.createUser()).then(() => {
            let expectedActions = [
                { type: api.createUserAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('updateUser actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches USER_UPDATE_SUCCESS after a successfull API requests', () => {
        mock.onPatch('api/user/update').reply(200, { response: true})
        store.dispatch(actions.updateUser()).then(() => {
            let expectedActions = [
                { type: api.updateUserAPI },               
                { type: EVENT_TYPE_UPDATE_SUCCESS, payload: true },
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
    it('dispatches ERROR after a failed API requests', () => {
        mock.onPatch('api/user/update').reply(400, { error: {message: 'error message'}})
        store.dispatch(actions.updateUser()).then(() => {
            let expectedActions = [
                { type: updateUserAPI },               
                { type: ERROR, payload: {error: {message: 'error message'}} }  
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
describe('deleteUsers actions', () => {
    beforeEach(() => {
        store.clearActions()
    })

    it('dispatches USER_DELETE_SUCCESS after a successfull API requests', () => {
        mock.onDelete('api/user/delete').reply(200, { response: true})
        store.dispatch(actions.deleteUsers()).then(() => {
            let expectedActions = [
                { type: deleteUsersAPI },               
                { type: EVENT_TYPE_DELETE_SUCCESS, payload: true },
                { type: ERROR_CLEAR, payload: null }   
            ]
            expect(store.getActions()).toMatchSnapshot(expectedActions)
        })
    });
});
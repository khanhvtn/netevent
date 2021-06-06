import {
    USER_CHECK,
    USER_LOGIN,
    USER_LOADING,
    USER_CHECKING,
    USER_CONFIRM,
    USER_IS_CONFIRM,
    FETCH_ALL_USERS,
    FETCH_CURRENT_USER,
    USER_LOGOUT,
    USER_PICK_ROLE,
    USER_CREATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_DELETE_SUCCESS,
    GET_ALL_USERS,
} from '../../constants';
import userReducers from '../userReducers'
import expect from 'expect'


describe('USER REDUCER', () => {
    const initialState = {
        isUserChecking: false,
        isLoading: false,
        isConfirm: false,
        pickedRoleNum: null,
        users: [],
        user: null,
        totalPages: null,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
    };
    it('should return default state', () => {
        const action = userReducers(undefined, {})
        expect(action).toMatchSnapshot(initialState)
    });
    it('should return USER_LOGIN', () => {
        const action = userReducers(initialState, {
            type: USER_LOGIN
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: action.payload,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_LOGOUT', () => {
        const action = userReducers(initialState, {
            type: USER_LOGOUT
        })
        expect(action).toMatchSnapshot(initialState)
    });
    it('should return USER_LOADING', () => {
        const action = userReducers(initialState, {
            type: USER_LOADING
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: action.payload,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: null,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_PICK_ROLE', () => {
        const action = userReducers(initialState, {
            type: USER_PICK_ROLE
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: action.payload,
            users: [],
            user: null,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_CONFIRM', () => {
        const action = userReducers(initialState, {
            type: USER_CONFIRM
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: action.payload,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_IS_CONFIRM', () => {
        const action = userReducers(initialState, {
            type: USER_IS_CONFIRM
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: action.payload,
            pickedRoleNum: null,
            users: [],
            user: null,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_CHECK', () => {
        const action = userReducers(initialState, {
            type: USER_CHECK
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: action.payload,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_CHECKING', () => {
        const action = userReducers(initialState, {
            type: USER_CHECKING
        })
        expect(action).toMatchSnapshot({
            isUserChecking: action.payload,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: null,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return FETCH_CURRENT_USER', () => {
        const action = userReducers(initialState, {
            type: FETCH_CURRENT_USER
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: action.payload,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_CREATE_SUCCESS', () => {
        const action = userReducers(initialState, {
            type: USER_CREATE_SUCCESS
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: null,
            totalPages: null,
            isCreated: action.payload,
            isUpdated: false,
            isDeleted: false,
        })
    });
    it('should return USER_UPDATE_SUCCESS', () => {
        const action = userReducers(initialState, {
            type: USER_UPDATE_SUCCESS
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: null,
            totalPages: null,
            isCreated: false,
            isUpdated: action.payload,
            isDeleted: false,
        })
    });
    it('should return USER_DELETE_SUCCESS', () => {
        const action = userReducers(initialState, {
            type: USER_DELETE_SUCCESS
        })
        expect(action).toMatchSnapshot({
            isUserChecking: false,
            isLoading: false,
            isConfirm: false,
            pickedRoleNum: null,
            users: [],
            user: null,
            totalPages: null,
            isCreated: false,
            isUpdated: false,
            isDeleted: action.payload,
        })
    });
})
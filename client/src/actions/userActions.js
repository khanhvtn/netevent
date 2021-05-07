import {
    USER_LOADING,
    USER_LOGIN,
    ERROR,
    USER_CHECK,
    USER_CHECKING,
    ERROR_CLEAR,
    USER_CREATE,
    USER_CONFIRM,
    FETCH_ALL_USERS,
    DELETE_USER
} from '../constants';

import * as api from '../api';
import { getCookie } from '../utils';

//setIsLoading func is to set loading status
const setUserIsLoading = (status, dispatch) => {
    dispatch({
        type: USER_LOADING,
        payload: status,
    });
};

//setIsLoading func is to set loading status
const setUserIsChecking = (status, dispatch) => {
    dispatch({
        type: USER_CHECKING,
        payload: status,
    });
};

export const userLogin = (userReq, history) => async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
        //get user info
        const { data } = await api.userLoginAPI(userReq);
        dispatch({
            type: USER_LOGIN,
            payload: data.data,
        });

        //redirect to pickrole page
        history.push('/pickrole');
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data?.errMessage,
        });
    }
    setUserIsLoading(false, dispatch);
};

export const userCheck = (history) => async (dispatch) => {
    setUserIsChecking(true, dispatch);
    const previousPath = history.location.pathname;
    /*
        Check user token.
        Then, sen request to the server to check the token.
        If the token is valid, then update user data.
        If not set user null and redirect to login page
    */
    try {
        //get user info
        const { data } = await api.userCheckingAPI();
        dispatch({
            type: USER_CHECK,
            payload: data.data,
        });
        /* 
        Prevent user already login but access to login by inputing link.
         */
        previousPath === '/' || previousPath === '/login'
            ? history.push('/pickrole')
            : history.push(previousPath);
    } catch (error) {
        dispatch({
            type: USER_CHECK,
            payload: null,
        });
        previousPath === '/' ? history.push('/') : history.push('/login');
    }
    setUserIsChecking(false, dispatch);
};

export const userCreate = (userData) => async (dispatch) => {
    try {
        const { data } = await api.createUser(userData);
        dispatch({ type: USER_CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const userConfirm = (id, password, history) => async (dispatch) => {
    try {
        const { data } = await api.confirmUser(id, password);
        dispatch({ type: USER_CONFIRM, payload: data });
        history.push('/login')

    } catch (error) {
        console.log(error)

    }
}

export const getUsers = () => async (dispatch) => {
    setUserIsLoading(true, dispatch)
    try {
        const { data } = await api.fetchUsers();
        console.log(data)
        dispatch({ type: FETCH_ALL_USERS, payload: data })

    } catch (error) {
        console.log(error)
    }
    setUserIsLoading(false, dispatch)
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id)
        dispatch({ type: DELETE_USER, payload: id })
    } catch (error) {
        console.log(error)
    }
}

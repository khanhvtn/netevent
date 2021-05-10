import {
    USER_LOADING,
    USER_LOGIN,
    ERROR,
    USER_CHECK,
    USER_CHECKING,
    USER_CREATE,
    USER_CONFIRM,
    USER_IS_CONFIRM,
    FETCH_ALL_USERS,
    DELETE_USER,
    SEARCH_USER,
    USER_LOGOUT,
    USER_CREATE_SUCCESSFUL,
    USER_UPDATE_SUCCESSFUL,
    UPDATE_USER,
    GET_LINK_COMPLETE,
    USER_PICK_ROLE,
} from '../constants';

import * as api from '../api';

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
        if (error.response.data?.errMessage) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errMessage,
            });
        }
        console.log(error);
    }
    setUserIsLoading(false, dispatch);
};

export const userLogout = (history) => async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
        //get user info
        const { data } = await api.userLogoutAPI();
        dispatch({
            type: USER_LOGOUT,
            payload: data.data,
        });

        //clear roleNum in localStorage
        localStorage.removeItem('roleNum');

        //redirect to pickrole page
        history.push('/login');
    } catch (error) {
        console.log(error);
    }
    setUserIsLoading(false, dispatch);
};

export const userCheck = (history) => async (dispatch) => {
    setUserIsChecking(true, dispatch);
    const prevPath = history.location.state?.prevPath
        ? history.location.state?.prevPath
        : history.location.pathname;

    //set numRole
    dispatch({
        type: USER_PICK_ROLE,
        payload: localStorage.getItem('roleNum')
            ? localStorage.getItem('roleNum')
            : null,
    });
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
        prevPath === '/' || prevPath === '/login'
            ? history.push('/pickrole')
            : history.push(prevPath);
    } catch (error) {
        dispatch({
            type: USER_CHECK,
            payload: null,
        });
        history.push(prevPath);
    }
    setUserIsChecking(false, dispatch);
};

export const userCreate = (userData) => async (dispatch) => {
    try {
        const { data } = await api.createUser(userData);
        dispatch({ type: USER_CREATE_SUCCESSFUL, payload: true });
        dispatch({ type: USER_CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const userConfirm = (id, password, history) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADING, payload: true });
        const { data } = await api.confirmUser(id, password);
        dispatch({ type: USER_CONFIRM, payload: data });
        dispatch({ type: USER_LOADING, payload: false });
        dispatch({ type: USER_IS_CONFIRM, payload: true });
        await sleep(5000);
        dispatch({ type: USER_IS_CONFIRM, payload: false });
        dispatch({ type: GET_LINK_COMPLETE, payload: false });

        history.push('/login');
    } catch (error) {
        console.log(error);
    }
};

export const getUsers = () => async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_ALL_USERS, payload: data });
    } catch (error) {
        console.log(error);
    }
    setUserIsLoading(false, dispatch);
};

export const searchUsers = (searchString) => async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
        const { data } = await api.searchUsersAPI(searchString);
        console.log(data);
        dispatch({ type: SEARCH_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
    setUserIsLoading(false, dispatch);
};

export const updateUser = (id, updateUser) => async (dispatch) => {
    // setUserIsChecking(true, dispatch);
    try {
        const { data } = await api.updateUserAPI(id, updateUser);
        console.log(data);
        dispatch({ type: UPDATE_USER, payload: data });
        dispatch({ type: USER_UPDATE_SUCCESSFUL, payload: true });
    } catch (error) {
        console.log(error);
    }
    // setUserIsLoading(false, dispatch)
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
        console.log(error);
    }
};

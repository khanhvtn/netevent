import {
    USER_LOADING,
    USER_LOGIN,
    ERROR,
    USER_CHECK,
    USER_CHECKING,
    USER_LOGOUT,
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

        //redirect to pickrole page
        history.push('/login');
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
        previousPath.includes('confirmation')
            ? history.push(previousPath)
            : history.push('/login');
    }
    setUserIsChecking(false, dispatch);
};

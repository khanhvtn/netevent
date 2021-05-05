import {
    USER_LOADING,
    USER_LOGIN,
    ERROR,
    USER_CHECK,
    USER_CHECKING,
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
        console.log(getCookie('token'));
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
    try {
        //get user info
        const { data } = await api.userCheckingAPI();
        dispatch({
            type: USER_CHECK,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data?.errMessage,
        });
        // history.push('/login');
    }
    setUserIsChecking(false, dispatch);
};

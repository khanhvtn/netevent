import { USER_LOADING, USER_LOGIN, ERROR, USER_CHECK } from '../constants';
import * as api from '../api';
//setIsLoading func is to set loading status
const setUserIsLoading = (status, dispatch) => {
    dispatch({
        type: USER_LOADING,
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
            payload: data,
        });
        //redirect to pickrole page
        history.push('/pickrole');
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data?.message,
        });
    }
    setUserIsLoading(false, dispatch);
};

export const userCheck = (history) => async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
        //get user info
        const { data } = await api.userCheckingAPI();
        dispatch({
            type: USER_CHECK,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.response.data?.message,
        });
        history.push('/login');
    }
    setUserIsLoading(false, dispatch);
};

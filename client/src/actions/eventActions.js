import {
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
    ERROR_CLEAR,
    ERROR,
} from '../constants';
import { createEventAPI } from '../api';

//setIsLoading func is to set loading status
const setEventIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_LOADING,
        payload: status,
    });
};

export const createEvent = (userReq) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        await createEventAPI(userReq);
        dispatch({
            type: EVENT_CREATE_SUCCESS,
            payload: true,
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });

        setTimeout(() => {
            dispatch({
                type: EVENT_CREATE_SUCCESS,
                payload: false,
            });
        }, 3000);
    } catch (error) {
        if (error.response.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors,
            });
        }
        console.log(error);
    }
    setEventIsLoading(false, dispatch);
};

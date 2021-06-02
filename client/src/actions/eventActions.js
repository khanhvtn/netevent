import {
    EVENT_GET_ALL,
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
    ERROR_CLEAR,
    ERROR,
} from '../constants';
import { createEventAPI, getAllEventAPI } from '../api';

//setIsLoading func is to set loading status
const setEventIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_LOADING,
        payload: status,
    });
};

export const getAllEvent = () => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await getAllEventAPI();
        dispatch({
            type: EVENT_GET_ALL,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
    setEventIsLoading(false, dispatch);
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
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors,
            });
        }
        console.log(error);
    }
    setEventIsLoading(false, dispatch);
};

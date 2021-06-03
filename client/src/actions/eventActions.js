import {
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
    ERROR_CLEAR,
    ERROR,
    EVENT_GET_ALL_FILTER,
} from '../constants';
import { createEventAPI, getEventsAPI } from '../api';

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

export const getEvents = (search, take, page) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await getEventsAPI(search, take, page);

        dispatch({
            type: EVENT_GET_ALL_FILTER,
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
    setEventIsLoading(false, dispatch)
}

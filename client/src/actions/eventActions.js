import {
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
    IS_SENDING_NOTIFICATION,
    SEND_NOTI_SUCCESS,
    GET_EVENTS_COMPLETE,
    FETCH_EVENTS,
    ERROR_CLEAR,
    ERROR,
} from '../constants';
import { createEventAPI, sendNotificationAPI, fetchEventsAPI } from '../api';

//setIsLoading func is to set loading status
const setEventIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_LOADING,
        payload: status,
    });
};

export const fetchEvents = () => async (dispatch) => {
    try {

        const data = await fetchEventsAPI()
        dispatch({
            type: FETCH_EVENTS,
            payload: data
        })

        dispatch({
            type: GET_EVENTS_COMPLETE,
            payload: true
        })
    } catch (error) {

        console.log(error);
    }
}

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

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};


export const sendNotification = (notificationReq) => async (dispatch) => {
    try {
        dispatch({
            type: IS_SENDING_NOTIFICATION,
            payload: true
        })

        await sendNotificationAPI(notificationReq)

        dispatch({
            type: SEND_NOTI_SUCCESS,
            payload: true
        })

        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });


        dispatch({
            type: IS_SENDING_NOTIFICATION,
            payload: false
        })

        setTimeout(() => {
            dispatch({
                type: SEND_NOTI_SUCCESS,
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
        console.log(error)

    }
    dispatch({
        type: IS_SENDING_NOTIFICATION,
        payload: false
    })
}
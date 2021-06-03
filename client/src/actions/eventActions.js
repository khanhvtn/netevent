import {
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
    IS_SENDING_NOTIFICATION,
    SEND_SUCCESS,
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
        const data =  await fetchEventsAPI()
        dispatch({
            type: FETCH_EVENTS,
            payload: data
        })
    } catch (error) {
        if (error.response.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors,
            });
        }
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


export const sendNotification = (notificationReq) => async(dispatch) => {
    try {
        dispatch({
            type: IS_SENDING_NOTIFICATION,
            payload: true  
        })

        await sendNotificationAPI(notificationReq)

        dispatch({
            type: SEND_SUCCESS,
            payload: true
        })

        await sleep(1000);


        dispatch({
            type: IS_SENDING_NOTIFICATION,
            payload: false
        })


        dispatch({
            type: SEND_SUCCESS,
            payload: false
        })

    } catch (error) {
        if (error.response.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors,
            });
        }
        console.log(error)
    }
}
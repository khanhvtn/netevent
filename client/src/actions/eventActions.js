import {
    EVENT_GET_ALL,
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
    IS_SENDING_NOTIFICATION,
    SEND_NOTI_SUCCESS,
    GET_EVENTS_COMPLETE,
    FETCH_EVENTS,
    ERROR_CLEAR,
    ERROR,
    EVENT_GET_ALL_FILTER,
    EVENT_GET_FACILITY_AND_TASK,
    EVENT_DETAIL_LOADING,
    EVENT_DELETE_SUCCESS,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE,
} from '../constants';
import {
    createEventAPI,
    deleteEventAPI,
    deleteEventManagementAPI,
    getEventsAPI,
    getFacilityAndTaskByEventNameAPI,
    updateEventAPI,
    getAllEventAPI,
    sendNotificationAPI,
    fetchEventsAPI
} from '../api';

//setIsLoading func is to set loading status
const setEventIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_LOADING,
        payload: status,
    });
};

const setEventDetailIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_DETAIL_LOADING,
        payload: status
    })
}

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

// Minh Part Send Notification
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

export const getEvents = (search, take, page, type, budgetRange, participantRange, startFrom, startTo, endFrom, endTo) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await getEventsAPI(search, take, page, type, budgetRange, participantRange, startFrom, startTo, endFrom, endTo);

        dispatch({
            type: EVENT_GET_ALL_FILTER,
            payload: data
        });
    } catch (error) {
        console.log(error.message)
    }
    setEventIsLoading(false, dispatch);
};

export const getFacilityAndTaskByEventName = (eventName) => async (dispatch) => {
    setEventDetailIsLoading(true, dispatch);
    try {
        const data = await getFacilityAndTaskByEventNameAPI(eventName);
        dispatch({
            type: EVENT_GET_FACILITY_AND_TASK,
            payload: data
        });
    } catch (error) {
        console.log(error.message)
    }
    setEventDetailIsLoading(false, dispatch);
};

export const deleteEventWithTaskAndFacilityHistory = (userReq, history) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        console.log(userReq)
        const data = await deleteEventManagementAPI(userReq);
        history.goBack();
        dispatch({
            type: EVENT_DELETE_SUCCESS,
            payload: true
        })
        setTimeout(() => {
            dispatch({
                type: EVENT_DELETE_SUCCESS,
                payload: false
            })
        }, 3000);
    } catch (error) {
        if (error.response.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors,
            });
        }
        console.log(error.message)
    }
    setEventIsLoading(false, dispatch);
};

export const updateEvent = (userReq) => async (dispatch) => {
    setEventIsLoading(true, dispatch)
    try {
        const data = await updateEventAPI(userReq);

        dispatch({
            type: EVENT_UPDATE,
            payload: data
        })

        dispatch({
            type: EVENT_UPDATE_SUCCESS,
            payload: true
        })

        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });

        setTimeout(() => {
            dispatch({
                type: EVENT_UPDATE_SUCCESS,
                payload: false
            })
        }, 3000);

    } catch (error) {
        console.log(error);
        if (error.response.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors,
            });
        }
    }
    setEventIsLoading(false, dispatch)
}

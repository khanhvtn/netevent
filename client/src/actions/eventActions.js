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
    EVENT_RECOVERY_SUCCESS,
    GET_EVENT_ANALYSIS,
    GET_EVENT_ANALYSIS_BY_ID,
    LOADING_ANALYSIS
} from '../constants';
import {
    createEventAPI,
    deleteEventAPI,
    deleteEventPermanentAPI,
    getEventsAPI,
    getFacilityAndTaskByEventCodeAPI,
    getRegistrationPageDetailAPI,
    updateEventAPI,
    getAllEventAPI,
    sendNotificationAPI,
    fetchEventsAPI,
    updateEventStatusAPI,
    recoveryEventAPI,
    getEventsAnalysisAPI,
    getEventAnalysisByIDAPI
} from '../api';
import { sendParticipantsFeedback } from './participantActions';

//setIsLoading func is to set loading status
const setEventIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_LOADING,
        payload: status
    });
};

//setIsLoading func is to set loading status
const setAnalysisIsLoading = (status, dispatch) => {
    dispatch({
        type: LOADING_ANALYSIS,
        payload: status
    });
};

const setEventDetailIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_DETAIL_LOADING,
        payload: status
    });
};

export const getAllEvent = () => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await getAllEventAPI();
        dispatch({
            type: EVENT_GET_ALL,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
    setEventIsLoading(false, dispatch);
};

// Get Analysis

export const getEventAnalysis = (userQueries) => async (dispatch) => {
    setAnalysisIsLoading(true, dispatch);
    try {
        const data = await getEventsAnalysisAPI(userQueries);
        dispatch({
            type: GET_EVENT_ANALYSIS,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
    setAnalysisIsLoading(false, dispatch);
};

// Get Event Analysis by ID

export const getEventAnalysisByID = (eventId) => async (dispatch) => {
    setAnalysisIsLoading(true, dispatch);
    try {
        const data = await getEventAnalysisByIDAPI(eventId);
        dispatch({ type: GET_EVENT_ANALYSIS_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
    setAnalysisIsLoading(false, dispatch);
};

// Minh Part Send Notification
export const fetchEvents = () => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await fetchEventsAPI();
        dispatch({
            type: FETCH_EVENTS,
            payload: data
        });
        dispatch({
            type: GET_EVENTS_COMPLETE,
            payload: true
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
            payload: true
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        setTimeout(() => {
            dispatch({
                type: EVENT_CREATE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
        console.log(error);
    }
    setEventIsLoading(false, dispatch);
};

export const sendNotification = (notificationReq) => async (dispatch) => {
    dispatch({
        type: IS_SENDING_NOTIFICATION,
        payload: true
    });
    try {
        await sendNotificationAPI(notificationReq);

        dispatch({
            type: SEND_NOTI_SUCCESS,
            payload: true
        });

        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        setTimeout(() => {
            dispatch({
                type: SEND_NOTI_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
        console.log(error);
    }
    dispatch({
        type: IS_SENDING_NOTIFICATION,
        payload: false
    });
};

export const getEvents = (userQueries) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await getEventsAPI(userQueries);

        dispatch({
            type: EVENT_GET_ALL_FILTER,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
    setEventIsLoading(false, dispatch);
};

export const getFacilityAndTaskByEventCode = (code) => async (dispatch) => {
    setEventDetailIsLoading(true, dispatch);
    try {
        const data = await getFacilityAndTaskByEventCodeAPI(code);
        dispatch({
            type: EVENT_GET_FACILITY_AND_TASK,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
    setEventDetailIsLoading(false, dispatch);
};

export const getRegistrationPageDetail = (code) => async (dispatch) => {
    setEventDetailIsLoading(true, dispatch);
    try {
        const data = await getRegistrationPageDetailAPI(code);
        dispatch({
            type: EVENT_GET_FACILITY_AND_TASK,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
    setEventDetailIsLoading(false, dispatch);
};

export const deleteEventPermanent = (userReq) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        await deleteEventPermanentAPI(userReq);
        dispatch({
            type: EVENT_DELETE_SUCCESS,
            payload: true
        });
        setTimeout(() => {
            dispatch({
                type: EVENT_DELETE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
        console.log(error.message);
    }
    setEventIsLoading(false, dispatch);
};
export const deleteEvent = (userReq) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        await deleteEventAPI(userReq);
        dispatch({
            type: EVENT_DELETE_SUCCESS,
            payload: true
        });
        setTimeout(() => {
            dispatch({
                type: EVENT_DELETE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
        console.log(error.message);
    }
    setEventIsLoading(false, dispatch);
};
export const recoveryEvent = (userReq) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        await recoveryEventAPI(userReq);
        dispatch({
            type: EVENT_RECOVERY_SUCCESS,
            payload: true
        });
        setTimeout(() => {
            dispatch({
                type: EVENT_RECOVERY_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
        console.log(error.message);
    }
    setEventIsLoading(false, dispatch);
};

export const updateEvent = (userReq) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await updateEventAPI(userReq);

        dispatch({
            type: EVENT_UPDATE,
            payload: data
        });

        dispatch({
            type: EVENT_UPDATE_SUCCESS,
            payload: true
        });

        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        setTimeout(() => {
            dispatch({
                type: EVENT_UPDATE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        console.log(error);
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
    }
    setEventIsLoading(false, dispatch);
};

export const updateEventStatus = (userReq, urlCode) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await updateEventStatusAPI(userReq);

        dispatch({
            type: EVENT_UPDATE,
            payload: data
        });

        dispatch({
            type: EVENT_UPDATE_SUCCESS,
            payload: true
        });

        dispatch(sendParticipantsFeedback(urlCode));

        setTimeout(() => {
            dispatch({
                type: EVENT_UPDATE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        console.log(error);
    }
    setEventIsLoading(false, dispatch);
};

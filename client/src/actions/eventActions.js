import {
    EVENT_LOADING,
    EVENT_CREATE_SUCCESS,
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
    getEventsAPI,
    getFacilityAndTaskByEventNameAPI,
    updateEventAPI
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

export const getEvents = (search, take, page, type, budgetRange, participantRange) => async (dispatch) => {
    setEventIsLoading(true, dispatch);
    try {
        const data = await getEventsAPI(search, take, page, type, budgetRange, participantRange);

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
        const data = await deleteEventAPI(userReq);
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
        if (error.response.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors,
            });
        }
        console.log(error);
    }
    setEventIsLoading(false, dispatch)
}

import {
    EVENT_TYPE_GET_ALL,
    EVENT_TYPE_LOADING,
    EVENT_TYPE_UPDATE_SUCCESS,
    EVENT_TYPE_CREATE_SUCCESS,
    ERROR,
    ERROR_CLEAR,
    EVENT_TYPE_DELETE_SUCCESS,
    EVENT_TYPE_GET_ALL_FILTER,
} from '../constants';
import {
    getEventTypesAPI,
    createEventTypeAPI,
    updateEventTypeAPI,
    deleteEventTypesAPI,
    getAllEventTypesAPI,
} from '../api';

//setIsLoading func is to set loading status
const setEventTypeIsLoading = (status, dispatch) => {
    dispatch({
        type: EVENT_TYPE_LOADING,
        payload: status,
    });
};

export const getAllEventTypes = () => async (dispatch) => {
    setEventTypeIsLoading(true, dispatch);
    try {
        const data = await getAllEventTypesAPI();
        dispatch({
            type: EVENT_TYPE_GET_ALL,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
    setEventTypeIsLoading(false, dispatch);
};
export const getEventTypes = (
    search,
    take,
    page,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo
) => async (dispatch) => {
    setEventTypeIsLoading(true, dispatch);
    try {
        const data = await getEventTypesAPI(
            search,
            take,
            page,
            createdFrom,
            createdTo,
            updatedFrom,
            updatedTo
        );
        dispatch({
            type: EVENT_TYPE_GET_ALL_FILTER,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
    setEventTypeIsLoading(false, dispatch);
};
export const createEventType = (userReq) => async (dispatch) => {
    setEventTypeIsLoading(true, dispatch);
    try {
        await createEventTypeAPI(userReq);
        dispatch({
            type: EVENT_TYPE_CREATE_SUCCESS,
            payload: true,
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });

        setTimeout(() => {
            dispatch({
                type: EVENT_TYPE_CREATE_SUCCESS,
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
    setEventTypeIsLoading(false, dispatch);
};

export const updateEventType = (userReq) => async (dispatch) => {
    setEventTypeIsLoading(true, dispatch);
    try {
        await updateEventTypeAPI(userReq);
        dispatch({
            type: EVENT_TYPE_UPDATE_SUCCESS,
            payload: true,
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });

        setTimeout(() => {
            dispatch({
                type: EVENT_TYPE_UPDATE_SUCCESS,
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
    setEventTypeIsLoading(false, dispatch);
};
export const deleteEventTypes = (userReq) => async (dispatch) => {
    setEventTypeIsLoading(true, dispatch);
    try {
        await deleteEventTypesAPI(userReq);

        dispatch({
            type: EVENT_TYPE_DELETE_SUCCESS,
            payload: true,
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null,
        });

        setTimeout(() => {
            dispatch({
                type: EVENT_TYPE_DELETE_SUCCESS,
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
    setEventTypeIsLoading(false, dispatch);
};

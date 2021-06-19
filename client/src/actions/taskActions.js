import { TASK_LOADING, TASK_GET_ALL_FILTER, TASK_GET_ALL } from '../constants';
import { getTasksAPI, getTasksByEventAPI } from '../api';

//setIsLoading func is to set loading status
const setTaskIsLoading = (status, dispatch) => {
    dispatch({
        type: TASK_LOADING,
        payload: status
    });
};

export const getTasksByEvent = (userId) => async (dispatch) => {
    setTaskIsLoading(true, dispatch);
    try {
        const data = await getTasksByEventAPI(userId);
        dispatch({
            type: TASK_GET_ALL,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
    setTaskIsLoading(false, dispatch);
};

export const getTasks = (userQueries) => async (dispatch) => {
    setTaskIsLoading(true, dispatch);
    try {
        const data = await getTasksAPI(userQueries);
        dispatch({
            type: TASK_GET_ALL_FILTER,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
    setTaskIsLoading(false, dispatch);
};

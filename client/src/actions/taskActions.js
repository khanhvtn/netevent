import {
    TASK_LOADING,
    TASK_GET_ALL_FILTER,
} from '../constants';
import {
    getTasksAPI,
} from '../api';

//setIsLoading func is to set loading status
const setTaskIsLoading = (status, dispatch) => {
    dispatch({
        type: TASK_LOADING,
        payload: status,
    });
};

export const getTasks = (userId) => async (dispatch) => {
    setTaskIsLoading(true, dispatch);
    try {
        const data = await getTasksAPI(userId);
        dispatch({
            type: TASK_GET_ALL_FILTER,
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
    setTaskIsLoading(false, dispatch);
}
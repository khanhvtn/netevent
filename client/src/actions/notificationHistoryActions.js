import { NOTIFICATION_HISTORY_GET_ALL, NOTIFICATION_HISTORY_LOADING } from '../constants'
import { getNotificationHistoryByEventCodeAPI } from '../api';

const setNotificationHistoryIsLoading = (status, dispatch) => {
    dispatch({
        type: NOTIFICATION_HISTORY_LOADING,
        payload: status
    });
}

export const getNotificationHistoryByEventCode = (code) => async (dispatch) => {
    setNotificationHistoryIsLoading(true, dispatch)
    try {
        const data = await getNotificationHistoryByEventCodeAPI(code);
        dispatch({ type: NOTIFICATION_HISTORY_GET_ALL, payload: data })

    } catch (error) {
        console.log(error)
    }
    setNotificationHistoryIsLoading(false, dispatch)
}

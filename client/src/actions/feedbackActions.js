import { getFeedbackByEventIDAPI } from '../api';
import { FEEDBACK_LOADING, GET_FEEDBACK_BY_ID } from '../constants';

//setIsLoading func is to set loading status
const setFeedbackIsLoading = (status, dispatch) => {
    dispatch({
        type: FEEDBACK_LOADING,
        payload: status
    });
};

export const getFeedbackByEventID = (eventId) => async (dispatch) => {
    setFeedbackIsLoading(true, dispatch);
    try {
        const data = await getFeedbackByEventIDAPI(eventId);
        dispatch({ type: GET_FEEDBACK_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
    setFeedbackIsLoading(false, dispatch);
};

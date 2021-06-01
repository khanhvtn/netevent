import { getAllFacilityHistoriesAPI, getFacilityHistoriesAPI } from '../api';

import {
    FACILITY_HISTORY_GET_ALL,
    FACILITY_HISTORY_LOADING,
    FACILITY_HISTORY_GET_ALL_FILTER,
} from '../constants';

//setIsLoading func is to set loading status
const setFacilityHistoryIsLoading = (status, dispatch) => {
    dispatch({
        type: FACILITY_HISTORY_LOADING,
        payload: status,
    });
};
export const getAllFacilityHistories = () => async (dispatch) => {
    setFacilityHistoryIsLoading(true, dispatch);
    try {
        const data = await getAllFacilityHistoriesAPI();
        dispatch({
            type: FACILITY_HISTORY_GET_ALL,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
    setFacilityHistoryIsLoading(false, dispatch);
};
export const getFacilityHistories = (userQueries) => async (dispatch) => {
    setFacilityHistoryIsLoading(true, dispatch);
    try {
        const data = await getFacilityHistoriesAPI(userQueries);
        dispatch({
            type: FACILITY_HISTORY_GET_ALL_FILTER,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
    setFacilityHistoryIsLoading(false, dispatch);
};

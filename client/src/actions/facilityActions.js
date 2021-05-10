import {
    FACILITY_LOADING,
    CREATE_FACILITY,
    SEARCH_FACILITY,
    FETCH_ALL_FACILITIES,
    UPDATE_FACILITY,
    DELETE_FACILITY,
    FACILITY_CREATE_SUCCESS,
    FACILITY_UPDATE_SUCCESS
} from '../constants';

import * as api from '../api';

const setLoading = (status, dispatch) => {
    dispatch({
        type: FACILITY_LOADING,
        payload: status
    });
}

export const getFacilities = () => async (dispatch) => {
    setLoading(true, dispatch);

    try {
        const { data } = await api.fetchFacilitiesAPI();
        dispatch({ type: FETCH_ALL_FACILITIES, payload: data.data });
    } catch (error) {
        console.log(error);
    }
    setLoading(false, dispatch)
}

export const searchFacilities = (searchString) => async (dispatch) => {
    setLoading(true, dispatch);
    try {
        const { data } = await api.searchFacilityAPI(searchString);
        dispatch({ type: SEARCH_FACILITY, payload: data.data });
    } catch (error) {
        console.log(error);
    }
    setLoading(false, dispatch);
}

export const createFacility = (newFacility) => async (dispatch) => {
    try {
        const { data } = await api.createFacilityAPI(newFacility);
        dispatch({ type: CREATE_FACILITY, payload: data.data });
        dispatch({ type: FACILITY_CREATE_SUCCESS, payload: true });
    } catch (error) {
        console.log(error);
    }
}

export const updateFacility = (id, newUpdateFacility) => async (dispatch) => {
    try {
        const { data } = await api.updateFacilityAPI(id, newUpdateFacility);
        dispatch({ type: UPDATE_FACILITY, payload: data.data });
        dispatch({ type: FACILITY_UPDATE_SUCCESS, payload: true });
    } catch (error) {
        console.log(error);
    }
}

export const deleteFacility = (id) => async (dispatch) => {
    try {
        await api.deleteFacilityAPI(id);
        dispatch({ type: DELETE_FACILITY, payload: id });
    } catch (error) {
        console.log(error);
    }
}
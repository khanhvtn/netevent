import {
    FACILITY_GET_ALL,
    FACILITY_LOADING,
    FACILITY_UPDATE_SUCCESS,
    FACILITY_CREATE_SUCCESS,
    ERROR,
    ERROR_CLEAR,
    FACILITY_DELETE_SUCCESS,
    FACILITY_GET_ALL_FILTER,
    FACILITY_RECOVERY_SUCCESS
} from '../constants';
import {
    getFacilitiesAPI,
    createFacilityAPI,
    updateFacilityAPI,
    deleteFacilitiesAPI,
    getAllFacilitiesAPI,
    recoverFacilitiesAPI,
    deletePermanentFacilitiesAPI
} from '../api';

//setIsLoading func is to set loading status
const setFacilityIsLoading = (status, dispatch) => {
    dispatch({
        type: FACILITY_LOADING,
        payload: status
    });
};

export const getAllFacilities = () => async (dispatch) => {
    setFacilityIsLoading(true, dispatch);
    try {
        const data = await getAllFacilitiesAPI();
        dispatch({
            type: FACILITY_GET_ALL,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
    setFacilityIsLoading(false, dispatch);
};

export const getFacilities = (userQueries) => async (dispatch) => {
    setFacilityIsLoading(true, dispatch);
    try {
        const data = await getFacilitiesAPI(userQueries);
        dispatch({
            type: FACILITY_GET_ALL_FILTER,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
    setFacilityIsLoading(false, dispatch);
};

export const createFacility = (userReq) => async (dispatch) => {
    setFacilityIsLoading(true, dispatch);
    try {
        await createFacilityAPI(userReq);
        dispatch({
            type: FACILITY_CREATE_SUCCESS,
            payload: true
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        setTimeout(() => {
            dispatch({
                type: FACILITY_CREATE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response?.data?.errors
            });
        }
        console.log(error);
    }
    setFacilityIsLoading(false, dispatch);
};

export const updateFacility = (userReq) => async (dispatch) => {
    setFacilityIsLoading(true, dispatch);
    try {
        await updateFacilityAPI(userReq);
        dispatch({
            type: FACILITY_UPDATE_SUCCESS,
            payload: true
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        setTimeout(() => {
            dispatch({
                type: FACILITY_UPDATE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response?.data?.errors
            });
        }
        console.log(error);
    }
    setFacilityIsLoading(false, dispatch);
};

export const recoveryFacilities = (userReq) => async (dispatch) => {
    setFacilityIsLoading(true, dispatch);
    try {
        await recoverFacilitiesAPI(userReq);
        dispatch({
            type: FACILITY_RECOVERY_SUCCESS,
            payload: true
        });
        setTimeout(() => {
            dispatch({
                type: FACILITY_RECOVERY_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response?.data?.errors
            });
        }
        console.log(error);
    }
    setFacilityIsLoading(false, dispatch);
};

export const deleteFacilities = (userReq) => async (dispatch) => {
    setFacilityIsLoading(true, dispatch);
    try {
        await deleteFacilitiesAPI(userReq);

        dispatch({
            type: FACILITY_DELETE_SUCCESS,
            payload: true
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        setTimeout(() => {
            dispatch({
                type: FACILITY_DELETE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response?.data?.errors
            });
        }
        console.log(error);
    }
    setFacilityIsLoading(false, dispatch);
};
export const deletePermanentFacilities = (userReq) => async (dispatch) => {
    setFacilityIsLoading(true, dispatch);
    try {
        await deletePermanentFacilitiesAPI(userReq);
        dispatch({
            type: FACILITY_DELETE_SUCCESS,
            payload: true
        });
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        setTimeout(() => {
            dispatch({
                type: FACILITY_DELETE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response?.data?.errors
            });
        }
        console.log(error);
    }
    setFacilityIsLoading(false, dispatch);
};

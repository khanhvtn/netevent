import {
    PARTICIPANT_REGISTER,
    PARTICIPANT_LOADING,
    ERROR,
    ERROR_CLEAR,
    PARTICIPANT_GET_ALL_FILTER,
    PARTICIPANT_UPDATE_SUCCESS,
    PARTICIPANT_ALL
} from '../constants';
import {
    getParticipantsAPI,
    registerParticipantAPI,
    setAttendedParticipantAPI,
    setInvalidAndVerifyParticipantAPI,
    getAllParticipantsAPI
} from '../api';

//setIsLoading func is to set loading status
const setPartiticpantIsLoading = (status, dispatch) => {
    dispatch({
        type: PARTICIPANT_LOADING,
        payload: status
    });
};

export const registerParticipant = (participantData) => async (dispatch) => {
    try {
        dispatch({
            type: PARTICIPANT_LOADING,
            payload: true
        });
        await registerParticipantAPI(participantData);

        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
        dispatch({
            type: PARTICIPANT_REGISTER,
            payload: true
        });
        dispatch({
            type: PARTICIPANT_LOADING,
            payload: false
        });

        setTimeout(() => {
            dispatch({
                type: PARTICIPANT_REGISTER,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
        console.log(error);
    }
    dispatch({
        type: PARTICIPANT_LOADING,
        payload: false
    });
};

export const getParticipants =
    (search, take, page, academic, isValid, isAttended, eventId, status) =>
    async (dispatch) => {
        setPartiticpantIsLoading(true, dispatch);
        try {
            const data = await getParticipantsAPI(
                search,
                take,
                page,
                academic,
                isValid,
                isAttended,
                eventId,
                status
            );
            dispatch({
                type: PARTICIPANT_GET_ALL_FILTER,
                payload: data
            });
        } catch (error) {
            console.log(error.message);
        }
        setPartiticpantIsLoading(false, dispatch);
    };
export const getAllParticipants = (eventId) => async (dispatch) => {
    setPartiticpantIsLoading(true, dispatch);
    try {
        const data = await getAllParticipantsAPI(eventId);
        dispatch({ type: PARTICIPANT_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
    setPartiticpantIsLoading(false, dispatch);
};

export const setInvalidAndVerifyParticipant = (userReq) => async (dispatch) => {
    setPartiticpantIsLoading(true, dispatch);
    try {
        await setInvalidAndVerifyParticipantAPI(userReq);
        dispatch({
            type: PARTICIPANT_UPDATE_SUCCESS,
            payload: true
        });

        setTimeout(() => {
            dispatch({
                type: PARTICIPANT_UPDATE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        console.log(error.message);
    }
    setPartiticpantIsLoading(false, dispatch);
};

export const setAttendedParticipant = (userReq) => async (dispatch) => {
    setPartiticpantIsLoading(true, dispatch);
    try {
        await setAttendedParticipantAPI(userReq);
        dispatch({
            type: PARTICIPANT_UPDATE_SUCCESS,
            payload: true
        });

        setTimeout(() => {
            dispatch({
                type: PARTICIPANT_UPDATE_SUCCESS,
                payload: false
            });
        }, 3000);
    } catch (error) {
        console.log(error.message);
    }
    setPartiticpantIsLoading(false, dispatch);
};

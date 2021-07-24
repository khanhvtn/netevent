import {
    PARTICIPANT_REGISTER,
    PARTICIPANT_LOADING,
    ERROR,
    ERROR_CLEAR,
    PARTICIPANT_GET_ALL_FILTER,
    PARTICIPANT_UPDATE_SUCCESS,
    PARTICIPANT_ALL,
    PARTICIPANT_INVITATION_LIST_EMAIL,
    PARTICIPANT_INVITE,
    INVITATION_LOADING,
    PARTICIPANT_SPINNER_INDEX,
    PARTICIPANT_SEND_FEEDBACK,
    PARTICIPANT_SUBMIT_FEEBACK_LOADING,
    PARTICIPANT_SUBMIT_SUCCESS,
    PARTICIPANT_GET_FEEDBACK
} from '../constants';
import {
    getParticipantsAPI,
    registerParticipantAPI,
    setAttendedParticipantAPI,
    setInvalidAndVerifyParticipantAPI,
    getSuggestedParticipantsAPI,
    setAttendedParticipantByQrCodeAPI,
    inviteParticipantAPI,
    sendParticipantsFeedbackAPI,
    submitFeedbackAPI,
    getFeedbackAPI
} from '../api';

//setIsLoading func is to set loading status
const setPartiticpantIsLoading = (status, dispatch) => {
    dispatch({
        type: PARTICIPANT_LOADING,
        payload: status
    });
};

const setInvitationIsLoading = (status, dispatch) => {
    dispatch({
        type: INVITATION_LOADING,
        payload: status
    });
};

const setSubmitFeedbackIsLoading = (status, dispatch) => {
    dispatch({
        type: PARTICIPANT_SUBMIT_FEEBACK_LOADING,
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

        setTimeout(() => {
            dispatch({
                type: PARTICIPANT_REGISTER,
                payload: false
            });
        }, 3000);
    } catch (error) {
        if (error.response?.data?.errors) {
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

export const getSuggestedParticipants = (userQueries) => async (dispatch) => {
    setPartiticpantIsLoading(true, dispatch);
    try {
        const data = await getSuggestedParticipantsAPI(userQueries);
        dispatch({ type: PARTICIPANT_ALL, payload: data });
        dispatch({ type: PARTICIPANT_INVITATION_LIST_EMAIL, payload: data });
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

export const setAttendedParticipantByQrCode =
    (userReq, setScanDelay, setErrorMessage) => async (dispatch) => {
        setPartiticpantIsLoading(true, dispatch);
        try {
            await setAttendedParticipantByQrCodeAPI(userReq);
            dispatch({
                type: PARTICIPANT_UPDATE_SUCCESS,
                payload: true
            });

            //clear error
            dispatch({
                type: ERROR,
                payload: null
            });

            setTimeout(() => {
                dispatch({
                    type: PARTICIPANT_UPDATE_SUCCESS,
                    payload: false
                });
                //enable camera scan time out.
                setScanDelay(1000);
                setErrorMessage('');
            }, 3000);
        } catch (error) {
            console.log(error.message);
            if (error.response?.data?.errors) {
                dispatch({
                    type: ERROR,
                    payload: error.response.data?.errors
                });
            }
            //enable camera scan time out.
            setScanDelay(1000);
        }
        setPartiticpantIsLoading(false, dispatch);
    };

export const inviteParticipant =
    (index, email, eventCode) => async (dispatch) => {
        setInvitationIsLoading(true, dispatch);
        dispatch({ type: PARTICIPANT_SPINNER_INDEX, payload: index });

        try {
            const data = await inviteParticipantAPI(email, eventCode);
            dispatch({ type: PARTICIPANT_INVITE, payload: data });
        } catch (error) {
            console.log(error.message);
        }
        dispatch({ type: PARTICIPANT_SPINNER_INDEX, payload: null });
        setInvitationIsLoading(false, dispatch);
    };

export const sendParticipantsFeedback = (eventCode) => async (dispatch) => {
    try {
        await sendParticipantsFeedbackAPI(eventCode);
        dispatch({
            type: PARTICIPANT_SEND_FEEDBACK,
            payload: true
        });

        setTimeout(() => {
            dispatch({
                type: PARTICIPANT_SEND_FEEDBACK,
                payload: false
            });
        }, 3000);
    } catch (error) {
        console.log(error.message);
    }
};

export const submitFeedback = (submitForm) => async (dispatch) => {
    setSubmitFeedbackIsLoading(true, dispatch);
    try {
        const data = await submitFeedbackAPI(submitForm);

        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });

        dispatch({
            type: PARTICIPANT_SUBMIT_SUCCESS,
            payload: data
        });
    } catch (error) {
        if (error.response?.data?.errors) {
            dispatch({
                type: ERROR,
                payload: error.response.data?.errors
            });
        }
        console.log(error);
    }
    setSubmitFeedbackIsLoading(false, dispatch);
};

export const getFeedback = (code) => async (dispatch) => {
    setPartiticpantIsLoading(true, dispatch);
    try {
        const data = await getFeedbackAPI(code);
        dispatch({
            type: PARTICIPANT_GET_FEEDBACK,
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
    setPartiticpantIsLoading(false, dispatch);
};

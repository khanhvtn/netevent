import {
    PARTICIPANT_REGISTER,
    PARTICIPANT_LOADING,
    ERROR
} from '../constants';
import { registerParticipantAPI } from '../api';


const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const registerParticipant = (participantData) => async (dispatch) => {
    try {
        dispatch({
            type: PARTICIPANT_LOADING,
            payload: true
        })
        await registerParticipantAPI(participantData);
        dispatch({
            type: PARTICIPANT_REGISTER,
            payload: true
        })
        dispatch({
            type: PARTICIPANT_LOADING,
            payload: false
        })

        setTimeout(() => {
            dispatch({
                type: PARTICIPANT_REGISTER,
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
}
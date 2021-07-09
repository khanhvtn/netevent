import { GET_LINKS, GET_LINK_COMPLETE, GET_LINK_BY_ID } from '../constants';
import * as api from '../api';

//setIsLoading func is to set loading status
const setGetLinkIsLoading = (status, dispatch) => {
    dispatch({
        type: GET_LINK_COMPLETE,
        payload: status
    });
};

export const getLinks = () => async (dispatch) => {
    try {
        const { data } = await api.getLinks();
        dispatch({ type: GET_LINKS, payload: data });
        dispatch({ type: GET_LINK_COMPLETE, payload: true });
    } catch (error) {
        console.log(error);
    }
};

export const getLink = (id) => async (dispatch) => {
    setGetLinkIsLoading(false, dispatch);
    try {
        const { data } = await api.getLinkAPI(id);
        dispatch({ type: GET_LINK_BY_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
    setGetLinkIsLoading(true, dispatch);
};

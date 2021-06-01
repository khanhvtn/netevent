import { GET_LINKS, GET_LINK_COMPLETE } from '../constants'
import * as api from '../api';


export const getLinks = () => async (dispatch) => {
    try {
        const { data } = await api.getLinks();
        dispatch({ type: GET_LINKS, payload: data })
        dispatch({ type: GET_LINK_COMPLETE, payload: true })


    } catch (error) {
        console.log(error)
    }
}


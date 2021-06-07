import { GET_LINKS, GET_LINK_COMPLETE } from '../constants'
import {getLinksAPI} from '../api';


export const getLinks = () => async (dispatch) => {
    try {
        const { data } = await getLinksAPI();
        dispatch({ type: GET_LINKS, payload: data })
        dispatch({ type: GET_LINK_COMPLETE, payload: true })


    } catch (error) {
        console.log(error)
    }
}


import {GET_LINKS} from '../constants'
import * as api from '../api';


export const getLinks = () => async (dispatch) => {
    try {
        const {data} = await api.getLinks();
        dispatch({type: GET_LINKS, payload: data})
    } catch (error) {
        console.log(error)
    }
}


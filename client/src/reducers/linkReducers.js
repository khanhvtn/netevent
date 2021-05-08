import {GET_LINKS} from '../constants'

const initialState = {
    links: []
}

export default function linkReducers(state = initialState, action) {
    switch(action.type){
        case GET_LINKS:
            return {...state, links: action.payload}
        default:
            return state
    }
}
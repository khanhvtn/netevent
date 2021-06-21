import { GET_LINKS, GET_LINK_COMPLETE } from '../constants';

const initialState = {
    links: [],
    complete: false
};

export default function linkReducers(state = initialState, action) {
    switch (action.type) {
        case GET_LINKS:
            return { ...state, links: action.payload };
        case GET_LINK_COMPLETE:
            return { ...state, complete: action.payload };
        default:
            return state;
    }
}

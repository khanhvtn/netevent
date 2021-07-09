import { GET_LINKS, GET_LINK_COMPLETE, GET_LINK_BY_ID } from '../constants';

const initialState = {
    links: [],
    complete: false,
    link: []
};

export default function linkReducers(state = initialState, action) {
    switch (action.type) {
        case GET_LINKS:
            return { ...state, links: action.payload };
        case GET_LINK_COMPLETE:
            return { ...state, complete: action.payload };
        case GET_LINK_BY_ID:
            return { ...state, link: action.payload };
        default:
            return state;
    }
}

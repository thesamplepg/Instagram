import * as actionTypes from '../actions';

const initialState = {
    publications: null,
    getPublicationsLoading: true
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PUBLICATIONS:
            return {
                ...state,
                getPublicationsLoading: true
            }
        case actionTypes.GET_PUBLICATIONS_TRUE:
            return {
                ...state,
                getPublicationsLoading: false,
                publications: action.payload.publications
            }
        case actionTypes.GET_PUBLICATIONS_FALSE:
            return {
                ...state,
                getPublicationsLoading: false
            }
        default: return state;
    }
}

export default posts;
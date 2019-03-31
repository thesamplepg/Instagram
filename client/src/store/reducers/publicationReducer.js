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
        case actionTypes.PUBLICATION_LIKE:
            
            const publications = [...state.publications];

            publications[action.payload.index].likes.push(action.payload.liker);
        
            return {
                ...state,
                publications 
            }
        case actionTypes.PUBLICATION_UNLIKE:
            
            const { index, unliker } = action.payload;
            const newPublications = [...state.publications];

            newPublications[index].likes.splice(newPublications[index].likes.indexOf(unliker), 1);

            return {
                ...state,
                publications: newPublications
            }
        default: return state;
    }
}

export default posts;
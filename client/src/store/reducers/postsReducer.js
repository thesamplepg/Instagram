import * as actionTypes from '../actions';

const initialState = {
    getPostsLoading: true,
    posts: [],
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
            return {
                ...state,
                getPostsLoading: true
            }
        case actionTypes.GET_POSTS_TRUE:
            return {
                ...state,
                getPostsLoading: false,
                posts: action.payload.posts
            }
        case actionTypes.GET_POSTS_FALSE:
            return {
                ...state,
                getPostsLoading: false
            }
        default: return state;
    }
}

export default posts;
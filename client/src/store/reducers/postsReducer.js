import * as actionTypes from '../actions';

const initialState = {
    getPostsLoading: true,
    posts: [],
    post: null,
    getOnePostLoading: true
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
        case actionTypes.GET_ONE_POST:
            return {
                ...state,
               getOnePostLoading: true
            }
        case actionTypes.GET_ONE_POST_TRUE:
            return {
                ...state,
                getOnePostLoading: false,
                post: action.payload.post
            }
        case actionTypes.GET_ONE_POST_FALSE:
            return {
                ...state,
                getOnePostLoading: false
            }
        default: return state;
    }
}

export default posts;
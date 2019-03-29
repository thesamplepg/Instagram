import * as actionTypes from '../actions';

const initialState = {
    getPostsLoading: true,
    posts: [],
    post: null,
    getOnePostLoading: true,
    addCommentLoading: false
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
        case actionTypes.LIKE:
            return {
                ...state,
                post: {
                    ...state.post,
                    likes: [
                        ...state.post.likes, 
                        action.payload.liker
                    ]
                }
            }
        case actionTypes.UNLIKE:
            return {
                ...state,
                post: {
                    ...state.post,
                    likes: state.post.likes.filter(user => user !== action.payload.unliker)
                }
            }
        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                addCommentLoading: true
            }
        case actionTypes.ADD_COMMENT_TRUE:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [
                        ...state.post.comments,
                        action.payload.comment
                    ]
                },
                addCommentLoading: false
            }
        case actionTypes.ADD_COMMENT_FALSE:
            return {
                ...state,
                addCommentLoading: false
            }
        default: return state;
    }
}

export default posts;
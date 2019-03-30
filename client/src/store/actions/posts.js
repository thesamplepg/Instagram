import * as actionType from './index';

export const GetPosts = (userName, page) => dispatch => {

    dispatch({ type: actionType.GET_POSTS });

    fetch(`/api/posts?userName=${userName}&s=${page * 21}&l=21`)
        .then(res => res.json())
        .then(data => {
            if(data.posts) {
                dispatch({
                    type: actionType.GET_POSTS_TRUE,
                    payload: { posts: data.posts }
                });
            } else {
                dispatch({
                    type: actionType.GET_ACCOUNT_FALSE
                });
            }
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: actionType.GET_ACCOUNT_FALSE
            });
        });

}

export const GetOnePost = (id) => dispatch => {
    dispatch({ type: actionType.GET_ONE_POST });

    fetch(`/api/posts/post?id=${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.post) {
                dispatch({
                    type: actionType.GET_ONE_POST_TRUE,
                    payload: { post: data.post }
                });
            } else {
                dispatch({ type: actionType.GET_ONE_POST_FALSE });
            }
        })
        .catch(err => {
            dispatch({ type: actionType.GET_ACCOUNT_FALSE });
            console.log(err)
        });
}

export const Like = (liker) => ({ type: actionType.LIKE, payload: { liker } });
export const Unlike = (unliker) => ({ type: actionType.UNLIKE, payload: { unliker } });

export const GetNewComments = ({postId, page}) => async dispatch => {
    dispatch({ type: actionType.GET_NEW_COMMENTS });

    const res = await fetch(`/api/posts/comments?postId=${postId}&page=${page}`);
    const data = await res.json();

    if(data.success) {
        dispatch({ type: actionType.GET_NEW_COMMENTS_TRUE, payload: {comments: data.comments}});
    } else {
        dispatch({ type: actionType.GET_NEW_COMMENTS_FALSE });
    }
}

export const AddComment = (comment, postId) => async dispatch => {
    dispatch({ type: actionType.ADD_COMMENT });

    try {
        const res = await fetch('/api/posts/comment', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                comment, postId
            })
        });

        const data = await res.json();

        if(data.success) {
            dispatch({
                type: actionType.ADD_COMMENT_TRUE,
                payload: { comment: data.comment }
            });
        } else {
            dispatch({
                type: actionType.ADD_COMMENT_FALSE
            });
        }
    
    } catch (error) {
        console.log(error);
        dispatch({
            type: actionType.ADD_COMMENT_FALSE
        });
    }
};

export const LikeComment = (liker, index) => ({ type: actionType.LIKE_COMMENT, payload: { liker, index } });
export const UnlikeComment = (unliker, index) => ({ type: actionType.UNLIKE_COMMENT, payload: { unliker, index } });

export const GetPublications = (page) => async dispatch => {
    dispatch({ type: actionType.GET_PUBLICATIONS });

    try {
        const res = await fetch(`/api/posts/publications?page=${page}`);
        const data = await res.json();

        dispatch({ type: actionType.GET_PUBLICATIONS_TRUE, payload: { publications: data.publications } });
    } catch (error) {
        console.log(error);
        dispatch({ type: actionType.GET_NEW_COMMENTS_FALSE });
    }
}
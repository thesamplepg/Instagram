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
import * as actionType from './index';

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
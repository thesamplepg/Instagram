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

export const PublicationLike = (liker, index) => ({ 
    type: actionType.PUBLICATION_LIKE, 
    payload: { liker, index } 
});
export const PublicationUnlike = (unliker, index) => ({ 
    type: actionType.PUBLICATION_UNLIKE, 
    payload: { unliker, index } 
});

import * as actionTypes from './index';

export const Authorizate = () => async dispatch => {
    dispatch({ type: actionTypes.AUTHORIZATION });

    const res = await fetch('/api/accounts/authorization');
    const data = await res.json();

    if(data.success) dispatch({ type: actionTypes.AUTHORIZATION_TRUE, payload: {userName: data.userName }});
    else dispatch({ type: actionTypes.AUTHORIZATION_FALSE });
}
import * as actionTypes from './index';

export const GetAccount = (AuthoriziedUserName) => async dispatch => {
    
    dispatch({ type: actionTypes.GET_ACCOUNT });

    const userName = window.location.pathname.split('/')[1];
    
    fetch(`/api/accounts?userName=${userName}`)
        .then(res => res.json())
        .then(data => {
            
            if(data.success)
            {
                dispatch({
                    type: actionTypes.GET_ACCOUNT_TRUE,
                    payload: {
                        userName: AuthoriziedUserName,
                        account: data.account
                    }
                });
            } else 
            {
                dispatch({
                    type: actionTypes.GET_ACCOUNT_FALSE
                })
            }

        });

}

export const ChangeAvatar = ( formData ) => async dispatch => {

    dispatch({ type: actionTypes.CHANGE_AVATAR });

    const res = await fetch('/api/accounts/avatar', { body: formData, method: 'PUT' });
    const data = await res.json();

    if(data.success) dispatch({ type: actionTypes.CHANGE_AVATAR_TRUE, payload: { avatar: data.avatar } });
    else dispatch({ type: actionTypes.CHANGE_AVATAR_FALSE });

}

export const Follow = ( follower ) => ({ type: actionTypes.FOLLOW, payload: { follower } });

export const Unfollow = ( unfollower ) => ({ type: actionTypes.UNFOLLOW, payload: { unfollower } });
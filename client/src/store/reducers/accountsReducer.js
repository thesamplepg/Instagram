import * as actionTypes from '../actions';

const initialState = {
    account: null,
    isOwner: false,
    getAccountLoading: true,
    changeAvatarLoading: false,
    followed: false
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACCOUNT:
            return {
                ...state,
                getAccountLoading: true
            }
        case actionTypes.GET_ACCOUNT_TRUE:

            let followed;

            if(action.payload.userName === action.payload.account.userName) {
                followed = false;
            } else {
                followed = action.payload.account.followers.indexOf(action.payload.userName) > -1;
            }
    
            return {
                ...state,
                getAccountLoading: false,
                account: action.payload.account,
                followed,
                isOwner: action.payload.userName === action.payload.account.userName
            }
        case actionTypes.GET_ACCOUNT_FALSE:
            return {
                ...state,
                getAccountLoading: false,
                account: null
            }
        case actionTypes.CHANGE_AVATAR:
            return {
                ...state,
                changeAvatarLoading: true
            }
        case actionTypes.CHANGE_AVATAR_TRUE:
            return {
                ...state,
                changeAvatarLoading: false,
                account: {
                    ...state.account,
                    avatar: action.payload.avatar
                }
            }
        case actionTypes.CHANGE_AVATAR_FALSE:
            return {
                ...state,
                changeAvatarLoading: false
            }
        case actionTypes.FOLLOW:
            return {
                ...state,
                followed: true,
                account: {
                    ...state.account,
                    followers: [
                        ...state.account.followers,
                        action.payload.follower
                    ]
                }
            }
        case actionTypes.UNFOLLOW:

            const filteredFollowers = state.account.followers.filter(follower => follower !== action.payload.unfollower);

            return {
                ...state,
                followed: false,
                account: {
                    ...state.account,
                    followers: filteredFollowers
                }
            }
        default: return state;
    }
}

export default account;
import * as actionTypes from '../actions';

const initialState = {
    authorization: false,
    authorizationLoading: true,
    userName: null,
    avatar: null,
    fullName: null
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZATION:
            return {
                ...state,
                authorizationLoading: true
            }
        case actionTypes.AUTHORIZATION_TRUE:
            const { userName, avatar, fullName } = action.payload; 
            
            return {
                ...state,
                authorization: true,
                authorizationLoading: false,
                userName,
                avatar,
                fullName 
            }
        case actionTypes.AUTHORIZATION_FALSE:
            return {
                ...state,
                authorization: false,
                authorizationLoading: false,
                userName: null
            }
        default: return state;
    }
}

export default account;
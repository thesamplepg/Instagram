import * as actionTypes from '../actions';

const initialState = {
    authorization: false,
    authorizationLoading: true,
    userName: null
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZATION:
            return {
                ...state,
                authorizationLoading: true
            }
        case actionTypes.AUTHORIZATION_TRUE:
            return {
                ...state,
                authorization: true,
                authorizationLoading: false,
                userName: action.payload.userName
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
import { combineReducers } from 'redux';

import authorizuedAccountState from './authoriziesAccountReducer';
import accounts from './accountsReducer';
import posts from './postsReducer';

export default combineReducers({
    authoriziedAccount: authorizuedAccountState,
    accounts: accounts,
    posts: posts
});
import { combineReducers } from 'redux';

import authorizuedAccountState from './authoriziesAccountReducer';
import accounts from './accountsReducer';
import posts from './postsReducer';
import publications from './publicationReducer';

export default combineReducers({
    authoriziedAccount: authorizuedAccountState,
    accounts: accounts,
    posts: posts,
    publications: publications 
});
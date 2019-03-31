import { combineReducers } from 'redux';

import authoriziedAccountReducer from './authoriziedAccountReducer';
import accounts from './accountsReducer';
import posts from './postsReducer';
import publications from './publicationReducer';

export default combineReducers({
    authoriziedAccount: authoriziedAccountReducer,
    accounts: accounts,
    posts: posts,
    publications: publications 
});
import { combineReducers } from 'redux';

import authorizuedAccountState from './authoriziesAccountReducer';
import accounts from './accountsReducer';

export default combineReducers({
    authoriziedAccount: authorizuedAccountState,
    accounts: accounts
});
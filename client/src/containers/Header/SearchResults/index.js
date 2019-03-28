import React from 'react';

import classes from './index.css';
import { NavLink } from 'react-router-dom';

const SearchResults = ({accounts}) => {
    
    let accountsOutput = <div className={classes.NotFound}>No results found</div>;

    if(accounts && accounts.length > 0) {
        accountsOutput = [];
        
        accounts.forEach(account => {
            accountsOutput.push(
                <NavLink 
                    to={`/${account.userName}`} 
                    className={classes.Account} 
                    key={account.userName}
                >
                    <div className={classes.Wrapper}>
                        <img src={account.avatar} alt={account.userName} />
                        <div className={classes.Name}>
                            <div>{account.userName}</div>
                            <div>{account.fullName}</div>
                        </div>
                    </div>
                </NavLink>
            );
        });
    }
    
    return (
        <div className={classes.SearchResults}>
            <div className={classes.Container}>
                {accountsOutput}
            </div>
        </div>
    );
}

export default SearchResults;

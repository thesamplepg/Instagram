import React from 'react';

import classes from './index.css';

const DigitalPart = ({account}) => {
    return (
        <div className={classes.DigitalPart}>
            <div>
                <span>{account.posts.length}</span> posts
            </div>    
            <div>
                <span>{account.followers.length}</span> followers
            </div>
            <div>
                <span>{account.follows.length}</span> following
            </div>
        </div>
    );
}

export default DigitalPart;

import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './index.css';

const UserNameSection = ({userName, avatar}) => {
    return (
        <div className={classes.UserName}>
            <img src={avatar} alt="avatar" />
            <div>
                <NavLink to={`/${userName}`}>
                    {userName}
                </NavLink>
            </div>
        </div>
    );
}

export default UserNameSection;

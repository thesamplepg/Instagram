import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './index.css';

const Follower = (props) => {
    return (
        <NavLink className={classes.Follower} to={`/${props.userName}`}>
            <img src={props.avatar} alt="avatar" />
            <div>
                <div>
                    {props.userName}
                </div>
                <div>{props.fullName}</div>
            </div>
        </NavLink>
    );
}

export default Follower;

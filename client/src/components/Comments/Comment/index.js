import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../../Icon';

const getDateDifference = (date) => {
    const commentDate = Date.now() - date;
    const hours = Math.round(commentDate / 1000 / 60 / 60);

    let result = hours > 0 ? `${hours}h` : 'now';

    if(hours > 24) {
        result = `${Math.round(result / 24)}d`;
    } else if (hours > (24 * 30)) {
        result = `${Math.round(result / (24 * 30))}w`
    } else if (hours > (24 * 30 * 12)) {
        result = `${Math.round(result / (24 * 30 * 12))}y`
    }
    
    return result;
}

const Comment = ({ comment }) => {
    return (
        <li className={classes.Comment}>
            <img src={comment.avatar} alt="avatar" />
            <div className={classes.Information}>
                <span className={classes.UserName}>
                    {comment.creater}
                </span>
                {comment.text}
                <div className={classes.Date}>
                    {getDateDifference(comment.date)}
                </div>
                <div className={classes.Like}>
                    <Icon icon={faHeart}/>
                </div>
            </div>
        </li>
    );
}

export default Comment;

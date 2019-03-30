import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

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

const Comment = ({ comment, toggleLike, liked, index }) => {
    const type = liked ? 'unlike' : 'like';
    const path = `/${comment.creater}`

    return (
        <li className={classes.Comment}>
            <NavLink to={path} className={classes.ImageLink}>
                <img src={comment.avatar} alt="avatar" />
            </NavLink>
            <div className={classes.Information}>
                <NavLink to={path} className={classes.UserName}>
                    {comment.creater}
                </NavLink>
                {comment.text}
                <div className={classes.DateAndLikes}>
                    {getDateDifference(comment.date)} 
                    <span>{comment.likes.length} likes</span>
                </div>
                <div 
                    onClick={() => toggleLike(comment._id, type, index)} 
                    className={[classes.Like, liked ? classes.Liked : ''].join(' ')}
                >
                    <Icon icon={faHeart}/>
                </div>
            </div>
        </li>
    );
}

export default Comment;

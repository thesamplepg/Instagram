import React from 'react';

import classes from './index.css';
import Comment from './Comment';

const Comments = ({ comments }) => {
    return (
        <div className={classes.Comments}>
            <ul className={classes.CommentsList}>
                {
                    comments.map((comment, index) => {
                        return <Comment comment={comment} key={index}/>
                    })
                }
            </ul>
        </div>
    );
}

export default Comments;

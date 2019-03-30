import React from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Comment from './Comment';
import Icon from '../Icon';

const Comments = ({ comments, getNewComments, newComments }) => {
    return (
        <div className={classes.Comments}>
            <ul className={classes.CommentsList}>
                {
                    comments.map((comment, index) => {
                        return <Comment comment={comment} key={index}/>
                    })
                }
                {
                    newComments ?
                    <div className={classes.ButtonContainer}>
                        <div className={classes.PlusButton} onClick={getNewComments}>
                            <Icon icon={ faPlusCircle }/>
                        </div>
                    </div> :
                    null
                }
            </ul>
        </div>
    );
}

export default Comments;

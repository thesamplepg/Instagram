import React from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Comment from './Comment';
import Icon from '../Icon';
import ButtonLoader from '../ButtonLoader';

const Comments = (props) => {
    return (
        <div className={classes.Comments}>
            <ul className={classes.CommentsList}>
                {
                    props.comments.map((comment, index) => {
                        return <Comment 
                            comment={comment} 
                            key={index}
                            liked={props.comments[index].likes.indexOf(props.userName) > -1}
                            toggleLike={props.toggleLike}
                            index={index}
                        />
                    })
                }
                {
                    props.newComments ?
                    <div className={classes.ButtonContainer}>
                        <div className={classes.PlusButton} onClick={props.getNewComments}>
                            { props.loading ? <ButtonLoader /> : null }
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

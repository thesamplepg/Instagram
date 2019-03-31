import React from 'react';
import { NavLink } from 'react-router-dom'; 

import classes from './index.css';
import UserNameSection from '../../../../components/UserNameSection';
import Options from '../../../Options';
import CommentAddSection from '../../../CommentAddSection';

const Publication = (props) => {

    return (
        <li className={classes.Publication}>
            <UserNameSection 
                userName={props.creater}
                avatar={props.avatar}
            />
            <div className={classes.ImageContainerPub}>
                <img src={props.image} alt="publication"/>
            </div>
            <Options
                id="publication-comment" 
                {...props}
            />
            <div className={classes.CommentLink}>
                <NavLink to={`/post/${props._id}`}>
                    View comments
                </NavLink>
            </div>
            <CommentAddSection 
                id="publication-comment"
                addComment={props.addComment}
                loading={props.commentLoading}
            />
        </li>
    );
}

export default Publication;

import React from 'react';

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
            <div className={classes.ImageContainer}>
                <img src={props.image} alt="publication"/>
            </div>
            <Options
                id="publication-comment" 
                {...props}
            />
            <CommentAddSection 
                id="publication-comment"
            />
        </li>
    );
}

export default Publication;

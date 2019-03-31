import React from 'react';

import classes from './index.css';
import Publication from './Publication';

const PublicationsList = (props) => {
    return (
        <ul className={classes.PublicationsList}>
            {
                props.publications.map((publication, index) => {
                    const isLiked = publication.likes.indexOf(props.userName) > -1;
 
                    return <Publication 
                        liked={isLiked}
                        toggleLike={() => {
                            !isLiked ?
                            props.toggleLike(index, 'like', publication._id) :
                            props.toggleLike(index, 'unlike', publication._id)
                        }}
                        addComment={(comment) => props.addComment(comment, publication._id)}
                        commentLoading={props.commentLoading}
                        key={index}
                        {...publication}
                    />
                })
            }
        </ul>
    );
}

export default PublicationsList;

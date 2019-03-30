import React from 'react';

import classes from './index.css';
import Publication from './Publication';

const PubliacationsList = (props) => {
    return (
        <ul className={classes.PubliacationsList}>
            {
                props.publications.map((publication, index) => {
                    return <Publication 
                        key={index}
                        {...publication}
                    />
                })
            }
        </ul>
    );
}

export default PubliacationsList;

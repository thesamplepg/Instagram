import React from 'react';

import classes from './index.css';
import Header from '../../containers/Header';

const NotFound = () => {
    return (
        <React.Fragment>
            <Header />
            <div className={classes.NotFound}>
                Account not found
            </div>
        </React.Fragment>
    );
}

export default NotFound;

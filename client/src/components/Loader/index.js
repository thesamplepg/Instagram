import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../Icon';

const Loader = () => {
    return (
        <div className={classes.Loader}>
            <Icon icon={ faSpinner }/>
        </div>
    );
}


export default Loader;

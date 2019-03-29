import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Icon';
import classes from './index.css';

const BlockLoader = () => {
    return (
        <div className={classes.BlockLoader}>
            <Icon icon={ faSpinner }/>
        </div>
    );
}

export default BlockLoader;

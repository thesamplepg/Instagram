import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Icon';
import classes from './index.css';

const ButtonLoader = () => {
    return (
        <div className={classes.ButtonLoader}>
            <Icon icon={ faSpinner }/>
        </div>
    );
}

export default ButtonLoader;

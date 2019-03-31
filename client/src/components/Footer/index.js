import React from 'react';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../Icon';

const Footer = () => {
    return (
        <div className={classes.Footer}>
            <Icon icon={faCopyright}/>
            Aktan Tashamatov   
        </div>
    );
}

export default Footer;

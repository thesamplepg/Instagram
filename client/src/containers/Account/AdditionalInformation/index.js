import React from 'react';

import classes from './index.css';

const AdditionalInformation = ({account}) => {
    return (
        <div className={classes.AdditionalInformation}>
            <div className={classes.fullName}>
                { account.fullName }
            </div>
            <div className={classes.About}>
                { account.About }
            </div>
            <div className={classes.Web}>
                <a href={account.web} target="_blanck">{account.web}</a>
            </div>
        </div>
    );
}

export default AdditionalInformation;

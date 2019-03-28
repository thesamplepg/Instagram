import React, { Component } from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, withRouter } from 'react-router-dom';

import Header from '../../Header';
import classes from '../index.css';
import Avatar from '../Avatar';
import Icon from '../../../components/Icon';
import DigitalPart from '../DigitalPart';
import AdditionalInformation from '../AdditionalInformation';

class Authorizied extends Component {
   
    render() {

        const { account } = this.props;

        return (
            <React.Fragment>
                <Header />
                <div className={classes.Account}>
                    <div className={classes.Container}>
                        <div className={classes.AccountInformation}>
                            <Avatar isAuthorizied={true} image={account.avatar}/>
                            <div className={classes.Information}>
                                <div className={classes.Top}>
                                    <div className={classes.userName}>
                                        { account.userName }
                                    </div>
                                    <div className={classes.ButtonsContainer}>
                                        <NavLink to={this.props.location.pathname + '/edit'} className={classes.EditButton}>
                                            Edit profile
                                        </NavLink>
                                        <div className={classes.Logout}>
                                            <Icon  icon={faSignOutAlt} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    window.innerWidth > 750 ?
                                    <React.Fragment>
                                        <DigitalPart account={ account } />
                                    <AdditionalInformation account={ account } />
                                    </React.Fragment> :
                                    null 
                                }
                            </div> 
                        </div>
                        {
                            window.innerWidth < 750 ?
                            <React.Fragment>
                                <AdditionalInformation account={ account } />
                                <DigitalPart account={ account } />
                            </React.Fragment> :
                            null 
                        }
                    </div>
                </div>  
            </React.Fragment>
        )
    }
}

export default withRouter(Authorizied);

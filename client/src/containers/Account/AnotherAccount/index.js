import React, { Component } from 'react';

import Header from '../../Header';
import classes from '../index.css';
import Avatar from '../Avatar';
import ButtonLoader from '../../../components/ButtonLoader';
import DigitalPart from '../DigitalPart';
import AdditionalInformation from '../AdditionalInformation';

class AnotherAccount extends Component {
   
    state = {
        loading: false
    }

    sendRequest = (url, body) => {
        this.setState({loading: true});

        return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            this.setState({loading: false});
            return Promise.resolve(data);
        })
        .catch(err => {
            console.log(err);
            this.setState({ loading: false });
            return Promise.resolve({success: false});
        })
    }

    followHandler = () => {
        if(!this.props.followed && !this.state.loading) {
            this.sendRequest('/api/accounts/follow', {
                toFollow: this.props.account.userName
            })
            .then(res => {
                if(res.success) {
                    this.props.Follow(this.props.userName);
                }
            });
        }
    }

    unfollowHandler = () => {
        if(this.props.followed && !this.state.loading) {
            this.sendRequest('/api/accounts/unfollow', {
                toUnfollow: this.props.account.userName
            })
            .then(res => {
                if(res.success) {
                    this.props.Unfollow(this.props.userName);
                }
            });
        }
    }

    render() {

        const { account, followed } = this.props;

        return (
            <React.Fragment>
                <Header />
                <div className={classes.Account}>
                    <div className={classes.Container}>
                        <div className={classes.AccountInformation}>
                            <Avatar isAuthorizied={false} image={account.avatar}/>
                            <div className={classes.Information}>
                                <div className={classes.Top}>
                                    <div className={classes.userName}>
                                        { account.userName }
                                    </div>
                                    {
                                        !followed ?
                                        <div 
                                            className={classes.Button} 
                                            onClick={this.followHandler}
                                        >
                                            Follow
                                            { this.state.loading ? <ButtonLoader /> : null}
                                        </div> :
                                        <div 
                                            className={classes.Button + ' ' + classes.Unfollow} 
                                            onClick={this.unfollowHandler}
                                        >
                                            Unfollow
                                            { this.state.loading ? <ButtonLoader /> : null}
                                        </div>
                                    }
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

export default AnotherAccount;

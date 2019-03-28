import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetAccount, Follow, Unfollow } from '../../store/actions/accounts';

import { isAuthorizied } from '../../components/Utilits';
import Loader from '../../components/Loader';
import AnotherAccount from './AnotherAccount';
import Authorizied from './Authorizied';
import NotFound from '../../components/NotFound';

class Account extends Component {

    state = {
        account: window.location.pathname.split('/')[1]
    }

    componentDidUpdate(prevProps) {
        if(isAuthorizied(this.props)) {
            const newAccount = window.location.pathname.split('/')[1];

            if( this.props.loading && prevProps.account === null ) {
                this.props.GetAccount(this.props.userName);
            }
            else {
                if(this.state.account !== newAccount) {
                    this.setState({account: newAccount}, () => {
                        this.props.GetAccount(this.props.userName);
                    });
                }
            }
        }

    }


    render() {
        let output = <Loader />

        if(!this.props.loading) {
            const { account } = this.props;

            if(account) {
                if(this.props.isOwner) {
                    output = <Authorizied 
                        account={account}
                    />
                } else {
                    output = <AnotherAccount 
                        followed={this.props.followed} 
                        account={account}
                        Follow={this.props.Follow}
                        Unfollow={this.props.Unfollow}    
                        userName={this.props.userName}
                    />
                }
            } else {
                output = <NotFound />
            }
        }

        return output;
    }
}

export default connect( state => ({ 
    userName: state.authoriziedAccount.userName,
    authorization: state.authoriziedAccount.authorization,
    authorizationLoading: state.authoriziedAccount.authorizationLoading,
    loading: state.accounts.getAccountLoading,
    account: state.accounts.account,
    isOwner: state.accounts.isOwner,
    followed: state.accounts.followed
}), { GetAccount, Follow, Unfollow })(Account);

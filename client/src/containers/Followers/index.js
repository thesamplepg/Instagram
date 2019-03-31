import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './index.css';
import BlockLoader from '../../components/BlockLoader';
import Follower from './Follower';

class Followers extends Component {

    state = {
        fixed: false,
        loading: true,
        followers: null
    }

    scrollHandler = () => {
        if(window.scrollY > 69 && !this.state.fixed) {
            this.setState({fixed: true});
        } else if(window.scrollY < 69 && this.state.fixed) {
            this.setState({fixed: false});
        }
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);

        const res = await fetch('/api/accounts/followers');
        const data = await res.json();

        this.setState({followers: data.followers, loading: false});
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        let followers = <BlockLoader />

        if(!this.state.loading) {
            if(this.state.followers.length > 0) {
                followers = (
                    <div className={classes.ScrollContainer}>
                        <ul>
                            {
                                this.state.followers.map((follower, index) => {
                                    return (
                                        <Follower 
                                            key={index}
                                            {...follower}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            } else {
                followers = <div className={classes.NoFollowers}>Oh, You have no followers</div> 
            }
        }

        return (
            <div className={classes.FollowersContainer} style={{position: this.state.fixed ? 'fixed' : 'static'}}>
                <div className={classes.User}>
                    <img src={this.props.avatar} alt="avatar" />
                    <div className={classes.UserInformation}>
                        <div>{this.props.userName}</div>
                        <div>{this.props.fullName}</div>
                    </div>
                </div>
                <div className={classes.Followers}>
                    <div className={classes.Header}>Followers</div>
                    {followers}
                </div>
            </div>
        );
    }
}

export default connect( state => ({
    userName: state.authoriziedAccount.userName,
    avatar: state.authoriziedAccount.avatar,
    fullName: state.authoriziedAccount.fullName
}) )(Followers);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetPosts } from '../../../store/actions/posts';

import classes from './index.css';
import BlockLoader from '../../../components/BlockLoader';
import Post from './Post';

class Posts extends Component {

    state = {
        page: 0,
        focus: null
    }

    componentDidMount() {
        this.props.GetPosts(this.props.userName, this.state.page);    
    }

    hoverHandler = (index) => {
        this.setState({focus: index});
    }

    unhoverHandler = () => {
        console.log('unhover')
        this.setState({focus: null})   
    };
    
    render() {
        let output = <BlockLoader />

        if(!this.props.loading) {
            if(this.props.posts.length > 0) {
                output = (
                    <div className={classes.PostsList}>
                        {
                            this.props.posts.map((post, index) => {
                                return <Post 
                                    key={index}
                                    isMouseOver={this.state.focus === index} 
                                    {...post}
                                    unhoverHandler={this.unhoverHandler}
                                    hoverHandler={() => this.hoverHandler(index)}    
                                />
                            })
                        }
                    </div>
                )
            }
        }

        return (
            <div className={classes.Posts}>
                { output }
            </div>
        );
    }
}

export default connect( state => ({
    posts: state.posts.posts,
    loading: state.posts.getPostsLoading,
    userName: state.accounts.account.userName
}), { GetPosts } )(Posts);

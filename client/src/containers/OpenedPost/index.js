import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOnePost } from '../../store/actions/posts';

import classes from './index.css';
import Header from '../Header';
import Loader from '../../components/Loader';
import UserNameSection from '../../components/UserNameSection';
import Options from '../Options';
import CommentAddSection from '../CommentAddSection';
import Comments from '../Comments';

class OpenedPost extends Component {

    componentDidMount() {
        const id = window.location.pathname.split('/')[2]
        this.props.GetOnePost(id);
    }
    

    render() {
        let output = <Loader />

        if(!this.props.loading) {
            const { image, creater, avatar, likes, date } = this.props.post;

            output = (
                <div className={classes.OpenedPost}>
                    <Header />
                    <div className={classes.Centered}>
                        <div className={classes.Container}>
                            <span className={classes.ImageContainer}>
                                <img src={image} alt="fullimage"/>
                            </span>
                            <div className={classes.RightSection}>
                                <UserNameSection 
                                    userName={creater}
                                    avatar={avatar}
                                />
                                <Comments/>
                                <Options
                                    id="Comment"
                                    likes={likes}
                                    date={date}
                                    postId={this.props.post._id}
                                />
                                <CommentAddSection 
                                    id="Comment"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return output;
    }
}

export default connect( state => ({
    post: state.posts.post,
    loading: state.posts.getOnePostLoading
}), { GetOnePost } )(OpenedPost);

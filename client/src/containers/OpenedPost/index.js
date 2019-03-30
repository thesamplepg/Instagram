import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOnePost, GetNewComments, LikeComment, UnlikeComment } from '../../store/actions/posts';

import classes from './index.css';
import Header from '../Header';
import Loader from '../../components/Loader';
import UserNameSection from '../../components/UserNameSection';
import Options from '../Options';
import CommentAddSection from '../CommentAddSection';
import Comments from '../../components/Comments';

class OpenedPost extends Component {

    state = {
        commentsPage: 1
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2]
        this.props.GetOnePost(id);
    }

    toggleLikeComment = async (id, type, index) => {
        
        if(type === 'like') this.props.LikeComment(this.props.userName, index);
        else this.props.UnlikeComment(this.props.userName, index);

        await fetch(`/api/posts/comment/${type}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ id })
        });
    }

    getNewComments = () => {
        if(!this.props.commentsLoading) {
            if(this.props.post.comments.length > this.props.post.commentsList.length) {
                this.setState({
                    commentsPage: this.state.commentsPage + 1
                });
        
                this.props.GetNewComments(
                    {
                        postId: this.props.post._id, 
                        page: this.state.commentsPage
                    }
                );
            }
        }
    }
    

    render() {
        let output = <Loader />

        if(!this.props.loading) {
            const { image, creater, avatar, likes, date, comments, commentsList } = this.props.post;

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
                                <Comments
                                    newComments={comments.length > commentsList.length}
                                    comments={commentsList}
                                    getNewComments={this.getNewComments}
                                    userName={this.props.userName}
                                    toggleLike={this.toggleLikeComment}
                                    loading={this.props.commentsLoading}
                                />
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
    userName: state.authoriziedAccount.userName,
    post: state.posts.post,
    loading: state.posts.getOnePostLoading,
    commentsLoading: state.posts.getNewCommentsLoading
}), { GetOnePost, GetNewComments, LikeComment, UnlikeComment } )(OpenedPost);

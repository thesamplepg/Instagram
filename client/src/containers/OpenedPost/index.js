import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    GetOnePost, 
    GetNewComments, 
    LikeComment, 
    UnlikeComment, 
    Like, 
    Unlike, 
    AddComment 
} from '../../store/actions/posts';

import classes from './index.css';
import Header from '../Header';
import Loader from '../../components/Loader';
import UserNameSection from '../../components/UserNameSection';
import Options from '../Options';
import CommentAddSection from '../CommentAddSection';
import Comments from '../../components/Comments';

class OpenedPost extends Component {

    state = {
        commentsPage: 1,
        adaptive: false
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2]
        this.props.GetOnePost(id);

        if(window.innerWidth < 765) this.setState({adaptive: true});
    }

    toggleLike = async (type) => {

        if(type === 'like') this.props.Like(this.props.userName); 
        else this.props.Unlike(this.props.userName);

        await fetch(`/api/posts/${type}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ postId: this.props.post._id })
        });
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

    addComment = (comment) => {
        this.props.AddComment(comment, this.props.post._id);
    }
    

    render() {
        let output = <Loader />

        if(!this.props.loading) {
            const { image, creater, avatar, likes, date, comments, commentsList } = this.props.post;

            const rightSection = (
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
                        toggleLike={this.toggleLike}
                    />
                    <CommentAddSection 
                        id="Comment"
                        loading={this.props.addCommentLoading}
                        addComment={this.addComment}
                    />
                </div>
            )

            output = (
                <div className={classes.OpenedPost}>
                    <Header />
                    <div className={classes.Centered}>
                        <div className={classes.Container}>
                            {this.state.adaptive ? <UserNameSection userName={creater} avatar={avatar}/> : null}
                            <span className={classes.ImageContainer}>
                                <img src={image} alt="fullimage"/>
                            </span>
                            {!this.state.adaptive ? rightSection : null}
                            {
                                this.state.adaptive ?
                                (
                                    <React.Fragment>
                                        <Options
                                            id="Comment"
                                            likes={likes}
                                            date={date}
                                            toggleLike={this.toggleLike}
                                        />
                                        <Comments 
                                            newComments={comments.length > commentsList.length}
                                            comments={commentsList}
                                            getNewComments={this.getNewComments}
                                            userName={this.props.userName}
                                            toggleLike={this.toggleLikeComment}
                                            loading={this.props.commentsLoading}
                                        />
                                        <CommentAddSection 
                                            id="Comment"
                                            loading={this.props.addCommentLoading}
                                            addComment={this.addComment}
                                        />
                                    </React.Fragment>
                                ) : null
                            }
                            
                        </div>
                    </div>
                </div>
            )
        }

        return output;
    }
}

export default connect( state => ({
    addCommentLoading: state.posts.addCommentLoading,
    userName: state.authoriziedAccount.userName,
    post: state.posts.post,
    loading: state.posts.getOnePostLoading,
    commentsLoading: state.posts.getNewCommentsLoading
}), { 
    GetOnePost,
    GetNewComments, 
    LikeComment, 
    UnlikeComment, 
    Like, 
    Unlike, 
    AddComment 
} )(OpenedPost);

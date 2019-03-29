import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddComment } from '../../store/actions/posts';

import ButtonLoader from '../../components/ButtonLoader';
import classes from './index.css';

class CommentAddSection extends Component {
    
    state = {
        comment: ''
    }

    inputHandler = (e) => this.setState({comment: e.target.value});

    submitComment = (e) => {
        if(e.key === 'Enter' && this.state.comment.length > 0) {
            this.props.AddComment(this.state.comment, this.props.post._id);
            e.target.blur();
        }
    }

    render () {
        return (
            <div 
                className={classes.CommentAddSection}
            >
                {this.props.loading ? <ButtonLoader /> : null}
                <input 
                    onKeyPress={this.submitComment}
                    type="text" 
                    onChange={this.inputHandler} 
                    value={this.state.value}    
                    placeholder="Add a comment..."
                    id={this.props.id}
                />
            </div>
        );
    }
}

export default connect( state => ({
    post: state.posts.post,
    loading: state.posts.addCommentLoading
}), { AddComment } )(CommentAddSection);

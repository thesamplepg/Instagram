import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetPublications, PublicationLike, PublicationUnlike } from '../../store/actions/publications';

import Loader from '../../components/Loader';
import Header from '../Header';
import classes from './index.css';
import PublicationsList from './PublictaionsList';
import Followers from '../Followers';
import { isAuthorizied } from '../../components/Utilits';

class Publications extends Component {  

    state = {
        page: 0,
        addCommentLoading: false
    }

    componentDidMount() {
        if(isAuthorizied(this.props) && this.props.publications === null) {
            this.props.GetPublications(this.state.page);
        }
    }
    

    componentDidUpdate() {
        if(isAuthorizied(this.props) && this.props.publications === null) {
            this.props.GetPublications(this.state.page);
        }
    }

    toggleLike = async(index, type, postId) => {
        if(type === 'like') this.props.PublicationLike(this.props.userName, index);
        else this.props.PublicationUnlike(this.props.userName, index);

        await fetch(`/api/posts/${type}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ postId })
        });
    }

    addComment = async(comment, postId) => {
        this.setState({addCommentLoading: true});

        await fetch('/api/posts/comment', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ comment, postId })
        });

        this.setState({addCommentLoading: false});
    }

    render() {
        let output = <Loader />

        if(!this.props.loading) {
            if(this.props.publications.length > 0) {
                output = (
                    <div className={classes.Container}>
                        <PublicationsList 
                            publications={this.props.publications}
                            toggleLike={this.toggleLike}
                            userName={this.props.userName}
                            addComment={this.addComment}
                            commentLoading={this.state.addCommentLoading}
                        />
                        <Followers />
                    </div>
                );
            } else {
                output = (
                    <div className={classes.Error}>
                        There are no publications yet
                    </div>
                )
            }
        }

        return (    
            <div className={classes.Publications}>
                <Header />
                { output }
            </div>  
        )
    }
}

export default connect( state => ({
    userName: state.authoriziedAccount.userName,
    authorizationLoading: state.authoriziedAccount.authorizationLoading,
    authorization: state.authoriziedAccount.authorization,
    publications: state.publications.publications,
    loading: state.publications.getPublicationsLoading
}), { GetPublications, PublicationLike, PublicationUnlike }  )(Publications);

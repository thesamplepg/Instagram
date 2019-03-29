import React, { Component } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Like, Unlike } from '../../store/actions/posts';

import classes from './index.css';
import Icon from '../../components/Icon';

class Options extends Component {

    convertMonth = (date) => {
        switch (date) {
            case 0: return 'January'
            case 1: return 'February'
            case 2: return 'March'
            case 3: return 'April'
            case 4: return 'May'
            case 5: return 'June'
            case 6: return 'July'
            case 7: return 'August'
            case 8: return 'September'
            case 9: return 'October'
            case 10: return 'November'
            case 11: return 'December'
            

            default: return;
        }
    }

    toggleLike = async (dispatch, type) => {
        dispatch();

        await fetch(`/api/posts/${type}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ postId: this.props.postId })
        })
    }


    render() {
        const date = new Date(this.props.date);
        const liked = this.props.likes.indexOf(this.props.userName) > -1;

        return (
            <div className={classes.Options}>
                <div className={classes.Buttons}>
                    <div 
                        className={[classes.Like, liked ? classes.Liked : ''].join(' ')} 
                        onClick={() => {
                            !liked ? 
                            this.toggleLike(() => this.props.Like(this.props.userName), 'like') : 
                            this.toggleLike(() => this.props.Unlike(this.props.userName), 'unlike')
                        }}
                    >
                        <Icon icon={faHeart}/>
                    </div>
                    <div className={classes.Comment}>
                        <label htmlFor={this.props.id}>
                            <Icon icon={faComment}/>
                        </label>
                    </div>
                </div> 
                <div className={classes.Likes}>
                    Likes {this.props.likes.length}
                </div>
                <div className={classes.Date}>
                    {this.convertMonth(date.getMonth())} {date.getDate()}
                </div>
            </div>
        );
    }
}

export default connect( state => ({
    userName: state.authoriziedAccount.userName
}) , { Like, Unlike })(Options);

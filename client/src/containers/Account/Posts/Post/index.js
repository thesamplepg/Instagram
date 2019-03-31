import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../../../../components/Icon';

class Post extends React.Component {
    
    constructor (props) {
        super(props);
        
        this.post = React.createRef();

        this.state = {
            height: 0
        }
    }

    resizeHandler = () => {
        this.setState({
            height: this.post.current.clientWidth
        })
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);

        this.setState({
            height: this.post.current.clientWidth
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }
    

    render () {

        const {likes, comments, image, isMouseOver} = this.props;

        return (
            <div 
                onClick={this.props.openPost}
                onMouseOver={this.props.hoverHandler}
                onMouseOut={this.props.unhoverHandler}
                ref={this.post}
                className={classes.Post}
                style={{
                    background: `url("${image}") center center / cover`,
                    height: `${this.state.height}px`
                }}    
            >
                <div 
                    className={classes.Layer}
                    style={{
                        opacity: isMouseOver ? '1' : '0'
                    }}    
                >
                    <div className={classes.Likes}>
                        <Icon icon={faHeart}/> {likes.length}
                    </div>
                    <div className={classes.Comments}>
                        <Icon icon={faComment}/> {comments.length}
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;

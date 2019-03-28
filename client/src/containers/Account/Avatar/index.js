import React, { Component } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { ChangeAvatar } from '../../../store/actions/accounts';

import classes from './index.css';
import Icon from '../../../components/Icon';

class Avatar extends Component {

        constructor (props) {
        super(props);

        this.form = React.createRef();
    }

    avatarHandler = async(e) => {

        if(e.target.files[0].size < 5000000) {

            const formData = new FormData(this.form.current);

            this.props.ChangeAvatar(formData);

        }

    }

    render() {

        let loader = null;

        if(this.props.loading) {
            loader = (
                <div className={classes.Loader}>
                    <Icon icon={ faSpinner }/>
                </div>
            );
        }

        return (
            <div className={classes.Container}>
                {
                    this.props.isAuthorizied ? 
                    <form className={classes.Avatar} encType="multipart/form-data" ref={this.form}>
                        {loader}
                        <label htmlFor="file">
                            <img 
                                src={this.props.image} 
                                alt="avatar" 
                                className={classes.Image}    
                            />
                        </label>
                        <input 
                            type="file" 
                            id="file" 
                            name="avatar" 
                            onChange={this.avatarHandler}
                        /> 
                    </form> :
                    <form className={classes.Avatar} encType="multipart/form-data" ref={this.form}>
                        <img 
                            src={this.props.image} 
                            alt="avatar" 
                            className={classes.Image}    
                        />
                    </form>
                }
            </div>
        );
    }
}

export default connect( state => ({
    loading: state.accounts.changeAvatarLoading
}), { ChangeAvatar } )(Avatar);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './index.css';
import ButtonLoader from '../../components/ButtonLoader';
import ViewImage from './ViewImage';
import Header from '../Header';

class CreatePost extends Component {

    constructor (props) {
        super(props);
        
        this.form = React.createRef();

        this.state = {
            loading: false,
            image: null,
            next: false,
            submitLoading: false
        }
    }

    repickHandler = () => {
        this.setState({ next: false });       
    }

    inputHandler = (e) => {

        this.setState({ loading: true });

        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.addEventListener('load', (e) => {
            this.setState({
                loading: false,
                image: e.target.result,
                next: true
            });
        });
    }
    
    submitHandler = () => {
        this.setState({submitLoading: true});

        const formData = new FormData(this.form.current);
        
        fetch('/api/posts/new', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {

                this.props.history.push('/' + this.props.userName);

            } else {
                window.location.reload();
            }
        })
        .catch(err => {
            this.setState({submitLoading: false});
            console.log(err)
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className={classes.CreatePost}>
                    <form encType="multipart/form-data" ref={this.form}>
                        <input 
                            type="file" 
                            name="image" 
                            id="image" 
                            onInput={this.inputHandler}
                        />    
                    </form>
                    {
                        !this.state.next ?
                        <div className={classes.PickPicture}> 
                            <div className={classes.LoadingText}>
                                {this.state.loading ? 'Please wait a second...' : null}
                            </div>
                            <label htmlFor="image">
                                <div className={classes.PickBtn}>
                                    Pick a picture
                                    {this.state.loading ? <ButtonLoader /> : null}
                                </div>
                            </label>
                        </div> :
                        <ViewImage 
                            loading={this.state.submitLoading}
                            image={this.state.image}
                            repick={this.repickHandler}    
                            submit={this.submitHandler}
                        />
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default connect( state => ({
    userName: state.authoriziedAccount.userName
}) )(CreatePost);

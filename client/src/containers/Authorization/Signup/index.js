import { Component } from 'react';

import renderForm from '../renderForm';
import { connect } from 'react-redux';

class Signup extends Component {

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.authorizationLoading && this.props.authorization) {
            this.props.history.push('/');
        }
    }
    
    
    state = {
        inputs: {
            fullName: {
                placeHolder: "Fullname",
                value: '',
                type: 'text'
            },
            userName: {
                placeHolder: "Username",
                value: '',
                type: 'text'
            },
            password: {
                placeHolder: "Password",
                value: '',
                type: 'password'
            }
        },
        error: null,
        loading: false,
        headerText: 'Signup',
        redirect: 'login'
    }

    inputHandler = (e, key) => {
        const inputs = {...this.state.inputs};

        inputs[key].value = e.target.value;

        this.setState({inputs});
    }

    submitHandler = () => {
        this.setState({loading: true});

        const keys = Object.keys(this.state.inputs);
        const data = {}

        keys.forEach(key => data[key] = this.state.inputs[key].value);

        fetch('/api/accounts/signup', {
            headers: {
                "Content-Type": "application/json"
            }, method: 'POST', body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {

            if(result.success) {

                this.setState({loading: false, error: null});
                this.props.history.push('/accounts/login');

            } else {

                this.setState({loading: false, error: result.message})

            }

        })
        .catch(err => console.log(err));

    }

    render() {
        return renderForm(this.state, this.submitHandler, this.inputHandler);
    }
}


export default connect( state => ({
    authorization: state.authoriziedAccount.authorization,
    authorizationLoading: state.authoriziedAccount.authorizationLoading
}) )(Signup);

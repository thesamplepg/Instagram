import { Component } from 'react';
import { connect } from 'react-redux';

import renderForm from '../renderForm';
import { isAuthorizied } from '../../../components/Utilits';

class Login extends Component {

    componentDidUpdate() {
        if(isAuthorizied(this.props)) {
            this.props.history.push('/');
        }
    }
    
    state = {
        inputs: {
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
        headerText: 'Login',
        redirect: 'signup'
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

        fetch('/api/accounts/login', {
            headers: {
                "Content-Type": "application/json"
            }, method: 'POST', body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {

            if(result.success) {

                this.setState({loading: false, error: null});
                window.location.reload();

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
}) )(Login);

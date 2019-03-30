import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetPublications } from '../../store/actions/publications';

import Header from '../Header';
import classes from './index.css';

class Publications extends Component {  

    state = {
        page: 0
    }

    componentDidMount() {
        this.props.GetPublications(this.state.page);
    }

    render() {
        return (
            <div className={classes.Publications}>
                <Header />
            </div>
        );
    }
}

export default connect( state => ({
    authorizationLoading: state.authoriziedAccount.authorizationLoading
}), { GetPublications }  )(Publications);

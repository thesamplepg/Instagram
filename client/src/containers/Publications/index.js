import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetPublications } from '../../store/actions/publications';

import Loader from '../../components/Loader';
import Header from '../Header';
import classes from './index.css';
import PublicationsList from './PublictaionsList';
import Followers from '../Followers';

class Publications extends Component {  

    state = {
        page: 0
    }

    componentDidMount() {
        if(!this.props.authorizationLoading && this.props.publications === null) {
            this.props.GetPublications(this.state.page);
        }
    }
    

    componentDidUpdate() {
        if(!this.props.authorizationLoading && this.props.publications === null) {
            this.props.GetPublications(this.state.page);
        }
    }

    render() {
        let output = <Loader />

        if(!this.props.loading) {
            if(this.props.publications.length > 0) {
                output = (
                    <div className={classes.Container}>
                        <PublicationsList 
                            publications={this.props.publications}
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
    authorizationLoading: state.authoriziedAccount.authorizationLoading,
    publications: state.publications.publications,
    loading: state.publications.getPublicationsLoading
}), { GetPublications }  )(Publications);

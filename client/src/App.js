import React, { Component } from 'react';
import classes from './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Authorizate } from './store/actions/authoriziedAccount';
import { withRouter } from 'react-router-dom';

import Loader from './components/Loader';
import Login from './containers/Authorization/Login';
import Signup from './containers/Authorization/Signup';
import Account from './containers/Account';
import Publications from './containers/Publications';
import CreatePost from './containers/CreatePost';
import OpenedPost from './containers/OpenedPost';
import { isAuthorizied } from './components/Utilits/index';

class App extends Component {

  state = {
    updated: false
  }
  
  componentDidMount() {
    this.props.Authorizate();
  }

  componentDidUpdate() {
    if(!this.state.updated && !isAuthorizied(this.props)) {
      this.setState({updated: true}, () => {
        this.props.history.push('/accounts/login');
      });
    }  
     
  }
  

  render() {
    return (
      <React.Fragment>
        {this.props.authorizationLoading ? <Loader /> : null}
        <div className={classes.App}>
          <Route exact path="/" component={Publications}/>
          <Route exact path="/:userName" component={Account}/>
          <Route path="/accounts/login" component={Login}/>
          <Route path="/accounts/signup" component={Signup}/>
          <Route path="/accounts/post" component={CreatePost}/>
          <Route path="/post/:id" component={OpenedPost}/>
        </div>
      </React.Fragment>
    );
  }
}

export default connect( state => ({
  authorization: state.authoriziedAccount.authorization,
  userName: state.authoriziedAccount.userName,
  authorizationLoading: state.authoriziedAccount.authorizationLoading
}), { Authorizate } )( withRouter(App) );

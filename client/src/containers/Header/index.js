import React, { Component } from 'react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faSpinner, faStar, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './index.css';
import Icon from '../../components/Icon';
import SearchResults from './SearchResults';

class Header extends Component {

    state = {
        searchLoading: false,   
        accounts: null,
        isOpen: false,
        userName: ''
    }

    componentDidMount() {
        window.addEventListener('click', (e) => {
            if(this.state.isOpen && !e.target.classList.contains(classes.SearchInput))
            {
                this.setState({ isOpen: false });
            }
        });
    }

    focusHandler = () => {
        if(this.state.userName.length > 0)
        {
            this.setState({ isOpen: true });
        }
    }

    searchHandler = (e) => {
        
        this.setState({userName: e.target.value, searchLoading: e.target.value.length > 0}, () => {

            if(this.state.userName.length > 0) {

                fetch(`/api/accounts/search?userName=${this.state.userName}`)
                    .then(res => res.json())
                    .then(data => {

                        this.setState({accounts: data.accounts, isOpen: true});

                        this.setState({ searchLoading: false });
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({ searchLoading: false });
                    });
            } else {
                this.setState({ isOpen: false });
            }

        });

    }

    render() {

        let searchResults = null;
        
        if(this.state.isOpen) {
            searchResults = <SearchResults accounts={this.state.accounts}/>
        }

        return (
            <div className={classes.Header}>
                {searchResults}
                <div className={classes.Container}>
                    <div className={classes.Logo}>
                        <Icon icon={ faInstagram }/>
                    </div>
                    <div className={classes.Search}>
                        <div className={classes.InputWrapper}>
                            <input 
                                className={classes.SearchInput}
                                onChange={this.searchHandler} 
                                onFocus={this.focusHandler}
                                value={this.state.userName} 
                                type="text"
                                placeholder="Search" 
                            />
                            <Icon icon={ faSearch } />
                            {this.state.searchLoading ? <Icon icon={ faSpinner } /> : null}
                        </div>
                    </div>
                    <div className={classes.Navbar}>
                        <div>
                            <NavLink to="/favorites">
                                <Icon icon={faStar}/>
                            </NavLink>
                        </div>
                        <div>
                            <Icon icon={faHeart}/>
                        </div>
                        <div>
                            <NavLink to={`/${this.props.userName}`}>
                                <Icon icon={faUser}/>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect( state => ({
    userName: state.authoriziedAccount.userName
}) )(Header);

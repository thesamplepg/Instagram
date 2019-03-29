import React, { Component } from 'react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faSpinner, faCamera, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
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
        userName: '',
        scrolled: false
    }

    scrollHandler = () => {
        if(window.scrollY > 20 && !this.state.scrolled) {
            this.setState({ scrolled: true });
        } else if(window.scrollY < 20 && this.state.scrolled) {
            this.setState({ scrolled: false });
        } else {
            return;
        }
    }

    hideSearchBlockHandler = (e) => {
        if(this.state.isOpen && !e.target.classList.contains(classes.SearchInput))
        {
            this.setState({ isOpen: false });
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('click', this.hideSearchBlockHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('click', this.hideSearchBlockHandler);
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
                <div 
                    className={classes.Container}
                    style={{
                        padding: this.state.scrolled ? '7px 20px' : '26px 20px'
                    }}
                >
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
                            <NavLink to="/accounts/post">
                                <Icon icon={faCamera}/>
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

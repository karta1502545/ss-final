import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import Log_in from 'components/Log_in.jsx';
import About from 'components/About.jsx';
import Activities from 'components/Activities.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar, Setuser} from 'states/main-actions.js';
import IndexNavbar from "components/IndexNavbar.js";

import {withAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
import {Auth} from "aws-amplify";
import './Main.css';

class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        name: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.searchEl = null;
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser().then(user =>{
            console.log(typeof user.username);
            console.log(user.name);
            this.props.dispatch(Setuser((typeof user.username==='undefined')? user.name: user.username));
        });
    }

    render() {
        Auth.currentAuthenticatedUser().then(user =>{console.log(user)});
        const {name} = this.props;
        return (
            <Router>
                <div className='main'>
                    <div className='bg-faded'>
                        <div className='container'>
                            <Navbar color='white faded' light expand>
                                <NavbarToggler onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='text-info' href="/">LanExchange</NavbarBrand>
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/'>Today</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/about'>About</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/log_in'>Log in</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/Activities'>Activities</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                                <span className='span'> "Hello, {name}"</span>
                                <Button size='sm'variant="outline-primary" onClick={()=>{Auth.signOut().then(()=>{window.location.reload()})}}>Sign Out</Button>
                            </Navbar>
                        </div>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today />
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast />
                    )}/>
                    <Route exact path="/log_in" render={() => (
                        <Log_in />
                    )}/>
                    <Route exact path="/about" render={() => (
                        <About />
                    )}/>
                    <Route exact path="/activities" render={() => (
                        <Activities />
                    )}/>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }
}

export default withAuthenticator(connect(state => ({
    ...state.main,
    searchText: state.searchText,
}))(Main));

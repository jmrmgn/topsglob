import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';

import logo from '../../logo.png';

import { connect } from 'react-redux';
import { hideFlash } from '../../actions/flashActions';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
   state = {
      isActive: false
   }

   onLogout = e => {
      e.preventDefault();
      this.props.logoutUser();
      this.props.history.push('/login');
      this.setState({ isActive: false });
   }

   onClick = () => {
      this.setState({ isActive: !this.state.isActive });
   }

   onCloseMenu = () => {
      this.setState({ isActive: false });
      const { showFlash } = this.props.flash;
      if (showFlash) {
         this.props.hideFlash();
      }
   }

   render() {
      const { isActive } = this.state;
      const { isAuthenticated, user } = this.props.auth;
      
      const authLinks = (isAuthenticated)
         ? (
            <React.Fragment>
               <div className='navbar-item is-hoverable'>
                  <a className="navbar-link" href="/" onClick={e => { e.preventDefault() }}>
                     Hello, {user.username}
                  </a>

                  <div className="navbar-dropdown">
                     <NavLink className="navbar-item" to="/profile" onClick={this.onCloseMenu.bind(this)}>Profile</NavLink>
                     <NavLink className="navbar-item" to="/settings" onClick={this.onCloseMenu.bind(this)}>Settings</NavLink>
                     <a href="/" className="navbar-item" onClick={this.onLogout.bind(this)}>Logout</a>
                  </div>
               </div>
            </React.Fragment>
         )
         : (
            <React.Fragment>
               <NavLink className="navbar-item" to="/register" onClick={this.onCloseMenu.bind(this)}>Register</NavLink>
               <NavLink className="navbar-item" to="/login" onClick={this.onCloseMenu.bind(this)}>Login</NavLink>
            </React.Fragment>
         );
      return (
         <nav className="navbar is-primary is-spaced has-shadow" role="navigation" aria-label="main navigation">
            <div className="container">
               <div className="navbar-brand">
                  <NavLink className="navbar-item" to="/">
                     <img src={logo} width="112" height="50" alt="" />
                  </NavLink>
                  <a 
                     href="/"
                     onClick={e => { e.preventDefault(); this.setState({ isActive: !this.state.isActive }); }}
                     aria-label="menu"
                     aria-expanded="false"
                     data-target="main-navbar"
                     className={classnames('navbar-burger burger', { 'is-active': isActive })}
                  >
                     <span aria-hidden="true"></span>
                     <span aria-hidden="true"></span>
                     <span aria-hidden="true"></span>
                  </a>
               </div>
               
               <div
                  id="main-navbar"
                  className={classnames('navbar-menu', { 'is-active': isActive })}
               >
                  <div className="navbar-start">
                     <NavLink className="navbar-item" to="/" onClick={this.onCloseMenu.bind(this)}>Home</NavLink>
                     <NavLink className="navbar-item" to="/posts" onClick={this.onCloseMenu.bind(this)}>Posts</NavLink>
                     <NavLink className="navbar-item" to="/users" onClick={this.onCloseMenu.bind(this)}>Users</NavLink>
                  </div>
                  <div className="navbar-end">
                     {authLinks}
                  </div>
               </div>
            </div>
         </nav>
      )
   }
}

Navbar.propTypes = {
   flash: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   hideFlash: PropTypes.func.isRequired,
   logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   flash: state.flash,
   auth: state.auth
});

export default connect(mapStateToProps, { hideFlash, logoutUser })(withRouter(Navbar));
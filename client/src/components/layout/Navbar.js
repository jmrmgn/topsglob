import React, { Component } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
   state = {
      isActive: false
   }

   onClick = e => {
      e.preventDefault();
      this.setState({ isActive: !this.state.isActive });
   }

   onCloseMenu = () => {
      this.setState({ isActive: !this.state.isActive });
   }

   render() {
      const { isActive } = this.state;
      return (
         <div className="block">
            <nav className="navbar is-primary is-spaced has-shadow" role="navigation" aria-label="main navigation">
               <div className="container">
                  <div className="navbar-brand">
                     <NavLink className="navbar-item" to="/">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="" />
                     </NavLink>
                     <a 
                        href="/"
                        onClick={this.onClick.bind(this)}
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
                        <NavLink className="navbar-item" to="/register" onClick={this.onCloseMenu.bind(this)}>Register</NavLink>
                        <NavLink className="navbar-item" to="/login" onClick={this.onCloseMenu.bind(this)}>Login</NavLink>
                     </div>
                  </div>
               </div>
            </nav>
         </div>
      )
   }
}

export default Navbar;
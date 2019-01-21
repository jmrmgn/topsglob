import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import 'bulma/css/bulma.min.css';
import './App.css';

import { setAuthToken } from './utils/setAuthToken';

// React redux config
import { connect } from 'react-redux';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

// Flash messages
import Flash from './components/common/Flash';

// Private route
import PrivateRoute from './components/common/PrivateRoute';

// Components
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Posts from './components/posts/Posts';
import Users from './components/users/Users';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/users/user/Profile';
import UserProfile from './components/users/UserProfile';

// Check for token
const token = localStorage.jwtToken;
if (token) {
   // Set auth token auth header 
   setAuthToken(token);
   // Decode the token
   const decoded = jwt_decode(token);
   // Set user and isAuthenticated
   store.dispatch(setCurrentUser(decoded));

   // Check if the token is expired
   if (decoded.exp < Date.now() / 1000) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/login";
   }
}

class App extends Component {

   render() {
      const { showFlash, msg, status } = this.props.flash;
      const flash = showFlash && 
         <Flash 
            msg={msg}
            status={status}
         />;
      return (
         <Router>
            <div className="App">
               <Navbar />
               {flash}
               <div className="container main__container m-t-lg">
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/posts" component={Posts} />
                     <PrivateRoute exact path="/users" component={Users} />
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />
                     <PrivateRoute exact path="/profile" component={Profile} />
                     <Route exact path="/users/:userId" component={UserProfile} />
                  </Switch>
               </div>
            </div>
         </Router>
      );
   }
}

App.propTypes = {
   flash: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
   flash: state.flash,
   auth: state.auth
});

export default connect(mapStateToProps, {})(App);

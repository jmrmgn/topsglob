import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './App.css';

// React redux config
import { connect } from 'react-redux';

// Flash messages
import Flash from './components/common/Flash';

// Components
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Posts from './components/posts/Posts';
import Users from './components/users/Users';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

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
                  <Route exact path="/" component={Home} />
                  <Route exact path="/posts" component={Posts} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
               </div>
            </div>
         </Router>
      );
   }
}

App.propTypes = {
   flash: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   flash: state.flash
});

export default connect(mapStateToProps, {})(App);

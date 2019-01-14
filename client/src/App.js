import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './App.css';

// React redux config
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Posts from './components/posts/Posts';
import Users from './components/users/Users';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <div className="App">
                  <Navbar />
                  <div className="container">
                     <Route exact path="/" component={Home} />
                     <Route exact path="/posts" component={Posts} />
                     <Route exact path="/users" component={Users} />
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />
                  </div>
               </div>
            </Router>
         </Provider>
      );
   }
}

export default App;

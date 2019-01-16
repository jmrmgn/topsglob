import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// React redux config
import { Provider } from 'react-redux';
import store from './store';

// import jwt_decode from 'jwt-decode';
// import { setAuthToken } from './utils/setAuthToken';
// import { setCurrentUser, logoutUser } from './actions/authActions';


// // Check for token
// const token = localStorage.jwtToken;
// if (token) {
//    // Set auth token auth header 
//    setAuthToken(token);
//    // Decode the token
//    const decoded = jwt_decode(token);
//    // Set user and isAuthenticated
//    store.dispatch(setCurrentUser(decoded));

//    // Check if the token is expired
//    if (decoded.exp < Date.now / 1000) {
//       // Logout user
//       store.dispatch(logoutUser());
//       // Redirect to login
//       window.location.href = "/login";
//    }
// }

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>
   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

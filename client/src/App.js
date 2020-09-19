import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store/store';

import './App.css';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import PrivateRoute from './components/private-route/PrivateRoute'
import HomePage from './components/homepage/HomePage';


//check for token to keep user logged in 
if (localStorage.jwtToken) {
  // set auth token header auth 
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //Decoded token and get user info and exp 
  const decoded = jwt_decode(token);
  // set user and isAutheraized
  store.dispatch(setCurrentUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    //logout user 
    store.dispatch(logoutUser());

    // Redirect to Login 
    window.location.href = './login'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Switch>
            <PrivateRoute exact path='/HomePage' component={HomePage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

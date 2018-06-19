import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Welcome from './Welcome';
import SignupPage from './account/SignupPage'
import Login from './account/Login';

class App extends Component {
  componentWillMount(){

  }

  render() {
    return (

      <BrowserRouter>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/login" component={Login} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;

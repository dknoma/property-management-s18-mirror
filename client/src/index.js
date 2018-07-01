/* React */
import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

/* React Redux */
// need provider tag
import { Provider } from 'react-redux';

/* Redux */
import { createStore, applyMiddleware } from "redux";

/* Middlewares */
import reduxThunk from "redux-thunk";

/* Components */
import reducers from "./reducers";
import "./index.css";
import Nav from "./components/Nav.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";
import Register from "./components/Register.js";
import ProfilePage from "./components/ProfilePage.js";


var destination = document.querySelector("#container");

const initialState = {
    result: 1,
    lastValues: [],
    username: "Nick"
};

/* Check for token every time app starts up */
const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token')}
  },
  applyMiddleware(reduxThunk)
);

/* Currently handle frontend routing here, may be a better way to do this */

ReactDOM.render(
  <Provider store={store}>
    <div className="container wrapper">
      <div className="row">
        <Nav/>
      <Router history={browserHistory}>
        <Route path='/' component={Home}>
        </Route>
        <Route path={"login"} component={Login}>
        </Route>
        <Route path={"register"} component={Register}>
        </Route>
        <Route path={"logout"} component={Logout}>
        </Route>
        <Route path={"profile"} component={ProfilePage}>
        </Route>
      </Router>
        </div>
        <div className="row">

        </div>
      </div>
    </Provider>
    ,
    destination
);

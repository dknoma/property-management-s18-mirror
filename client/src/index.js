/* React */
import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

/* React Redux */
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
import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout.js";
import Register from "./components/auth/Register.js";
import ProfilePage from "./components/ProfilePage.js";
import CreateProperty from "./components/CreateProperty.js";


var destination = document.querySelector("#container");

/* Check for token every time app starts up */

/* Runs this every time on application page load */

const store = createStore(
  reducers,
  {
    auth: {
    authenticated: localStorage.getItem('token'),
    username: localStorage.getItem('username')
    // email: localStorage.getItem('token'),
    // firstname: localStorage.getItem('token'),
    // lastname: localStorage.getItem('token'),
    // user_type: localStorage.getItem('token')
    },
  },
  applyMiddleware(reduxThunk)
);


//console.log(store.getState());


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
        <Route path={"createproperty"} component={CreateProperty}>
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

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
import ProfileEdit from "./components/ProfileEdit.js";
import Users from "./components/Users.js";
import PropertyListing from "./components/property/PropertyListing.js";


var destination = document.querySelector("#container");

/* Check for token every time app starts up */

/* Runs this every time on application page load */

const store = createStore(
  reducers,
  {
    auth: {
    authenticated: localStorage.getItem('token'),
    my_id: localStorage.getItem('my_id'),
    my_username: localStorage.getItem('my_username'),
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    firstname: localStorage.getItem('firstname'),
    lastname: localStorage.getItem('lastname'),
    user_type: localStorage.getItem('user_type')
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
          <Route path={"profile/:id"} component={ProfilePage}>
          </Route>
          <Route path={"createproperty"} component={CreateProperty}>
          </Route>
          <Route path={"edit"} component={ProfileEdit}>
          </Route>
          <Route path={"users"} component={Users}>
          </Route>
          <Route exact path={"propertylisting"} component={PropertyListing}>
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

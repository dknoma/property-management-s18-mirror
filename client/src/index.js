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

/* State Persist */
import {loadState, saveState} from './localStorage.js';

/* Lodash */
import throttle from "lodash/throttle";

/* Components */
import reducers from "./reducers";
import "./index.css";
import Nav from "./components/Nav.js";
import Home from "./components/Home.js";
import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout.js";
import Register from "./components/auth/Register.js";
import ProfilePage from "./components/profile/ProfilePage.js";
import ProfileEdit from "./components/profile/ProfileEdit.js";
import Users from "./components/Users.js";
import CreateProperty from "./components/CreateProperty.js";
import PropertyListing from "./components/property/PropertyListing.js";
import PropertySearchResults from "./components/property/PropertySearchResults.js";
import SearchProperty from "./components/property/SearchProperty.js";
import PropertyPage from "./components/property/PropertyPage.js";

var destination = document.querySelector("#container");

/* Check for token every time app starts up */

/* Runs this every time on application page load */
const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(reduxThunk)
);

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth,
    property: store.getState().property
  });
}, 1000));
console.log(store.getState().property.search_results_list)

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
          <Route exact path={"propertysearchresults"} component={PropertySearchResults}>
          </Route>
          <Route exact path={"searchproperty"} component={SearchProperty}>
          </Route>
          <Route exact path={"property/:id"} component={PropertyPage}>
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

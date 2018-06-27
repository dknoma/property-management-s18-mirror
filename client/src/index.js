/* React */
import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

/* Redux */
import { createStore } from "redux";

/* Components */
import "./index.css";
import Nav from "./components/Nav.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import ProfilePage from "./components/ProfilePage.js";


var destination = document.querySelector("#container");

const initialState = {
    result: 1,
    lastValues: [],
    username: "Nick"
};

/* Use switch statements to check type of action */
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "ADD":
    /* Set new state to be old state + action.value */
    /* Payload is never new state */
      state = {
        /* Put old state */
        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };

      break;
    // case "SUBTRACT":
    //   state = {
    //     ...state,
    //     result: state.result - action.payload,
    //     lastValues: [...state.lastValues, action.payload]
    //   }
    //   break;
  }
  return state;
};

/* CreateStore takes two arguments, feeding in reducer first,
and application state as second argument */
const store = createStore(reducer, 1);


 /* Don't want to do this with react */
 /* Whenever store is updated, do this */
 store.subscribe(() => {
   console.log("Store Updated: " + store.getState())
 });

/* Want to use a keyword we specified in the switch statement */

// document.addEventListener('click', () => {
//   store.dispatch({
//     type: "ADD",
//     // payload: 10
//   });
// })


/* Currently handle frontend routing here, may be a better way to do this */

ReactDOM.render(
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
      <Route path={"profile"} component={ProfilePage}>
      </Route>
    </Router>
      </div>
      <div className="row">

      </div>
    </div>,
    destination
);

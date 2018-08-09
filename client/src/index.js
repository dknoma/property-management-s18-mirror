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
import 'font-awesome/css/font-awesome.css';
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home.js";
import Login from "./components/auth/Login.js";
import Logout from "./components/auth/Logout.js";
import Register from "./components/auth/Register.js";
import ProfilePage from "./components/profile/ProfilePage.js";
import ProfileEdit from "./components/profile/ProfileEdit.js";
import Users from "./components/Users.js";
import CreateProperty from "./components/property/CreateProperty.js";
import PropertyListing from "./components/property/PropertyListing.js";
import PropertySearchResults from "./components/property/PropertySearchResults.js";
import SearchProperty from "./components/property/SearchProperty.js";
import PropertyPage from "./components/property/PropertyPage.js";
import ComposeMessage from "./components/message/ComposeMessage.js";
import Message from "./components/message/Message.js";
import Inbox from "./components/message/Inbox.js";
import Sent from "./components/message/Sent.js";
import TenantApplicationForm from "./components/application/TenantApplicationForm.js";
import PMReviewApplication from "./components/application/PMReviewApplication.js";
import ApplicationPage from "./components/application/ApplicationPage.js";
import ViewTenants from "./components/property/ViewTenants.js";
import ViewAllApplications from "./components/application/ViewAllApplications.js";
import ViewMyApplication from "./components/application/ViewMyApplication.js";
import CreateMaintenanceRequest from "./components/maintenance/CreateMaintenanceRequest.js";
import ViewAllMaintenanceRequests from "./components/maintenance/ViewAllMaintenanceRequests.js";
import ViewMaintenanceRequest from "./components/maintenance/ViewMaintenanceRequest.js";
import ViewRent from "./components/payment/ViewRent.js";
import TenantApplicationPage from "./components/application/TenantApplicationPage.js";
import Chat from "./components/Chat/Chat.js";
import PrivateChat from "./components/Chat/PrivateChat.js";

/* Testing */
// import UserProfile from "./components/UserProfile/UserProfile.jsx";

var destination = document.querySelector("#container");


const persistedState = loadState();

/* Runs this every time on application page load */
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(reduxThunk)
);

/* Use lodash throttle to maintain high performance */
store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth,
    property: store.getState().property
  });
}, 1000));

/* Currently handle frontend routing here, may be a better way to do this */

ReactDOM.render(
  <Provider store={store}>

    <div className="wrapper">
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
          <Route exact path={"property/:propertyId"} component={PropertyPage}>
          </Route>
          <Route exact path={"apply/:propertyId"} component={TenantApplicationForm}>
          </Route>
          <Route exact path={"property/review/:propertyId"} component={PMReviewApplication}>
          </Route>
          <Route exact path={"inbox/:id"} component={Inbox}>
          </Route>
          <Route exact path={"message/:messageId"} component={Message}>
          </Route>
          <Route exact path={"composemessage"} component={ComposeMessage}>
          </Route>
          <Route exact path={"sent"} component={Sent}>
          </Route>
          <Route exact path={"property/:propertyId/applications/:appId"} component={ApplicationPage}>
          </Route>
          <Route exact path={"property/:propertyId/viewtenants"} component={ViewTenants}>
          </Route>
          <Route exact path={"application/viewallapplications"} component={ViewAllApplications}>
          </Route>
          <Route exact path={"user/:userId/myapplications"} component={ViewMyApplication}>
          </Route>
          <Route exact path={"createmaintenancerequest"} component={CreateMaintenanceRequest}>
          </Route>
          <Route exact path={"property/:propertyId/maintenance"} component={CreateMaintenanceRequest}>
          </Route>
          <Route exact path={"user/:userId/maintenancerequests"} component={ViewAllMaintenanceRequests}>
          </Route>
          <Route exact path={"maintenance/:requestId"} component={ViewMaintenanceRequest}>
          </Route>
          <Route exact path={"property/:propertyId/maintenance/:maintenanceId"} component={ViewMaintenanceRequest}>
          </Route>
          <Route exact path={"rent/:tenantId/pay"} component={ViewRent}>
          </Route>
          <Route exact path={"user/:userId/myapplications/:appId"} component={TenantApplicationPage}>
          </Route>
          <Route exact path={"chat"} component={Chat}>
          </Route>
          <Route exact path={"privatechat"} component={PrivateChat}>
          </Route>
        </Router>
        <Footer/>
    </div>
    </Provider>
    ,
    destination
);

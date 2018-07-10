import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Logout extends Component {

/* Remember we're getting logout from the actions we imported above */
  componentDidMount() {
    this.props.logout();
    alert("You are successfully logged out!");
    this.props.router.replace("/");
  };

  render() {
    return null;

    //Maybe change it to an alert and redirect to Home?

  }
}

export default connect(null, actions)(Logout);

import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';

class Logout extends Component {

/* Remember we're getting logout from the actions we imported above */
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <div> Sorry to see you go!</div>
  }
}

export default connect(null, actions)(Logout);

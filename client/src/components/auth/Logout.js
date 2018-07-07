import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Logout extends Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <div> Sorry to see you go!</div>

    //Maybe change it to an alert and redirect to Home?

  }
}

export default connect(null, actions)(Logout);

import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

import requireAuth from '../requireAuth';

class Message extends Component {

  /*when directed*/
  componentDidMount() {
    if (this.props.params.propertyId != "undefined") {
      this.props.get_message(this.props.params);
    }
  };

  renderHeader(headers) {

  }

  renderItem() {
    const { property } = this.props;
    return (
      <div>
        <h2>{this.props.subject}</h2>
        <p>{this.props.body}</p>
        <p>{this.props.viewed}</p>
      </div>
  )}

  render() {
    return (
      <div className="propInfo">
          { this.renderItem() }
        <br/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messageId: state.message.id,
    receiverId: state.message.receiverId,
    senderId: state.message.senderId,
    subject: state.message.subject,
    body: state.message.body,
    viewed: state.message.viewed,

  };
}

export default connect(mapStateToProps, actions)(Message);

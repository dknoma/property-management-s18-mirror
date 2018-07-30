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
      <h2>{this.props.messageId}</h2>

      </div>
  )}

  renderPotentialTenantInfo() {
      if (localStorage.getItem('user_type') === "tenant") {
          return (
            <div>
              <div> <a class="button" href={"/apply/" + this.props.params.propertyId}> Apply for this property</a></div>
              <br/>
            </div>
          )
      }
  }
  renderPMInfo() {
    if (localStorage.getItem('user_type') === "propertymanager") {
    }
  }

  render() {
    return (
      <div className="propInfo">
          { this.renderItem() }
        <br/>
          { this.renderPotentialTenantInfo() }
          { this.renderPMInfo() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messageId: state.message.id,
  };
}

export default connect(mapStateToProps, actions)(Message);

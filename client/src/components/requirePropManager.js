import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {

  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    /* redirects to home if not logged in */
    shouldNavigateAway() {
      if (this.props.user_type != 'propertymanager') {
        this.props.router.push('/profile/' + this.props.my_id);
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated,
      user_type: state.auth.user_type,
      my_id: state.auth.my_id
    };
  }

  return connect(mapStateToProps)(ComposedComponent);
};

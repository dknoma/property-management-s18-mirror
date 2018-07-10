import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/* Redux */
import { connect } from 'react-redux';
import * as actions from '../actions';

/* Higher Order Components */
import requireAuth from './requireAuth';

class ProfilePage extends React.Component {

  componentDidMount() {
    this.props.get_user_profile(this.props.params);
  };

  renderPrivateInformation() {
    if (this.props.authenticated !== null) {
      return (
        <div>
          <div> <a href="/edit"> Edit Profile </a></div>
          <br/>
          <div> <a href="/propertylisting"> View Property Listing</a></div>
          <br/>
          <div> <a href="/createproperty"> Create New Property</a></div>
        </div>
      )
    }
  }

  render() {
    console.log(this.props.params);
    return (

      <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>My Profile</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <p>Username: { this.props.username }</p>
              <p>First Name: {this.props.firstname}</p>
              <p>Last Name: {this.props.lastname}</p>
              <p>Email: {this.props.email}</p>
              <p>Role: {this.props.user_type} </p>
            </div>
          </div>
          {this.renderPrivateInformation()}
      </div>
    );
  }
}

/* After adding more, we have to map them here */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    email: state.auth.email,
    user_type: state.auth.user_type
  };
}
/* Need to connect actions here */
export default connect(mapStateToProps, actions)(ProfilePage);

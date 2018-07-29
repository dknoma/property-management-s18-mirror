import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/* Redux */
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Higher Order Components */
import requireAuth from '../requireAuth';

class ProfilePage extends React.Component {

  componentDidMount() {
    if (this.props.params.id !== "undefined") {
      this.props.get_user_profile(this.props.params);
    }
  };

  renderPMInformation() {
    if (this.props.user_type ==="propertymanager") {
        return (
          <div>
            <div> <a class="button" href="/propertylisting">View Property Listing</a></div>
            <br/>
            <div> <a class="button" href="/createproperty">Create New Property</a></div>
            <br/>
          </div>
        )
    }
  }

  renderPrivateInformation() {
      if (this.props.id == localStorage.getItem("my_id")) {
        return (
          <div>
            <p>Username: { localStorage.getItem("my_username") } </p>
          </div>
        )
      } else {
        return (
          <p>Username: { this.props.username }</p>
        )
      }
  }

  render() {
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
              {this.renderPrivateInformation()}
              <p>First Name: {this.props.firstname}</p>
              <p>Last Name: {this.props.lastname}</p>
              <p>Email: {this.props.email}</p>
              <p>Role: {this.props.user_type} </p>
              {this.renderPMInformation()}
            </div>
            <div> <a class="button" href="/searchproperty"> Search Property </a></div>
          </div>
      </div>
    );
  }
}

/* After adding more, we have to map them here */
function mapStateToProps(state) {
  return {
    username: state.auth.username,
    my_username: state.auth.my_username,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    email: state.auth.email,
    user_type: state.auth.user_type,
    id: state.auth.id
  };
}
/* Need to connect actions here */
export default connect(mapStateToProps, actions)(requireAuth(ProfilePage));

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/* Redux */
import { connect } from 'react-redux';

/* Higher Order Components. Not currently using but will use for private pages */
import requireAuth from './requireAuth';

class ProfilePage extends React.Component {

  renderPrivateInformation() {
    if (this.props.authenticated !== null) {
      return (
      <div>
        <div><a href="/edit">Edit Profile</a> </div>
      </div>
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
              <p>Username: { this.props.username } </p>
              {/*}<p>First Name: {this.props.firstname} </p>
              <p>Last Name: {this.props.lastname} </p>
              <p>Role: {this.props.user_type} </p>
              */}
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
    username: state.auth.username
    // firstname: state.auth.firstname,
    // lastname: state.auth.lastname,
    // user_type: state.auth.user_type

  };
}

export default connect(mapStateToProps)(ProfilePage);

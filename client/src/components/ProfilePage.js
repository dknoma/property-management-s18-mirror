import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/* Redux */
import { connect } from 'react-redux';

/* Higher Order Components */
import requireAuth from './requireAuth';

class ProfilePage extends React.Component {

  renderPrivateInformation() {
    if (this.props.authenticated) {
      return
      <div>
        <div> Private Information Here </div>
      </div>
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
              <p>Add form fields here</p>
            </div>
          </div>
          {this.renderPrivateInformation()}
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(ProfilePage);

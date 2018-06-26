import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ProfilePage extends React.Component {
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
        </div>
    );
  }
}

export default ProfilePage;

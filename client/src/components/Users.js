import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/* Redux */
import { connect } from 'react-redux';
import * as actions from '../actions';

/* Higher Order Components */
import requireAuth from './requireAuth';

class Users extends React.Component {

  componentDidMount() {
    this.props.get_users();
  };

  renderItem() {
  }

  render() {
    return (

      <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Users</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
            {this.renderItem()}
            </div>
          </div>
      </div>
    );
  }
}

/* After adding more, we have to map them here */
function mapStateToProps(state) {
  return {
    users: state.auth.users
  };
}
/* Need to connect actions here */
export default connect(mapStateToProps, actions)(Users);

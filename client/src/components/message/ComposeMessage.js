import React from 'react';

import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { RadioGroup,TextField } from 'redux-form-material-ui';

/* Higher Order Components */
import requireAuth from '../requireAuth';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class ComposeMessage extends React.Component {

  /* Change this to submit the payload */

onSubmit = ({sender, receiver, body}) => {
  const id = localStorage.getItem("my_id");
  this.props.send_message({sender, receiver, body}, () => {
    // where do we want to send them?
    // this.props.router.push("/profile/" + id );
  });
};

  render() {
    const data = {
      // used to populate "account" reducer when "Load" is clicked
      username: this.props.my_username,
    }
    /* handleSubmit is provided by Redux Form */
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <br />
        <Typography color="inherit" variant="display1">
        Compose Message
        </Typography>
        <br/>
        <br />
      </form>
    );
  }
}

/* initialValues allows us to prepopulate fields in redux form */
function mapStateToProps(state) {
  return {
    initialValues: {
      sender: state.auth.my_username,
      //receiver: state.auth.firstname,
    }
  };
}

ComposeMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

/* Decorate with redux form */
ComposeMessage = reduxForm({
  form: 'compose_message'
})(ComposeMessage)

ComposeMessage = connect(mapStateToProps, actions)(requireAuth(ComposeMessage));

export default ComposeMessage;

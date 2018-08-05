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

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

class ComposeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userId: localStorage.getItem('my_id'),
      sender: localStorage.getItem('my_id')
    }
  }

  /* Change this to submit the payload */
onSubmit = ({receiverId, subject, body}) => {
  const senderId = localStorage.getItem("my_id");
  const inboxId = localStorage.getItem("my_id");
  this.props.create_message({senderId, receiverId, inboxId, subject, body}, () => {
    // where do we want to send them?
    alert("Message Sent!");
    this.props.router.push("/inbox/" + localStorage.getItem('my_id'));
  });
};

  render() {
    const { handleSubmit } = this.props;
    let userId = localStorage.getItem('id');
    return (
      <div>
      <h1>
      Compose Message
      </h1>
        <form onSubmit={handleSubmit(this.onSubmit)} align="center">
        <div>
          <Field name="userId" id="userId" component={TextField} label={'User ID: ' + userId} disabled hidden/>
        </div>
        <div>
          <Field name="receiverId" id="receiverId" label="Receiver ID" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="subject" id="subject" label="Subject" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="body" id="body" label="Body" component={TextField} validate={[ required ]} />
        </div>
        <br/>
        <button className = "button" type="submit">Send Message</button>
        <br />
      </form>
      </div>
    )
  }
}

/* initialValues allows us to prepopulate fields in redux form */
function mapStateToProps(state) {
  return {
    initialValues: {
      sender: state.auth.my_id,
      // receiver: state.auth.firstname,
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

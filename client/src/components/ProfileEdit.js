import React from 'react';

import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { RadioGroup,TextField } from 'redux-form-material-ui';

/* Higher Order Components */
import requireAuth from './requireAuth';

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength6 = minLength(6)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const passwordConfirm = (value, allValues) =>
  value !== allValues.password ? `Passwords don't match` : undefined



class ProfileEdit extends React.Component {

  /* Change this to submit the payload */
onSubmit = ({username, email, firstname, lastname, password}) => {
  console.log({username, email, firstname, lastname, password});
  this.props.edit_profile({username, email, firstname, lastname, password}, () => {
    this.props.router.push("/profile");
  });
};

  render() {
    /* handleSubmit is provided by Redux Form */
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <br />

        <Typography color="inherit" variant="display1">
        Register
        </Typography>
        <br/>
        <Field name="username" label="Username" id="username" component = {TextField} validate={[ required, maxLength15 ]}/>
        <br />
        <Field name="firstname" id="first_name" label="First Name" component = {TextField} validate={[ required ]} />
        <br/>
        <Field name="lastname" id="last_name" label="Last Name" component = {TextField} validate={[ required ]}/>
        <br/>
        <Field name="email" id="email" type="email" label="Email" component = {TextField} validate={[ required, email ]}/>
        <br/>
        <button className = "button" type="submit">Submit Updates</button>
        <br />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.errorMessage};
}

ProfileEdit = reduxForm({
  form: 'edit_profile'
})(ProfileEdit)

export default compose (
  connect(mapStateToProps, actions),
)(requireAuth(ProfileEdit));

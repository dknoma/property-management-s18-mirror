import React from 'react';

import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { RadioGroup,TextField } from 'redux-form-material-ui';

/* Higher Order Components */
import requireAuth from '../requireAuth';

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

onSubmit = ({username, email, firstname, lastname}) => {
  const id = localStorage.getItem("my_id");
  console.log(id);
  this.props.edit_profile({username, email, firstname, lastname, id}, () => {
    this.props.router.push("/profile/" + id );
  });
};

  render() {
    const data = {
      // used to populate "account" reducer when "Load" is clicked
      username: this.props.username,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
      my_id: this.props.my_id
    }
    /* handleSubmit is provided by Redux Form */
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h1>
        Edit Your Profile
        </h1>
        <br/>
        <Field name="username" label="Username" id="username" component = {TextField} validate={[ required, maxLength15 ]} disabled/>
        <br />
        <Field name="firstname" label="First Name" id="first_name"  component = {TextField} validate={[ required ]} />
        <br/>
        <Field name="lastname" label="Last Name" id="last_name" component = {TextField} validate={[ required ]}/>
        <br/>
        <Field name="email" id="email" type="email" label="Email" component = {TextField} validate={[ required, email ]}/>
        <br/>
        <button className = "button" type="submit">Submit Updates</button>
        <br />
      </form>
    );
  }
}

/* initialValues allows us to prepopulate fields in redux form */
function mapStateToProps(state) {
  return {
    initialValues: {
      username: state.auth.my_username,
      firstname: state.auth.firstname,
      lastname: state.auth.lastname,
      email: state.auth.email,
    },
    authenticated: state.auth.authenticated,
    username: state.auth.my_username,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    email: state.auth.email,
    user_type: state.auth.user_type,
    my_id: state.auth.my_id
  };
}

/* Decorate with redux form */
ProfileEdit = reduxForm({
  form: 'edit_profile'
})(ProfileEdit)

ProfileEdit = connect(mapStateToProps, actions)(requireAuth(ProfileEdit));

export default ProfileEdit;

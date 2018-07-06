import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { RadioGroup,TextField } from 'redux-form-material-ui'

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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state={
      user_type: '',
      username:'',
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      passwordConfirm: '',
      errors:{},
      title: 'Register'
    }
  }

/* Change this to submit the payload */
  onSubmit = ({user_type, username, email, firstname, lastname, password}) => {
    console.log({user_type, username, email, firstname, lastname, password});
    this.props.signup({user_type, username, email, firstname, lastname, password}, () => {
      this.props.router.push("/profile");
    });
  //console.log(({user_type, username, email, firstname, lastname, password});
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
        <div>
          <Field name="user_type" id="user_type" component={RadioGroup} validate={[ required ]} >
          <label>
            <input type="radio" name="user_type" value="propertymanager" onChange={this.handleRadioChange}/>Property Manager
          </label>
          <br/>
          <label>
            <input type="radio" name="user_type" value="tenant" onChange={this.handleRadioChange}/>Tenant
          </label>
          </Field>

        </div>
        <br/>
        <Field name="username" label="Username" id="username" component = {TextField} validate={[ required, maxLength15 ]}/>
        <br />
        <Field name="firstname" id="first_name" label="First Name" component = {TextField} validate={[ required ]} />
        <br/>
        <Field name="lastname" id="last_name" label="Last Name" component = {TextField} validate={[ required ]}/>
        <br/>
        <Field name="email" id="email" type="email" label="Email" component = {TextField} validate={[ required, email ]}/>
        <br/>
        <Field name="password" id="password" type="password" label="Password" component = {TextField} validate={[ required, minLength6 ]} />
        <br/>
        <Field name="passwordConfirm" id="passwordConfirm" type="password" label="Confirm Password" component = {TextField} validate={[ required, passwordConfirm ]}/>
        <br/>
        <button className = "button" type="submit">Submit</button>
        <br />
        <a href="/login"> Already have an account? Login Here.</a>
      </form>
    );
  }
}
const style = {
  margin: 15,
};

function mapStateToProps(state) {
  return {errorMessage: state.auth.errorMessage};
}


  Register = reduxForm({
    form: 'signup_property'
  })(Register)



/* Use Componse to improve syntax of export portion */
/* Need to pass mapStateToProps as an argument here */
export default compose (
  connect(mapStateToProps, actions),
)(Register);

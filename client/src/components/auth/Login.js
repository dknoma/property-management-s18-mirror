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

class Login extends Component {

constructor(props){
  super(props);
  this.state={
    user_type:'',
    username:'',
    password:'',
    title: "Login"
  }

 }
 /* Change this to submit the payload */
 onSubmit = ({user_type, username, password}) => {
     if(user_type === undefined) {
       alert("Please select the user type!");
       return;
     }
     console.log({user_type, username, password});
     this.props.login({user_type, username, password}, () => {
       this.props.router.push("/profile");
     });
   //console.log(({user_type, username, email, firstname, lastname, password});
   };

render() {
  /* Remember to call classes here */
  const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <br />
        <Typography color="inherit" variant="display1">
        Login
        </Typography>
        <br/>
        <div>
          <Field name="user_type" id="user_type" component={RadioGroup} >
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
        <Field name="username" label="Username" id="username" component = {TextField} validate={[ required ]}/>
        <br />
        <Field name="password" id="password" type="password" label="Password" component = {TextField} validate={[ required ]} />
        <br/>
        <button className = "button" type="submit">Submit</button>
        <br />
        <a href="/register"> Need an account? Register Here.</a>
        </form>
    );
  }
}

const style = {
 margin: 15,
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'login' })
)(Login);

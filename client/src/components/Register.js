import React, { Component } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';
import axios from 'axios';
import { validateInput } from '../validator';

/* Redux */
import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm, formValueSelector} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';

import {
  Checkbox,
  RadioGroup,
  Select,
  TextField,
  Switch,
  FormControlLabel,
} from 'redux-form-material-ui'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: 'row',
    display: 'inline-block'
  }
});

/* Style for error msg */
const spanStyle = {
  color: 'red',
  fontSize: 'small',
  fontStyle: 'italic'
};

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

  onSubmit = ({user_type, username, email, firstname, lastname, password}) => {
    this.props.signup_property({user_type, username, email, firstname, lastname, password}, () => {
      this.props.router.push("/profile");
    });
  //console.log(({user_type, username, email, firstname, lastname, password});
  };


/* This fires upon submit */
 handleClick(event) {
    var apiBaseUrl = "http://localhost:3000/api/";
    event.preventDefault();

    if (this.isValid()) {
      this.setState({errors: {}});
      console.log("payload: ",
        this.state.user_type,
        this.state.username,
        this.state.first_name,
        this.state.last_name,
        this.state.email,
        this.state.password
      );
      // Create payload to send over to backend
      var payload = {
        "username": this.state.username,
        "firstname": this.state.first_name,
        "lastname":this.state.last_name,
        "email":this.state.email,
        "password":this.state.password
      }

      /* TODO: Reimplement this to use redux */
      axios.post(apiBaseUrl + this.state.user_type +'/signup', payload)
      .then(response => {
        console.log(response);
        if(response.status === 201) {
          alert("Registration Successful!");
          console.log(response.data.message);
       }
     })
     .catch(error => {
         alert(error.response.data.message);
     });
    } else {
       alert("Please check all the fields.");
    }
 }

 handleChange = event => {
   this.setState({
     [event.target.id]: event.target.value
   });
 }

 handleRadioChange = event => {
   this.setState({ user_type: event.target.value });
   console.log(this.state.user_type);
 };

 isValid() {
   const errors =  validateInput(this.state);
   if (Object.keys(errors).length !== 0) {
     console.log(errors);
     this.setState({errors});
     return false;
   }
   return true;
 }

  render() {
    /* handleSubmit is provided by Redux Form */
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <br />

        <Typography color="inherit" variant="display1">
        {this.state.title}
        </Typography>

        <FormControl
        component="fieldset"
        required
        >

        <Field name="role" value={this.state.user_type} component={RadioGroup} >
        <label>Property Manager</label>
        <Radio value="propertymanager" name="propertymanager" label="Property Manager" onChange={this.handleRadioChange}/>
        <label>Tenant</label>
        <Radio value="tenant" label="Tenant" onChange={this.handleRadioChange}/>
        </Field>
        </FormControl>
        <br />

        <Field name="username" label="Username" id="username" component = {TextField} />
        {this.state.errors && (this.state.errors["username"] && <span style={spanStyle}>{this.state.errors["username"]}</span>)}
        <br />
        <Field name="firstname" id="first_name" label="First Name" component = {TextField} />
        <br/>
        {this.state.errors && (this.state.errors["first_name"] && <span style={spanStyle}>{this.state.errors["first_name"]}</span>)}
        <br/>
        <Field name="lastname" id="last_name" label="Last Name" component = {TextField} />
        <br/>
        {this.state.errors && (this.state.errors["last_name"] && <span style={spanStyle}>{this.state.errors["last_name"]}</span>)}
        <br/>
        <Field name="email" id="email" type="email" label="Email" component = {TextField} />
        <br/>
        {this.state.errors && (this.state.errors["email"] && <span style={spanStyle}>{this.state.errors["email"]}</span>)}
        <br/>
        <Field name="password" id="password" type="password" label="Password" component = {TextField} />
        <br/>
        {this.state.errors && (this.state.errors["password"] && <span style={spanStyle}>{this.state.errors["password"]}</span>)}
        <br/>
        <Field name="passwordConfirm" id="passwordConfirm" type="password" label="Confirm Password" component = {TextField} />
        <br/>
        {this.state.errors && (this.state.errors["passwordConfirm"] && <span style={spanStyle}>{this.state.errors["passwordConfirm"]}</span>)}
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

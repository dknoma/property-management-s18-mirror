import React, { Component } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';
import axios from 'axios';
import { validateInput } from '../validator';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
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

  handleClick(event) {
    var apiBaseUrl = "http://localhost:3000/api";
    event.preventDefault();

    if (this.isValid()) {
      this.setState({errors: {}});
      console.log("payload: ",
        this.state.username,
        this.state.first_name,
        this.state.last_name,
        this.state.email,
        this.state.password
      );
      //TODO: check for empty values before hitting submit

      // Create payload to send over to backend
      var self = this;
      var payload={
        "username": this.state.username,
        "first_name": this.state.first_name,
        "last_name":this.state.last_name,
        "email":this.state.email,
        "password":this.state.password
      }

      /* TODO: Reimplement this to use redux */
      axios.post(apiBaseUrl+'/propertymanager/signup', payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code === 200){
        console.log("registration successful");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this}/>);
         var loginmessage = "No account associated with this username.";
         self.props.parentContext.setState({
           loginscreen:loginscreen,
           loginmessage:loginmessage,
           buttonLabel:"Register",
           isLogin:true
          });
       }
     })
     .catch(error => console.log(error));
   } else {
     console.log(this.state.errors);
     console.log("is not valid");
   }
   }

   handleChange = event => {
   this.setState({
     [event.target.id]: event.target.value
   });
 }

// /* There's definitely a better way to do this */
//   handleChangeFirstName(event) {
//     this.setState({
//       first_name: event.target.value
//     })
//   }
//
//   handleChangeLastName(event) {
//     this.setState({
//       last_name: event.target.value
//     })
//   }
//
//   handleChangeEmail(event) {
//     this.setState({
//       email: event.target.value
//     })
//   }
//
//   handleChangePassword(event) {
//     this.setState({
//       password: event.target.value
//     })
//   }
//
//   handleChangePasswordConfirm(event) {
//     this.setState({
//       passwordConfirm: event.target.value
//     })
//   }

  isValid() {
   const errors =  validateInput(this.state);
   if (Object.keys(errors).length !== 0) {
     this.setState({errors});
     return false;
   }
   return true;
 }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <div>
            <br />
            <Typography color="inherit" variant="display1">
              {this.state.title}
            </Typography>
            <TextField
              label="Username"
              id="username"
              onChange={this.handleChange}
              />
            <br />
           <TextField
             label="First Name"
             id="first_name"
             onChange={this.handleChange}
             />
           <br/>
           <TextField
             label="Last Name"
             id="last_name"
             onChange={this.handleChange}
             />
           <br/>
           <TextField
             type="email"
             id="email"
             label="Email"
             onChange={this.handleChange}
             />
           <br/>
           <TextField
             type = "password"
             id="password"
             label="Password"
             onChange={this.handleChange}
             />
             <br />
             <TextField
               type = "password"
               id="passwordConfirm"
               label="passwordConfirm"
               onChange={this.handleChange}
               />
           <br/>
           <Button variant="contained" color="primary" label="Submit" style={style}
           onClick={(event) => this.handleClick(event)}> Submit </Button>
          <br />
          <a href="/login"> Already have an account? Login Here.</a>
          </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

Register.propTypes = {
  classes: PropTypes.object,
};

export default Register;

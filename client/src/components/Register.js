import React, { Component } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';
import axios from 'axios';
import { validateInput } from '../validator';

/* Redux */
import { createStore } from "redux";

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

/*Style for error msg */
const spanStyle = {
  color: 'red',
  fontSize: 'small',
  fontStyle: 'italic'
};

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
        "firstname": this.state.first_name,
        "lastname":this.state.last_name,
        "email":this.state.email,
        "password":this.state.password
      }

      /* TODO: Reimplement this to use redux */
      axios.post(apiBaseUrl+'/propertymanager/signup', payload)
      .then(response => {
        console.log(response);
        if(response.status === 201) {
          alert("Registration Successful!");
          console.log(response.data.message);

          /* Need to store the token coming from backend */
          // dispatch(signUpUser(values))
          //    .then(
          //      (response) => {
          //        let data = response.payload.data;
          //        //if any one of these exist, then there is a field error
          //        if (response.payload.status != 201) {
          //          //let other components know
          //          //dispatch(signUpUserFailure(response.payload));
          //          //reject(data); //this is for redux-form itself
          //        } else {
          //          //store JWT Token to browser session storage
          //         //sessionStorage.setItem('jwtToken', response.payload.data.token);
          //         //let other components know that we got user and things are fine
          //         //dispatch(signUpUserSuccess(response.payload));
          //         //resolve();//this is for redux-form itself
          //        }
          //     }
          //  );
          //  //NEED TO UPDATE
          //  self.props.parentContext.setState({
          //    loginscreen:loginscreen,
          //    loginmessage:loginmessage,
          //    buttonLabel:"Register",
          //    isLogin:true
          //  });
       }
     })
     .catch(error => {
         alert(error.response.data.message);

       // console.log(response);
       // alert(response);

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
              <br/>
              {this.state.errors && (this.state.errors["username"] && <span style={spanStyle}>{this.state.errors["username"]}</span>)}
            <br />
           <TextField
             label="First Name"
             id="first_name"
             onChange={this.handleChange}
             />
             <br/>
             {this.state.errors && (this.state.errors["first_name"] && <span style={spanStyle}>{this.state.errors["first_name"]}</span>)}
           <br/>
           <TextField
             label="Last Name"
             id="last_name"
             onChange={this.handleChange}
             />
             <br/>
             {this.state.errors && (this.state.errors["last_name"] && <span style={spanStyle}>{this.state.errors["last_name"]}</span>)}
           <br/>
           <TextField
             type="email"
             id="email"
             label="Email"
             onChange={this.handleChange}
             />
             <br/>
             {this.state.errors && (this.state.errors["email"] && <span style={spanStyle}>{this.state.errors["email"]}</span>)}
           <br/>
           <TextField
             type = "password"
             id="password"
             label="Password"
             onChange={this.handleChange}
             />
             <br/>
             {this.state.errors && (this.state.errors["password"] && <span style={spanStyle}>{this.state.errors["password"]}</span>)}
             <br />
             <TextField
               type = "password"
               id="passwordConfirm"
               label="Confirm Password"
               onChange={this.handleChange}
               />
               <br/>
               {this.state.errors && (this.state.errors["passwordConfirm"] && <span style={spanStyle}>{this.state.errors["passwordConfirm"]}</span>)}
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

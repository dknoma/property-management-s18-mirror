import React, { Component } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';
import axios from 'axios';
import { validateInput } from '../validator';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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
    flexDirection: "row",
    display: 'inline-block'
  }
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
      var payload={
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
        if(response.status === 201){
        alert("Registration Successful!");

        /* TODO: Need to redirect to Profile page*/

        // //what is this part for?
        //  var loginscreen=[];
        //  loginscreen.push(<Login parentContext={this}/>);
        //  var loginmessage = "No account associated with this username.";
        //
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
    const { classes } = this.props;
    return (
      <div>
          <div>
            <br />
            <Typography color="inherit" variant="display1">
              {this.state.title}
            </Typography>

            <div>
              <FormControl
                component="fieldset"
                required
              >
                <RadioGroup
                  value={this.state.user_type}
                  onChange={this.handleRadioChange}
                >
                    <FormControlLabel value="propertymanager" control={<Radio />} label="Property Manager" />
                    <FormControlLabel value="tenant" control={<Radio />} label="Tenant" />
                </RadioGroup>
              </FormControl>
            </div>

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

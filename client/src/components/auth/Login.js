import React, { Component } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import ProfilePage from '../ProfilePage.js';

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

// TODO: Implement Backend
handleClick(event) {
  var apiBaseUrl = "http://localhost:3000/api/";
  var self = this;
  var payload={
    "username":this.state.username,
    "password":this.state.password
  }
  console.log("payload: ",
  this.state.user_type,
    this.state.username,
    this.state.password
  );

  /* Assuming /login is where we'll want to hit. Need to reconfigure with new backend */
  axios.post(apiBaseUrl + this.state.user_type + '/login', payload)
  .then(function (response) {
    console.log(response);
    if(response.status === 201) {
      console.log("Login successful");

      /* Need to confirm that this works */
      // var profilePage=[];
      // profilePage.push(<ProfilePage appContext={self.props.appContext}/>)
      // self.props.appContext.setState({loginPage:[],profilePage:profilePage})
    }

  })
  .catch(function (error) {
    alert(error.response.data.message);
  });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleRadioChange = event => {
    this.setState({ user_type: event.target.value });
  };

render() {
  /* Remember to call classes here */
  const { classes } = this.props;

    return (
      <div>
          <div>
            <br />
              <Typography color="inherit" variant="display1">
                {this.state.title}
              </Typography>
            <br />
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
            <br/>
           <TextField
             label="Username"
             id="username"
             onChange={this.handleChange}
             />
           <br/>
             <TextField
               type="password"
               label="Password"
               id="password"
               onChange={this.handleChange}
               />
             <br/>
               <Button variant="contained" color="primary" label="Submit" style={style}
               onClick={(event) => this.handleClick(event)}> Submit </Button>
             <br />
             <a href="/register"> Need an account? Register Here.</a>
         </div>
      </div>
    );
  }
}

const style = {
 margin: 15,
};

Login.propTypes = {
  classes: PropTypes.object
};

export default Login;

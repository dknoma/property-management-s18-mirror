import React, { Component } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ProfilePage from './ProfilePage.js';

class Login extends Component {

constructor(props){
  super(props);
  this.state={
    username:'',
    password:'',
    title: "Login"
  }

  this.handleChangeEmail = this.handleChangeEmail.bind(this);
  this.handleChangePassword = this.handleChangePassword.bind(this);

 }

// TODO: Implement Backend
handleClick(event) {
  var apiBaseUrl = "http://localhost:8000/api/";
  var self = this;
  var payload={
    "email":this.state.username,
    "password":this.state.password
  }
  console.log("payload: ",
    this.state.username,
    this.state.password
  );

  /* Assuming /login is where we'll want to hit. Need to reconfigure with new backend */
  axios.post(apiBaseUrl+'login', payload)
  .then(function (response) {
    console.log(response);
    if(response.data.code === 201) {
      console.log("Login successful");

      /* Need to confirm that this works */
      var profilePage=[];
      profilePage.push(<ProfilePage appContext={self.props.appContext}/>)
      self.props.appContext.setState({loginPage:[],profilePage:profilePage})
    }
    else if(response.data.code === 401){
      console.log("Username and password do not match");
      alert("Username and password do not match");
    }
    else{
      console.log("Username does not exists");
      alert("Username does not exist");
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  handleChangeEmail(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    })
  }


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
           <TextField
             label="Username"
             onChange={this.handleChangeEmail}
             />
           <br/>
             <TextField
               type="password"
               label="Password"
               onChange={this.handleChangePassword}
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

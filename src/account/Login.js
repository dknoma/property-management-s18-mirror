import React, { Component } from "react";
import axios from 'axios';
//import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

/*DIFFERENCIATE BETWEEN USERS */
  handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/login', this.state)
    .then(res => window.location = res.data.redirectedURI)
    .catch(error=> console.log(error));
  }

  render() {
    return (
      <div className="Login">
      <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
            </div>
            <div>
            <label>Password: </label>
            <input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            </div>
          <button
            disabled={!this.validateForm()}
            type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

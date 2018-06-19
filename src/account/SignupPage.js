import React, {Component} from 'react';
import axios from 'axios';
import { validateInput } from '../codes';


/* Error CHECK!!
*
*/
class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password:'',
      passwordConfirm:'',
      errors:{}
    };


  }

  handleSubmit = async event => {
    event.preventDefault();
    //how to loop through state?
    if(this.isValid()) {
      this.setState({errors: {}});
      //LOOK AT BACKEND URL
      axios.post('/api/signup', this.state)
      .then(res => window.location = res.data.redirectURI)
      .catch(error=> console.log(error));
      console.log("value: " +  this.state.username);
      console.log("value: " +  this.state.firstname);
      console.log("value: " +  this.state.lastname);
      console.log("value: " +  this.state.email);
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
      this.setState({errors});
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="registerMain">
        <h1> Register </h1>
        <p> Please fill in the form to create an account. </p>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label>Username: </label>
            <input
              id="username"
              placeholder="Userame"
              type="text"
              value={this.state.username}
              onChange = {this.handleChange}/>
              {this.state.errors && (this.state.errors["username"] && <span>{this.state.errors["username"]}</span>)}
            </div>
          <div>
          <label> First Name: </label>
            <input
              id="firstname"
              placeholder="First Name"
              type="text"
              value={this.state.firstname}
              onChange = {this.handleChange}/>
            </div>
            <div>
            <label> Last Name: </label>
              <input
                id="lastname"
                placeholder="Last Name"
                type="text"
                value={this.state.lastname}
                onChange = {this.handleChange}/>
            </div>
            <div>
            <label> Email: </label>
              <input
                id="email"
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange = {this.handleChange}/>
              </div>
              <div>
              <label> Password: </label>
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange = {this.handleChange}/>
                </div>
                <div>
                <label> Confirm Password: </label>
                  <input
                    id="passwordConfirm"
                    placeholder="Confirm Password"
                    type="password"
                    value={this.state.passwordConfirm}
                    onChange = {this.handleChange}/>
                </div>
            <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
    );
  }
}

export default SignupPage;

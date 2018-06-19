import React, { Component} from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="center">
        <h1> Welcome to [CHANGE NAME] Property! </h1><br />
        <a href="/login">Login </a><br/>
        <a href="/signup">SignUp </a>
      </div>
    );
  }
}

export default Welcome;

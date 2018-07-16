import React, { Component } from "react";
import "../index.css";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "Welcome",
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <div className="belowNav">
      <br />
        <Typography color="inherit" variant="display1">
          {this.state.title}
        </Typography>
      <br />
      <a href="login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </a>
      &nbsp; &nbsp; &nbsp;
      <a href="register">
        <Button variant="contained" color="primary">
          Register
        </Button>
      </a>
      </div>
    )
  }
};

export default Home;

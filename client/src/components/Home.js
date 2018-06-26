import React, { Component } from "react";
//import { Link } from "react-router";
import "../index.css";
import PropTypes from 'prop-types';

// import { withStyles } from '@material-ui/core/styles';
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
      <div>
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
      <a href="register">
        <Button variant="contained" color="primary">
          Register
        </Button>
      </a>
      </div>
    )
  }
};

/* Need the classes prop types for recomended method of doing styling in react */
Home.propTypes = {
  classes: PropTypes.object,
}

export default Home;

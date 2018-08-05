import React, { Component } from "react";
import "../index.css";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Slide } from 'react-slideshow-image';

import house1 from '../assets/img/house1.jpg';
import house2 from '../assets/img/apartment1.jpg';
import house3 from '../assets/img/house3.jpg';
import house4 from '../assets/img/house4.jpg';
import house5 from '../assets/img/house5.jpg';
import house6 from '../assets/img/house6.jpg';

/* Slideshow */
const images = [
house1,
house2,
house3,
house4,
house5,
house6
];

const Slideshow = () => {
    return (
        <Slide
          images={images}
          duration={8000}
          transitionDuration={1000}
        />
    )
}

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
      <Slideshow />
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
        <div className="card"></div>
      </div>

    </div>
    )
  }
};

export default Home;

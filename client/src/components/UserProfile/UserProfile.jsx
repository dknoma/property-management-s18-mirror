import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Button from "../CustomButtons/Button.jsx";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardAvatar from "../Card/CardAvatar.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from "../Card/CardFooter.jsx";
import "../../index.css";

import { Slide } from 'react-slideshow-image';


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const images = [
  'images/slide_2.jpg',
  'images/slide_3.jpg',
  'images/slide_4.jpg',
  'images/slide_5.jpg',
  'images/slide_6.jpg',
  'images/slide_7.jpg'
];

const Slideshow = () => {
    return (
        <Slide
          images={images}
          duration={5000}
          transitionDuration={1000}
        />
    )
}

export class UserProfile extends React.Component {

render() {
    return (<Slideshow />);
  }
}



export default withStyles(styles)(UserProfile, Slideshow);

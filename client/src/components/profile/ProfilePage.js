import React from 'react';
import PropTypes from 'prop-types';


/* Redux */
import { connect } from 'react-redux';
import * as actions from '../../actions';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// core components
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import CustomInput from "../CustomInput/CustomInput.jsx";
import ButtonThemed from "../CustomButtons/Button.jsx";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardAvatar from "../Card/CardAvatar.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from "../Card/CardFooter.jsx";
import "../../index.css";
/* Higher Order Components */
import requireAuth from '../requireAuth';

const styles = theme => ({
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
});

class ProfilePage extends React.Component {

  componentDidMount() {
    if (this.props.params.id !== "undefined") {
      this.props.get_user_profile(this.props.params);
    }
  };

  renderPMInformation() {
    if (this.props.user_type ==="propertymanager") {
        return (
          <div>
            <div> <a class="button" href="/propertylisting">View Property Listing</a></div>
            <br/>
            <div> <a class="button" href="/createproperty">Create New Property</a></div>
            <br/>
          </div>
        )
    }
  }

  renderPrivateInformation() {
      if (this.props.id == localStorage.getItem("my_id")) {
        return (
          <div>
            <p>Username: { localStorage.getItem("my_username") } </p>
          </div>
        )
      } else {
        return (
          <p>Username: { this.props.username }</p>
        )
      }
  }

 renderProfile() {
    const { classes } = this.props;
    <div className="center">
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Role</h6>
              <h4 className={classes.cardTitle}>Username</h4>
              <p className={classes.description}>
              First Name
              </p>
              <p className={classes.description}>
              Last Name
              </p>
              <p className={classes.description}>
              Email
              </p>
              <p className={classes.description}>
              </p>
              <Button color="primary" round>
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  }

  render() {

    return (

      <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>My Profile</h1>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              {this.renderPrivateInformation()}
              <p>First Name: {this.props.firstname}</p>
              <p>Last Name: {this.props.lastname}</p>
              <p>Email: {this.props.email}</p>
              <p>Role: {this.props.user_type} </p>
              {this.renderPMInformation()}
            </div>
            <div> <a class="button" href="/searchproperty">Search Property</a></div>
          </div>
      </div>

    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

/* After adding more, we have to map them here */
function mapStateToProps(state) {
  return {
    username: state.auth.username,
    my_username: state.auth.my_username,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    email: state.auth.email,
    user_type: state.auth.user_type,
    id: state.auth.id
  };
}
/* Need to connect actions here */
export default connect(mapStateToProps, actions)(requireAuth(ProfilePage));
